# Lightweight Init + Orchestrator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `yuva init` to create 3-4 lightweight files instead of copying 67, add `yuva agent` commands for on-demand prompt access, auto-detect AI tools, and rename CLAUDE.md to AGENTS.md.

**Architecture:** CLI does project scanning and agent resolution from the installed package. AGENTS.md is a simplified orchestrator that tells the AI to use `yuva agent` commands. Tool-specific config files are thin pointers to AGENTS.md.

**Tech Stack:** Node.js (no new dependencies), existing `lib/` module structure.

**Spec:** `docs/superpowers/specs/2026-03-23-lightweight-init-orchestrator-design.md`

---

## File Structure

### New files
| File | Responsibility |
|------|---------------|
| `lib/detect-tool.js` | Auto-detect which AI tool is installed/running |
| `lib/resolve-package.js` | Find the yuva-ai package install path at runtime |
| `lib/commands/agent.js` | `yuva agent show/list/orchestrate` subcommands |
| `template/AGENTS.md` | New simplified orchestrator (replaces template/CLAUDE.md) |
| `template/.aiautomations/agents.md` | Index of all dev agents with descriptions |

### Modified files
| File | Changes |
|------|---------|
| `bin/cli.js:86-155` | Add `agent` command routing, update help text |
| `lib/commands/init.js` | Full rewrite: lightweight init + auto-detection |
| `lib/commands/doctor.js` | Check AGENTS.md instead of CLAUDE.md, validate new setup |
| `lib/commands/upgrade.js` | Migration from old CLAUDE.md to AGENTS.md |
| `lib/commands/list.js` | Read agents from package instead of local prompts dir |
| `lib/llm-adapters.js:10` | Update claude config to use AGENTS.md as configFile |
| `bin/postinstall.js` | Lightweight setup instead of full copy |
| `package.json` | Update description, remove life-assistant keywords |

### Removed from template (life agents)
All life agent files in `template/.aiautomations/prompts/` that aren't dev agents.

---

## Task 1: Create `lib/resolve-package.js`

Resolves the yuva-ai package install path so agent prompts can be read on demand.

**Files:**
- Create: `lib/resolve-package.js`

- [ ] **Step 1: Write resolve-package.js**

```js
const path = require('path');
const fs = require('fs');

function resolvePackagePath() {
  // 1. Check if running from source (development)
  const localTemplate = path.join(__dirname, '..', 'template');
  if (fs.existsSync(localTemplate)) {
    return path.join(__dirname, '..');
  }

  // 2. Check config.json for stored path
  const configPath = path.join(process.cwd(), '.aiautomations', 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.packagePath && fs.existsSync(path.join(config.packagePath, 'template'))) {
        return config.packagePath;
      }
    } catch {}
  }

  // 3. Check global npm path
  const globalPaths = require('module').globalPaths || [];
  for (const gp of globalPaths) {
    const candidate = path.join(gp, 'yuva-ai');
    if (fs.existsSync(path.join(candidate, 'template'))) {
      return candidate;
    }
  }

  // 4. Check common global install locations
  const candidates = [
    path.join(process.env.APPDATA || '', 'npm', 'node_modules', 'yuva-ai'),
    path.join(process.env.HOME || '', '.npm-global', 'lib', 'node_modules', 'yuva-ai'),
    '/usr/lib/node_modules/yuva-ai',
    '/usr/local/lib/node_modules/yuva-ai',
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, 'template'))) {
      return candidate;
    }
  }

  return null;
}

function getTemplatePath() {
  const pkg = resolvePackagePath();
  return pkg ? path.join(pkg, 'template') : null;
}

function getAgentPromptPath(agentName) {
  const templatePath = getTemplatePath();
  if (!templatePath) return null;

  const promptsDir = path.join(templatePath, '.aiautomations', 'prompts');
  // Try exact match first
  const exact = path.join(promptsDir, `${agentName}.md`);
  if (fs.existsSync(exact)) return exact;

  // Try with 'agent' suffix
  const withSuffix = path.join(promptsDir, `${agentName}agent.md`);
  if (fs.existsSync(withSuffix)) return withSuffix;

  return null;
}

module.exports = { resolvePackagePath, getTemplatePath, getAgentPromptPath };
```

- [ ] **Step 2: Verify it works**

Run: `node -e "const r = require('./lib/resolve-package'); console.log(r.resolvePackagePath())"`
Expected: prints the package root path (e.g., `C:\Users\aftab\Desktop\Personal\automation`)

- [ ] **Step 3: Commit**

```bash
git add lib/resolve-package.js
git commit -m "feat: add package path resolver for on-demand agent access"
```

---

## Task 2: Create `lib/detect-tool.js`

Auto-detects which AI tool is installed or running.

**Files:**
- Create: `lib/detect-tool.js`

- [ ] **Step 1: Write detect-tool.js**

```js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function commandExists(cmd) {
  try {
    execSync(`which ${cmd} 2>/dev/null || where ${cmd} 2>nul`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function detectTool(targetDir) {
  // 1. Check environment variables for IDE
  if (process.env.CURSOR_TRACE_ID || process.env.CURSOR_SESSION) return 'cursor';
  if (process.env.VSCODE_GIT_ASKPASS_MAIN) return 'claude'; // VS Code with Claude extension
  if (process.env.CODEX_ENV) return 'codex';

  // 2. Check existing config files in project
  const configChecks = [
    { file: '.cursor/rules', tool: 'cursor' },
    { file: '.github/copilot-instructions.md', tool: 'copilot' },
    { file: '.windsurfrules', tool: 'windsurf' },
    { file: '.kilo/instructions.md', tool: 'kilo-code' },
    { file: '.sourcegraph/instructions.md', tool: 'cody' },
    { file: '.amazonq/instructions.md', tool: 'amazon-q' },
    { file: '.continue/instructions.md', tool: 'continue' },
    { file: '.aider.conf.yml', tool: 'aider' },
  ];
  for (const { file, tool } of configChecks) {
    if (fs.existsSync(path.join(targetDir, file))) return tool;
  }

  // 3. Check installed CLIs
  const cliChecks = [
    { cmd: 'claude', tool: 'claude' },
    { cmd: 'opencode', tool: 'opencode' },
    { cmd: 'codex', tool: 'codex' },
    { cmd: 'aider', tool: 'aider' },
    { cmd: 'ollama', tool: 'ollama' },
  ];
  for (const { cmd, tool } of cliChecks) {
    if (commandExists(cmd)) return tool;
  }

  // 4. Fallback
  return 'claude';
}

module.exports = { detectTool, commandExists };
```

- [ ] **Step 2: Verify it works**

Run: `node -e "const d = require('./lib/detect-tool'); console.log(d.detectTool(process.cwd()))"`
Expected: prints detected tool name (e.g., `claude`)

- [ ] **Step 3: Commit**

```bash
git add lib/detect-tool.js
git commit -m "feat: add AI tool auto-detection for init"
```

---

## Task 3: Create `template/AGENTS.md` and `template/.aiautomations/agents.md`

The new simplified orchestrator and agent index files.

**Files:**
- Create: `template/AGENTS.md`
- Create: `template/.aiautomations/agents.md`

- [ ] **Step 1: Write template/AGENTS.md**

```markdown
# Yuva AI - Development Agent System

You have access to a multi-agent development system. Use the CLI commands below to access specialized agents on demand.

---

## How to handle any request

1. **Scan the project first**: Run `yuva agent orchestrate` to get project context (existing code, language, framework, git status)
2. **Read the result**: The JSON output tells you the project state and suggests which agent to start with
3. **Get agent instructions**: Run `yuva agent show <name>` to load the full prompt for any agent
4. **Follow the agent**: Execute the agent's instructions completely before moving to the next one

---

## Agent Selection Guide

### Step 1: Project Context Check
Always run `yuva agent orchestrate` first. If it reports `hasExistingCode: true`, run `yuva agent show existingcode` BEFORE any other agent.

### Step 2: Match User Intent

| User wants to... | Agent chain |
|-------------------|-------------|
| Build something new | `requirements` → `riskassessment` → `planning` → `execution` |
| Continue previous work | `continuity` → (resume from last point) |
| Fix a bug / error | `debugger` |
| Write tests | `tester` |
| Review code quality | `reviewer` |
| Check security | `security` |
| Clean up / improve code | `refactor` |

### Step 3: Execute agents in order
For each agent in the chain, run `yuva agent show <name>` and follow its instructions completely before moving to the next agent.

---

## Available Commands

```
yuva agent show <name>       # Get full agent instructions
yuva agent list              # List all available agents
yuva agent orchestrate       # Scan project and get context
```

---

## Rules

1. **Always run orchestrate first** — understand the project before acting
2. **If existing code exists** — run existingcode agent before anything else
3. **One agent at a time** — complete each agent's instructions before the next
4. **Update session** — after any meaningful work, run `yuva agent show statemanager` to update `.session/` files
```

- [ ] **Step 2: Write template/.aiautomations/agents.md**

```markdown
# Available Development Agents

| Name | Command | Purpose |
|------|---------|---------|
| Existing Code | `yuva agent show existingcode` | Analyze existing codebase before making changes |
| Requirements | `yuva agent show requirements` | Gather and clarify project requirements |
| Risk Assessment | `yuva agent show riskassessment` | Identify risks before development |
| Planner | `yuva agent show planning` | Design architecture and create implementation plans |
| Execution | `yuva agent show execution` | Implement code step-by-step following the plan |
| Continuity | `yuva agent show continuity` | Resume work from last session state |
| Tester | `yuva agent show tester` | Write and run tests, QA |
| Reviewer | `yuva agent show reviewer` | Code quality audits and review |
| Security | `yuva agent show security` | Security vulnerability analysis |
| Debugger | `yuva agent show debugger` | Bug investigation and fixing |
| Refactor | `yuva agent show refactor` | Code improvement and cleanup |
| State Manager | `yuva agent show statemanager` | Update session and project state files |

## Agent Files (in package)

These agents are read from the installed yuva-ai package. To see the full prompt for any agent, run the command above.

Custom agents can be added locally in `.aiautomations/prompts/` — local files always take priority over package agents.
```

- [ ] **Step 3: Commit**

```bash
git add template/AGENTS.md template/.aiautomations/agents.md
git commit -m "feat: add AGENTS.md orchestrator and agent index"
```

---

## Task 4: Create `lib/commands/agent.js`

The `yuva agent show/list/orchestrate` command handler.

**Files:**
- Create: `lib/commands/agent.js`

- [ ] **Step 1: Write agent.js**

```js
const path = require('path');
const fs = require('fs');
const { log, box, success, warn, error, info, table } = require('../colors');
const { resolvePackagePath, getAgentPromptPath } = require('../resolve-package');
const { fileExists, readFile } = require('../fs-utils');

// Map short names to file names
const AGENT_MAP = {
  'existingcode': 'existingcodeagent.md',
  'requirements': 'requirementsagent.md',
  'riskassessment': 'riskassessmentagent.md',
  'planning': 'planningprompt.md',
  'execution': 'execution.md',
  'continuity': 'continuityagent.md',
  'tester': 'testeragent.md',
  'reviewer': 'revieweragent.md',
  'security': 'securityagent.md',
  'debugger': 'debuggeragent.md',
  'refactor': 'refactoragent.md',
  'statemanager': 'statemanageragent.md',
  'orchestrator': 'orchestrator.md',
};

const AGENT_DESCRIPTIONS = {
  'existingcode': 'Analyze existing codebase before making changes',
  'requirements': 'Gather and clarify project requirements',
  'riskassessment': 'Identify risks before development',
  'planning': 'Design architecture and create implementation plans',
  'execution': 'Implement code step-by-step following the plan',
  'continuity': 'Resume work from last session state',
  'tester': 'Write and run tests, QA',
  'reviewer': 'Code quality audits and review',
  'security': 'Security vulnerability analysis',
  'debugger': 'Bug investigation and fixing',
  'refactor': 'Code improvement and cleanup',
  'statemanager': 'Update session and project state files',
};

function agentCommand(args = []) {
  const action = args[0];

  switch (action) {
    case 'show': return showAgent(args[1]);
    case 'list': return listAgents();
    case 'orchestrate': return orchestrate();
    default: showAgentHelp();
  }
}

function showAgentHelp() {
  box('Yuva AI - Agent Commands');
  log('Usage:', 'bright');
  log('  yuva agent show <name>       Get full agent prompt');
  log('  yuva agent list              List all available agents');
  log('  yuva agent orchestrate       Scan project context\n');
  log('Agent names:', 'bright');
  for (const [name, desc] of Object.entries(AGENT_DESCRIPTIONS)) {
    log(`  ${name.padEnd(18)} ${desc}`);
  }
  log('');
}

function showAgent(name) {
  if (!name) {
    error('Agent name required. Run "yuva agent list" to see options.');
    return;
  }

  const targetDir = process.cwd();

  // 1. Check local override first
  const localFile = AGENT_MAP[name];
  if (localFile) {
    const localPath = path.join(targetDir, '.aiautomations', 'prompts', localFile);
    if (fileExists(localPath)) {
      process.stdout.write(readFile(localPath));
      return;
    }
  }

  // 2. Check custom local agents
  const customPath = path.join(targetDir, '.aiautomations', 'prompts', `${name}agent.md`);
  if (fileExists(customPath)) {
    process.stdout.write(readFile(customPath));
    return;
  }

  // 3. Read from package
  const pkgPath = resolvePackagePath();
  if (!pkgPath) {
    error('Cannot find yuva-ai package. Reinstall with: npm install -g yuva-ai');
    return;
  }

  const fileName = AGENT_MAP[name];
  if (!fileName) {
    error(`Unknown agent: ${name}. Run "yuva agent list" to see options.`);
    return;
  }

  const agentPath = path.join(pkgPath, 'template', '.aiautomations', 'prompts', fileName);
  if (!fileExists(agentPath)) {
    error(`Agent file not found: ${agentPath}`);
    return;
  }

  process.stdout.write(readFile(agentPath));
}

function listAgents() {
  box('Yuva AI - Available Agents');

  const targetDir = process.cwd();
  const rows = [];

  for (const [name, desc] of Object.entries(AGENT_DESCRIPTIONS)) {
    const fileName = AGENT_MAP[name];
    const localPath = path.join(targetDir, '.aiautomations', 'prompts', fileName);
    const source = fileExists(localPath) ? 'local' : 'package';
    rows.push([name, desc, source]);
  }

  table(['Name', 'Purpose', 'Source'], rows);

  // Check for custom local agents
  const promptsDir = path.join(targetDir, '.aiautomations', 'prompts');
  if (fileExists(promptsDir)) {
    const allFiles = fs.readdirSync(promptsDir).filter(f => f.endsWith('.md'));
    const knownFiles = Object.values(AGENT_MAP);
    const custom = allFiles.filter(f => !knownFiles.includes(f));
    if (custom.length > 0) {
      log('\nCustom Agents:', 'bright');
      custom.forEach(f => log(`  ${f.replace('.md', '').replace('agent', '')} → ${f}`));
    }
  }

  log(`\nTotal: ${Object.keys(AGENT_MAP).length} built-in agents\n`);
}

function orchestrate() {
  const targetDir = process.cwd();
  const result = {
    hasExistingCode: false,
    languages: [],
    frameworks: [],
    hasSession: false,
    gitStatus: 'unknown',
    tool: 'unknown',
    suggestedFirstAgent: 'requirements',
  };

  // Detect existing code
  const codeIndicators = [
    { file: 'package.json', lang: 'javascript' },
    { file: 'tsconfig.json', lang: 'typescript' },
    { file: 'requirements.txt', lang: 'python' },
    { file: 'setup.py', lang: 'python' },
    { file: 'pyproject.toml', lang: 'python' },
    { file: 'go.mod', lang: 'go' },
    { file: 'Cargo.toml', lang: 'rust' },
    { file: 'pom.xml', lang: 'java' },
    { file: 'build.gradle', lang: 'java' },
    { file: 'Gemfile', lang: 'ruby' },
    { file: 'composer.json', lang: 'php' },
    { file: 'pubspec.yaml', lang: 'dart' },
  ];

  for (const { file, lang } of codeIndicators) {
    if (fileExists(path.join(targetDir, file))) {
      result.hasExistingCode = true;
      if (!result.languages.includes(lang)) result.languages.push(lang);
    }
  }

  // Detect source directories
  const srcDirs = ['src', 'lib', 'app', 'pages', 'components', 'api'];
  for (const dir of srcDirs) {
    if (fileExists(path.join(targetDir, dir))) {
      result.hasExistingCode = true;
    }
  }

  // Detect frameworks
  const pkgPath = path.join(targetDir, 'package.json');
  if (fileExists(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      const frameworkChecks = [
        { dep: 'react', name: 'react' },
        { dep: 'next', name: 'nextjs' },
        { dep: 'vue', name: 'vue' },
        { dep: 'nuxt', name: 'nuxt' },
        { dep: 'express', name: 'express' },
        { dep: 'fastify', name: 'fastify' },
        { dep: 'nestjs', name: 'nestjs' },
        { dep: '@angular/core', name: 'angular' },
        { dep: 'svelte', name: 'svelte' },
        { dep: 'hono', name: 'hono' },
      ];
      for (const { dep, name } of frameworkChecks) {
        if (allDeps && allDeps[dep]) result.frameworks.push(name);
      }
    } catch {}
  }

  // Check session
  result.hasSession = fileExists(path.join(targetDir, '.session', 'state.md'));

  // Check git status
  try {
    const { execSync } = require('child_process');
    const status = execSync('git status --porcelain 2>/dev/null', { cwd: targetDir, encoding: 'utf8' });
    result.gitStatus = status.trim() === '' ? 'clean' : 'dirty';
  } catch {
    result.gitStatus = 'not-a-repo';
  }

  // Detect tool from config
  const configPath = path.join(targetDir, '.aiautomations', 'config.json');
  if (fileExists(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      result.tool = config.tool || 'unknown';
    } catch {}
  }

  // Suggest first agent
  if (result.hasSession) {
    result.suggestedFirstAgent = 'continuity';
  } else if (result.hasExistingCode) {
    result.suggestedFirstAgent = 'existingcode';
  } else {
    result.suggestedFirstAgent = 'requirements';
  }

  // Output as JSON (for AI consumption)
  console.log(JSON.stringify(result, null, 2));
}

module.exports = agentCommand;
```

- [ ] **Step 2: Verify show command**

Run: `node bin/cli.js agent show requirements | head -5`
Expected: first 5 lines of requirementsagent.md content

- [ ] **Step 3: Verify list command**

Run: `node bin/cli.js agent list`
Expected: table of 12 agents with names, purposes, sources

- [ ] **Step 4: Verify orchestrate command**

Run: `node bin/cli.js agent orchestrate`
Expected: JSON output with `hasExistingCode: true` (since this repo has package.json)

- [ ] **Step 5: Commit**

```bash
git add lib/commands/agent.js
git commit -m "feat: add yuva agent show/list/orchestrate commands"
```

---

## Task 5: Add `agent` command to CLI router

**Files:**
- Modify: `bin/cli.js:33-83` (help text) and `bin/cli.js:86-155` (command routing)

- [ ] **Step 1: Add agent to help text**

In `bin/cli.js`, replace the Agent Commands section in `showHelp()`:

```js
  log('Agent Commands:', 'bright');
  log('  agent show <name>  Get full agent prompt');
  log('  agent list         List all available agents');
  log('  agent orchestrate  Scan project context\n');
```

Also update the examples:
```js
  log('Examples:', 'bright');
  log('  npx yuva init');
  log('  npx yuva init opencode');
  log('  npx yuva agent list');
  log('  npx yuva agent show requirements');
  log('  npx yuva agent orchestrate');
  log('  npx yuva llm use gpt');
  log('  npx yuva status\n');
```

- [ ] **Step 2: Add agent case to command router**

In the `switch (command)` block, add before the `help` case:

```js
  case 'agent': {
    const agentCommand = require('../lib/commands/agent');
    agentCommand(subArgs);
    break;
  }
```

- [ ] **Step 3: Verify routing works**

Run: `node bin/cli.js agent list`
Expected: agent list table output

Run: `node bin/cli.js help`
Expected: updated help with agent commands

- [ ] **Step 4: Commit**

```bash
git add bin/cli.js
git commit -m "feat: add agent command routing to CLI"
```

---

## Task 6: Rewrite `lib/commands/init.js`

Lightweight init: creates 3-4 files, auto-detects tool, generates pointer files.

**Files:**
- Modify: `lib/commands/init.js` (full rewrite)

- [ ] **Step 1: Rewrite init.js**

```js
const path = require('path');
const fs = require('fs');
const { log, success, warn, box, info, error } = require('../colors');
const { fileExists, ensureDir, writeJSON, readFile, writeFile } = require('../fs-utils');
const { resolvePackagePath, getTemplatePath } = require('../resolve-package');
const { detectTool } = require('../detect-tool');
const { getLLMConfig } = require('../llm-adapters');

function initCommand(options = {}) {
  const targetDir = process.cwd();
  const force = options.force || false;
  const dryRun = options.dryRun || false;
  const requestedTool = options.tool || null;

  box('Yuva AI - Setup');

  // Check for existing setup
  const hasAgentsMd = fileExists(path.join(targetDir, 'AGENTS.md'));
  const hasClaudeMd = fileExists(path.join(targetDir, 'CLAUDE.md'));

  if ((hasAgentsMd || hasClaudeMd) && !force) {
    warn(`${hasAgentsMd ? 'AGENTS.md' : 'CLAUDE.md'} already exists.`);
    log('   Use --force to overwrite.\n', 'yellow');
    process.exit(1);
  }

  // Detect tool
  const tool = requestedTool || detectTool(targetDir);
  const llmConfig = getLLMConfig(tool);
  const toolName = llmConfig ? llmConfig.name : tool;

  info(`Detected AI tool: ${toolName}\n`);

  // Resolve package path
  const pkgPath = resolvePackagePath();
  if (!pkgPath) {
    error('Cannot find yuva-ai package. Try reinstalling.');
    process.exit(1);
  }

  const templatePath = path.join(pkgPath, 'template');

  if (dryRun) {
    info('DRY RUN - No files will be created.\n');
    info('Would create:');
    log(`   AGENTS.md (orchestrator for ${toolName})`);
    log('   .aiautomations/config.json');
    log('   .aiautomations/agents.md (agent index)');
    if (llmConfig && llmConfig.configFile !== 'AGENTS.md' && llmConfig.configFile !== 'CLAUDE.md') {
      log(`   ${llmConfig.configFile} (pointer to AGENTS.md)`);
    }
    return;
  }

  try {
    // 1. Copy AGENTS.md from template
    const agentsMdSrc = path.join(templatePath, 'AGENTS.md');
    if (fileExists(agentsMdSrc)) {
      fs.copyFileSync(agentsMdSrc, path.join(targetDir, 'AGENTS.md'));
    } else {
      // Fallback: copy CLAUDE.md and rename
      const claudeMdSrc = path.join(templatePath, 'CLAUDE.md');
      if (fileExists(claudeMdSrc)) {
        fs.copyFileSync(claudeMdSrc, path.join(targetDir, 'AGENTS.md'));
      }
    }

    // 2. Create .aiautomations/config.json
    const configDir = path.join(targetDir, '.aiautomations');
    ensureDir(configDir);

    const config = {
      tool: tool,
      packagePath: pkgPath,
      version: require('../../package.json').version,
      autoDetected: !requestedTool,
      telemetry: false,
      sessionPersistence: true,
    };
    writeJSON(path.join(configDir, 'config.json'), config);

    // 3. Copy agents.md index
    const agentsIndexSrc = path.join(templatePath, '.aiautomations', 'agents.md');
    if (fileExists(agentsIndexSrc)) {
      fs.copyFileSync(agentsIndexSrc, path.join(configDir, 'agents.md'));
    }

    // 4. Create tool-specific pointer file if needed
    if (llmConfig && llmConfig.configFile !== 'AGENTS.md' && llmConfig.configFile !== 'CLAUDE.md') {
      const pointerPath = path.join(targetDir, llmConfig.configFile);
      ensureDir(path.dirname(pointerPath));
      const pointerContent = [
        `# Yuva AI`,
        `<!-- Auto-generated by yuva init for ${toolName} -->`,
        `<!-- Source of truth: AGENTS.md -->`,
        ``,
        `Read and follow all instructions in the AGENTS.md file in the project root.`,
        `All agent prompts are available via: \`yuva agent show <agent-name>\``,
        `Run \`yuva agent list\` to see all available agents.`,
        `Run \`yuva agent orchestrate\` to scan project context before starting work.`,
        ``
      ].join('\n');
      writeFile(pointerPath, pointerContent);
    }

    // Success output
    success('Created files:');
    log('   AGENTS.md (orchestrator)');
    log('   .aiautomations/config.json');
    log('   .aiautomations/agents.md (agent index)');
    if (llmConfig && llmConfig.configFile !== 'AGENTS.md' && llmConfig.configFile !== 'CLAUDE.md') {
      log(`   ${llmConfig.configFile} (${toolName} pointer)`);
    }

    box('Setup Complete!', 'green');

    log(`\nConfigured for: ${toolName}`, 'bright');
    log(`Agent prompts served from: ${pkgPath}\n`);

    log('Quick start:', 'bright');
    log('  1. Open this project in your AI tool');
    log('  2. The AI reads AGENTS.md and knows how to use agents');
    log('  3. Tell it what you want to build\n');

    log('Commands:', 'bright');
    log('  yuva agent list        List all agents');
    log('  yuva agent show <name> Get agent prompt');
    log('  yuva agent orchestrate Scan project context');
    log('  yuva init <tool>       Reinitialize for different tool');
    log('  yuva doctor            Diagnose setup\n');

  } catch (err) {
    error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = initCommand;
```

- [ ] **Step 2: Update CLI to pass tool argument to init**

In `bin/cli.js`, update the init case:

```js
  case 'init': {
    const initCommand = require('../lib/commands/init');
    initCommand({ force: flags.force, dryRun: flags.dryRun, tool: subArgs[0] || null });
    break;
  }
```

- [ ] **Step 3: Verify init creates lightweight files**

Run (in a temp directory):
```bash
mkdir /tmp/test-yuva && cd /tmp/test-yuva && node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js init
```
Expected: Only AGENTS.md, .aiautomations/config.json, .aiautomations/agents.md created

- [ ] **Step 4: Verify tool override**

Run: `node bin/cli.js init cursor --force` (in test dir)
Expected: also creates `.cursor/rules/yuva.mdc` pointer file

- [ ] **Step 5: Commit**

```bash
git add lib/commands/init.js bin/cli.js
git commit -m "feat: rewrite init for lightweight setup with auto-detection"
```

---

## Task 7: Update `lib/commands/doctor.js` for new setup

**Files:**
- Modify: `lib/commands/doctor.js` (full rewrite)

- [ ] **Step 1: Rewrite doctor.js**

```js
const path = require('path');
const { log, box, success, warn, error } = require('../colors');
const { fileExists, readJSON } = require('../fs-utils');
const { resolvePackagePath } = require('../resolve-package');

function doctorCommand() {
  const targetDir = process.cwd();
  let issues = 0;
  let warnings = 0;

  box('Yuva AI - Doctor');

  // Check AGENTS.md (new) or CLAUDE.md (legacy)
  const hasAgentsMd = fileExists(path.join(targetDir, 'AGENTS.md'));
  const hasClaudeMd = fileExists(path.join(targetDir, 'CLAUDE.md'));

  if (hasAgentsMd) {
    success('AGENTS.md exists');
  } else if (hasClaudeMd) {
    warn('CLAUDE.md exists (legacy format). Run "yuva upgrade" to migrate to AGENTS.md');
    warnings++;
  } else {
    error('AGENTS.md missing - run "yuva init"');
    issues++;
  }

  // Check config.json
  const configPath = path.join(targetDir, '.aiautomations', 'config.json');
  if (fileExists(configPath)) {
    const config = readJSON(configPath);
    if (config && config.tool) {
      success(`Config: tool=${config.tool}, version=${config.version || 'unknown'}`);
    } else {
      warn('Config exists but missing tool setting');
      warnings++;
    }
  } else {
    warn('.aiautomations/config.json missing');
    warnings++;
  }

  // Check agents.md index
  const agentsIndex = path.join(targetDir, '.aiautomations', 'agents.md');
  if (fileExists(agentsIndex)) {
    success('Agent index (.aiautomations/agents.md) exists');
  } else {
    warn('Agent index missing');
    warnings++;
  }

  // Check package path resolution
  const pkgPath = resolvePackagePath();
  if (pkgPath) {
    const promptsDir = path.join(pkgPath, 'template', '.aiautomations', 'prompts');
    if (fileExists(promptsDir)) {
      const fs = require('fs');
      const agents = fs.readdirSync(promptsDir).filter(f => f.endsWith('.md'));
      success(`Package agents: ${agents.length} found at ${pkgPath}`);
    } else {
      error('Package template directory missing');
      issues++;
    }
  } else {
    error('Cannot resolve yuva-ai package path');
    issues++;
  }

  // Check for local overrides
  const localPrompts = path.join(targetDir, '.aiautomations', 'prompts');
  if (fileExists(localPrompts)) {
    const fs = require('fs');
    const local = fs.readdirSync(localPrompts).filter(f => f.endsWith('.md'));
    if (local.length > 0) {
      success(`Local agent overrides: ${local.length} found`);
    }
  }

  // Check session directory
  if (fileExists(path.join(targetDir, '.session'))) {
    success('.session/ directory exists');
  } else {
    warn('.session/ not found (created on first use)');
  }

  // Check Node.js version
  const nodeVersion = process.version;
  const major = parseInt(nodeVersion.slice(1));
  if (major >= 14) {
    success(`Node.js ${nodeVersion}`);
  } else {
    error(`Node.js ${nodeVersion} - requires >=14.0.0`);
    issues++;
  }

  // Summary
  log('');
  if (issues === 0 && warnings === 0) {
    box('All checks passed!', 'green');
  } else if (issues === 0) {
    box(`${warnings} warning(s), no critical issues`, 'yellow');
  } else {
    box(`${issues} issue(s), ${warnings} warning(s) found`, 'red');
  }
}

module.exports = doctorCommand;
```

- [ ] **Step 2: Verify doctor runs**

Run: `node bin/cli.js doctor`
Expected: shows checks for AGENTS.md, config, package resolution

- [ ] **Step 3: Commit**

```bash
git add lib/commands/doctor.js
git commit -m "feat: update doctor for new lightweight setup"
```

---

## Task 8: Update `lib/commands/upgrade.js` for migration

**Files:**
- Modify: `lib/commands/upgrade.js` (full rewrite)

- [ ] **Step 1: Rewrite upgrade.js**

```js
const path = require('path');
const fs = require('fs');
const { log, box, success, warn, info, error } = require('../colors');
const { fileExists, readJSON, writeJSON, ensureDir } = require('../fs-utils');
const { resolvePackagePath } = require('../resolve-package');
const { detectTool } = require('../detect-tool');

function upgradeCommand(options = {}) {
  const targetDir = process.cwd();
  const dryRun = options.dryRun || false;

  box('Yuva AI - Upgrade');

  const hasAgentsMd = fileExists(path.join(targetDir, 'AGENTS.md'));
  const hasClaudeMd = fileExists(path.join(targetDir, 'CLAUDE.md'));

  if (!hasAgentsMd && !hasClaudeMd) {
    warn('Not initialized. Run "yuva init" first.\n');
    return;
  }

  const pkgPath = resolvePackagePath();
  if (!pkgPath) {
    error('Cannot find yuva-ai package. Reinstall with: npm install -g yuva-ai');
    return;
  }

  const templatePath = path.join(pkgPath, 'template');
  let actions = [];

  // Migration: CLAUDE.md → AGENTS.md
  if (hasClaudeMd && !hasAgentsMd) {
    actions.push({ type: 'migrate', desc: 'Rename CLAUDE.md → AGENTS.md' });
  }

  // Check if config.json exists
  const configPath = path.join(targetDir, '.aiautomations', 'config.json');
  if (!fileExists(configPath)) {
    actions.push({ type: 'create-config', desc: 'Create .aiautomations/config.json' });
  }

  // Check if agents.md index exists
  const agentsIndex = path.join(targetDir, '.aiautomations', 'agents.md');
  if (!fileExists(agentsIndex)) {
    actions.push({ type: 'create-index', desc: 'Create .aiautomations/agents.md' });
  }

  // Update AGENTS.md from template
  const templateAgentsMd = path.join(templatePath, 'AGENTS.md');
  if (fileExists(templateAgentsMd) && hasAgentsMd) {
    const current = fs.readFileSync(path.join(targetDir, 'AGENTS.md'), 'utf8');
    const latest = fs.readFileSync(templateAgentsMd, 'utf8');
    if (current !== latest) {
      actions.push({ type: 'update-agents-md', desc: 'Update AGENTS.md to latest version' });
    }
  }

  // Check for old-style full copy (prompts dir with many files)
  const localPrompts = path.join(targetDir, '.aiautomations', 'prompts');
  if (fileExists(localPrompts)) {
    const localFiles = fs.readdirSync(localPrompts).filter(f => f.endsWith('.md'));
    if (localFiles.length > 5) {
      actions.push({ type: 'cleanup-prompts', desc: `Remove ${localFiles.length} copied agent prompts (now served from package)`, files: localFiles });
    }
  }

  if (actions.length === 0) {
    success('Already up to date!\n');
    return;
  }

  log(`\nUpgrade actions: ${actions.length}`, 'bright');
  actions.forEach(a => log(`   ${a.desc}`));

  if (dryRun) {
    info('\nDRY RUN - No files will be modified.\n');
    return;
  }

  log('');

  for (const action of actions) {
    switch (action.type) {
      case 'migrate':
        fs.renameSync(path.join(targetDir, 'CLAUDE.md'), path.join(targetDir, 'AGENTS.md'));
        // Copy new AGENTS.md content from template
        if (fileExists(path.join(templatePath, 'AGENTS.md'))) {
          fs.copyFileSync(path.join(templatePath, 'AGENTS.md'), path.join(targetDir, 'AGENTS.md'));
        }
        success('Migrated CLAUDE.md → AGENTS.md');
        break;

      case 'create-config':
        ensureDir(path.join(targetDir, '.aiautomations'));
        const tool = detectTool(targetDir);
        const config = {
          tool,
          packagePath: pkgPath,
          version: require('../../package.json').version,
          autoDetected: true,
          telemetry: false,
          sessionPersistence: true,
        };
        writeJSON(configPath, config);
        success('Created .aiautomations/config.json');
        break;

      case 'create-index':
        const indexSrc = path.join(templatePath, '.aiautomations', 'agents.md');
        if (fileExists(indexSrc)) {
          ensureDir(path.join(targetDir, '.aiautomations'));
          fs.copyFileSync(indexSrc, agentsIndex);
          success('Created .aiautomations/agents.md');
        }
        break;

      case 'update-agents-md':
        fs.copyFileSync(path.join(templatePath, 'AGENTS.md'), path.join(targetDir, 'AGENTS.md'));
        success('Updated AGENTS.md');
        break;

      case 'cleanup-prompts':
        // Only remove files that match package agents (preserve custom ones)
        const pkgPrompts = path.join(templatePath, '.aiautomations', 'prompts');
        const pkgFiles = fs.readdirSync(pkgPrompts).filter(f => f.endsWith('.md'));
        let removed = 0;
        for (const file of action.files) {
          if (pkgFiles.includes(file)) {
            fs.unlinkSync(path.join(localPrompts, file));
            removed++;
          }
        }
        // Remove prompts dir if empty
        const remaining = fs.readdirSync(localPrompts);
        if (remaining.length === 0) {
          fs.rmdirSync(localPrompts);
        }
        success(`Removed ${removed} copied prompts (now served from package)`);
        break;
    }
  }

  success('\nUpgrade complete!\n');
}

module.exports = upgradeCommand;
```

- [ ] **Step 2: Verify upgrade runs**

Run: `node bin/cli.js upgrade --dry-run`
Expected: shows migration actions without executing

- [ ] **Step 3: Commit**

```bash
git add lib/commands/upgrade.js
git commit -m "feat: update upgrade command with CLAUDE.md → AGENTS.md migration"
```

---

## Task 9: Update `lib/commands/list.js`

Read agents from package instead of requiring local prompts dir.

**Files:**
- Modify: `lib/commands/list.js`

- [ ] **Step 1: Rewrite list.js**

```js
const path = require('path');
const fs = require('fs');
const { log, box, table } = require('../colors');
const { fileExists } = require('../fs-utils');
const { resolvePackagePath } = require('../resolve-package');

const DEV_AGENTS = {
  'existingcodeagent.md': 'Existing Code Analyzer',
  'requirementsagent.md': 'Requirements',
  'riskassessmentagent.md': 'Risk Assessment',
  'planningprompt.md': 'Planner',
  'execution.md': 'Execution',
  'continuityagent.md': 'Continuity',
  'testeragent.md': 'Tester',
  'revieweragent.md': 'Reviewer',
  'securityagent.md': 'Security',
  'debuggeragent.md': 'Debugger',
  'refactoragent.md': 'Refactor',
  'statemanageragent.md': 'State Manager',
};

function listCommand(options = {}) {
  const targetDir = process.cwd();

  box('Yuva AI - Agents');

  const pkgPath = resolvePackagePath();
  const pkgPrompts = pkgPath ? path.join(pkgPath, 'template', '.aiautomations', 'prompts') : null;
  const localPrompts = path.join(targetDir, '.aiautomations', 'prompts');

  log('Development Agents:', 'bright');
  const rows = [];
  for (const [file, name] of Object.entries(DEV_AGENTS)) {
    const inPackage = pkgPrompts && fileExists(path.join(pkgPrompts, file));
    const inLocal = fileExists(path.join(localPrompts, file));
    const source = inLocal ? 'local' : inPackage ? 'package' : 'missing';
    const status = source !== 'missing' ? '\u2705' : '\u274C';
    rows.push([status, name, file, source]);
  }
  table(['', 'Agent', 'File', 'Source'], rows);

  // Check for custom agents
  if (fileExists(localPrompts)) {
    const allLocal = fs.readdirSync(localPrompts).filter(f => f.endsWith('.md'));
    const knownFiles = Object.keys(DEV_AGENTS);
    const custom = allLocal.filter(f => !knownFiles.includes(f) && f !== 'orchestrator.md');
    if (custom.length > 0) {
      log('\nCustom Agents:', 'bright');
      const customRows = custom.map(f => ['\u2705', f.replace('.md', '').replace('agent', ''), f, 'local']);
      table(['', 'Agent', 'File', 'Source'], customRows);
    }
  }

  log(`\n   Total: ${Object.keys(DEV_AGENTS).length} built-in development agents\n`);
}

module.exports = listCommand;
```

- [ ] **Step 2: Verify list works**

Run: `node bin/cli.js list`
Expected: shows 12 dev agents with source column

- [ ] **Step 3: Commit**

```bash
git add lib/commands/list.js
git commit -m "feat: update list to show agents from package with source info"
```

---

## Task 10: Update `lib/llm-adapters.js`

Change claude config to use AGENTS.md. Update configs that share AGENTS.md.

**Files:**
- Modify: `lib/llm-adapters.js:10` and other configFile entries

- [ ] **Step 1: Update configFile entries**

In `lib/llm-adapters.js`, change these entries:
- `claude.configFile`: `'CLAUDE.md'` → `'AGENTS.md'`
- `gpt.configFile`: `'AGENTS.md'` (already correct)
- `codex.configFile`: `'AGENTS.md'` (already correct)
- `opencode.configFile`: `'AGENTS.md'` (already correct)
- `'llm-cli'.configFile`: `'CLAUDE.md'` → `'AGENTS.md'`
- `'open-interpreter'.configFile`: `'CLAUDE.md'` → `'AGENTS.md'`
- `tabby.configFile`: `'CLAUDE.md'` → `'AGENTS.md'`

Also update `claude.description` and `claude.instructions` to reference AGENTS.md.

- [ ] **Step 2: Update detectLLM to check AGENTS.md**

In the `detectLLM` function, ensure it checks for AGENTS.md:

```js
function detectLLM(targetDir) {
  // Check for AGENTS.md first (new format)
  if (fileExists(path.join(targetDir, 'AGENTS.md'))) {
    // Read config to determine tool
    const configPath = path.join(targetDir, '.aiautomations', 'config.json');
    if (fileExists(configPath)) {
      try {
        const config = JSON.parse(require('fs').readFileSync(configPath, 'utf8'));
        if (config.tool && LLM_CONFIGS[config.tool]) {
          return { id: config.tool, ...LLM_CONFIGS[config.tool] };
        }
      } catch {}
    }
  }
  // ... existing detection logic
```

- [ ] **Step 3: Commit**

```bash
git add lib/llm-adapters.js
git commit -m "feat: update LLM adapters to use AGENTS.md"
```

---

## Task 11: Update `bin/postinstall.js`

Lightweight postinstall — no file copying, just a message.

**Files:**
- Modify: `bin/postinstall.js`

- [ ] **Step 1: Rewrite postinstall.js**

```js
#!/usr/bin/env node

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function postinstall() {
  // Skip for global installs
  if (process.env.npm_config_global === 'true') return;

  // Skip if not inside node_modules
  const path = require('path');
  const parentDir = path.dirname(path.dirname(__dirname));
  if (path.basename(parentDir) !== 'node_modules') return;

  log('\n  Yuva AI installed successfully!', 'green');
  log('  Run "npx yuva init" to set up your project.\n', 'cyan');
}

postinstall();
```

- [ ] **Step 2: Commit**

```bash
git add bin/postinstall.js
git commit -m "feat: simplify postinstall to show init message only"
```

---

## Task 12: Remove life agent files from template

**Files:**
- Delete: 23 life agent files from `template/.aiautomations/prompts/`

- [ ] **Step 1: Remove life agent files**

Delete these files from `template/.aiautomations/prompts/`:
```
researchagent.md, teachingagent.md, financeagent.md, businessagent.md,
doctoragent.md, lawyeragent.md, travelagent.md, interviewagent.md,
analyseragent.md, careeragent.md, writeragent.md, wellnessagent.md,
productivityagent.md, fitnessagent.md, stressagent.md, sexualagent.md,
loveguideragent.md, resumeagent.md, negotiationagent.md, parentingagent.md,
socialmediaagent.md, studyagent.md, emailagent.md
```

- [ ] **Step 2: Verify only dev agents remain**

Run: `ls template/.aiautomations/prompts/`
Expected: 13 files (12 dev agents + orchestrator.md)

- [ ] **Step 3: Commit**

```bash
git add -A template/.aiautomations/prompts/
git commit -m "chore: remove life agent files, keep dev agents only"
```

---

## Task 13: Update `package.json`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update description and keywords**

Change description to:
```
"Yuva AI - Development agent framework with 12 agents, 19 LLM platforms, on-demand prompts, and auto-detection"
```

Remove life-related keywords: `life-assistant`, `personal-assistant`

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: update package description and keywords"
```

---

## Task 14: Delete old `template/CLAUDE.md`

**Files:**
- Delete: `template/CLAUDE.md`

- [ ] **Step 1: Remove template/CLAUDE.md**

Only do this after confirming `template/AGENTS.md` exists and is correct.

```bash
rm template/CLAUDE.md
```

- [ ] **Step 2: Verify AGENTS.md exists**

Run: `cat template/AGENTS.md | head -3`
Expected: `# Yuva AI - Development Agent System`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove template/CLAUDE.md, replaced by AGENTS.md"
```

---

## Task 15: End-to-end verification

- [ ] **Step 1: Test fresh init**

```bash
mkdir /tmp/test-yuva-fresh && cd /tmp/test-yuva-fresh
node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js init
```
Expected: creates exactly 3 files (AGENTS.md, config.json, agents.md)

- [ ] **Step 2: Test agent show**

```bash
node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js agent show requirements
```
Expected: full requirementsagent.md content to stdout

- [ ] **Step 3: Test agent orchestrate**

```bash
node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js agent orchestrate
```
Expected: JSON with `hasExistingCode: false` (empty dir)

- [ ] **Step 4: Test init with tool override**

```bash
cd /tmp/test-yuva-fresh
node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js init cursor --force
```
Expected: creates `.cursor/rules/yuva.mdc` pointer file

- [ ] **Step 5: Test doctor**

```bash
node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js doctor
```
Expected: all checks pass

- [ ] **Step 6: Test upgrade from old format**

```bash
mkdir /tmp/test-yuva-old && cd /tmp/test-yuva-old
echo "# old" > CLAUDE.md
node C:/Users/aftab/Desktop/Personal/automation/bin/cli.js upgrade
```
Expected: migrates CLAUDE.md → AGENTS.md, creates config.json and agents.md

- [ ] **Step 7: Clean up test dirs and commit any fixes**
