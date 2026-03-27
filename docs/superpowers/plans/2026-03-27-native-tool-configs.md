# Native Multi-Tool Config Generation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `yuva init` generate rich, native configuration files for each AI coding tool that act as thin drivers routing everything through Yuva AI's CLI.

**Architecture:** New `lib/native-configs.js` module containing the base template generator, per-tool generators, and gitignore updater. Modified `lib/commands/init.js` for interactive flow and `--all` flag. Modified `bin/cli.js` to pass the new flag. No external dependencies — uses Node.js `readline` for prompts.

**Tech Stack:** Node.js, `readline` (built-in), vitest for tests.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `lib/native-configs.js` | Create | Base template, per-tool generators, gitignore updater |
| `lib/prompt-utils.js` | Create | Interactive readline prompts (confirm, select) |
| `lib/commands/init.js` | Modify | Interactive flow, `--all` flag, call native-configs |
| `bin/cli.js` | Modify | Parse `--all` flag, pass to init |
| `tests/native-configs.test.js` | Create | Tests for all generators |
| `tests/prompt-utils.test.js` | Create | Tests for interactive prompts |

---

### Task 1: Create `lib/prompt-utils.js` — Interactive Prompts

**Files:**
- Create: `lib/prompt-utils.js`
- Test: `tests/prompt-utils.test.js`

- [ ] **Step 1: Write the failing test for `confirm()`**

```js
// tests/prompt-utils.test.js
const { confirm, select } = require('../lib/prompt-utils');

describe('prompt-utils', () => {
  describe('confirm', () => {
    it('should return true for "y" input', async () => {
      const result = await confirm('Use this?', { testInput: 'y' });
      expect(result).toBe(true);
    });

    it('should return true for empty input (default yes)', async () => {
      const result = await confirm('Use this?', { testInput: '' });
      expect(result).toBe(true);
    });

    it('should return false for "n" input', async () => {
      const result = await confirm('Use this?', { testInput: 'n' });
      expect(result).toBe(false);
    });
  });

  describe('select', () => {
    it('should return the selected option id', async () => {
      const options = [
        { id: 'claude', name: 'Claude Code', category: 'Commercial' },
        { id: 'cursor', name: 'Cursor', category: 'Commercial' },
      ];
      const result = await select('Pick a tool:', options, { testInput: '1' });
      expect(result).toBe('claude');
    });

    it('should return null for invalid input', async () => {
      const options = [
        { id: 'claude', name: 'Claude Code', category: 'Commercial' },
      ];
      const result = await select('Pick:', options, { testInput: '99' });
      expect(result).toBe(null);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/prompt-utils.test.js`
Expected: FAIL with "Cannot find module '../lib/prompt-utils'"

- [ ] **Step 3: Implement `lib/prompt-utils.js`**

```js
// lib/prompt-utils.js
const readline = require('readline');
const { log, colorize } = require('./colors');

function confirm(message, options = {}) {
  // Test mode — skip readline
  if (options.testInput !== undefined) {
    const input = options.testInput.trim().toLowerCase();
    return Promise.resolve(input !== 'n');
  }

  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`  ${message} (Y/n): `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() !== 'n');
    });
  });
}

function select(message, options, opts = {}) {
  // Test mode — skip readline
  if (opts.testInput !== undefined) {
    const index = parseInt(opts.testInput, 10) - 1;
    if (index >= 0 && index < options.length) {
      return Promise.resolve(options[index].id);
    }
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    log(`\n  ${message}\n`);

    // Group by category
    const categories = {};
    options.forEach((opt) => {
      const cat = opt.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(opt);
    });

    let index = 1;
    const indexMap = {};
    for (const [category, items] of Object.entries(categories)) {
      log(`  ${colorize(category + ':', 'bright')}`);
      const row = [];
      items.forEach((item) => {
        indexMap[index] = item.id;
        row.push(`    ${colorize(String(index) + '.', 'cyan')} ${item.name}`);
        index++;
      });
      // Print 3 per row
      for (let i = 0; i < row.length; i += 3) {
        log(row.slice(i, i + 3).map(r => r.padEnd(28)).join(''));
      }
      log('');
    }

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('  Enter number: ', (answer) => {
      rl.close();
      const num = parseInt(answer.trim(), 10);
      resolve(indexMap[num] || null);
    });
  });
}

module.exports = { confirm, select };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/prompt-utils.test.js`
Expected: PASS (all 4 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/prompt-utils.js tests/prompt-utils.test.js
git commit -m "feat: add interactive prompt utilities for yuva init"
```

---

### Task 2: Create `lib/native-configs.js` — Base Template and Gitignore

**Files:**
- Create: `lib/native-configs.js`
- Test: `tests/native-configs.test.js`

- [ ] **Step 1: Write failing tests for `getBaseTemplate()` and `updateGitignore()`**

```js
// tests/native-configs.test.js
const path = require('path');
const fs = require('fs');
const os = require('os');

describe('native-configs', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yuva-native-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getBaseTemplate', () => {
    it('should return markdown string with tool name', () => {
      const { getBaseTemplate } = require('../lib/native-configs');
      const result = getBaseTemplate('Claude Code');
      expect(result).toContain('Yuva AI');
      expect(result).toContain('yuva agent orchestrate');
      expect(result).toContain('yuva agent show');
      expect(result).toContain('Build something new');
    });
  });

  describe('updateGitignore', () => {
    it('should create .gitignore if it does not exist', () => {
      const { updateGitignore } = require('../lib/native-configs');
      updateGitignore(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      expect(content).toContain('# Yuva AI - generated native configs');
      expect(content).toContain('CLAUDE.md');
      expect(content).toContain('.claude/');
    });

    it('should append to existing .gitignore', () => {
      fs.writeFileSync(path.join(tmpDir, '.gitignore'), 'node_modules/\n');
      const { updateGitignore } = require('../lib/native-configs');
      updateGitignore(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      expect(content).toContain('node_modules/');
      expect(content).toContain('# Yuva AI - generated native configs');
    });

    it('should not duplicate if already present', () => {
      const { updateGitignore } = require('../lib/native-configs');
      updateGitignore(tmpDir);
      updateGitignore(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      const matches = content.match(/# Yuva AI - generated native configs/g);
      expect(matches.length).toBe(1);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/native-configs.test.js`
Expected: FAIL with "Cannot find module '../lib/native-configs'"

- [ ] **Step 3: Implement base template and gitignore updater**

```js
// lib/native-configs.js
const path = require('path');
const fs = require('fs');
const { ensureDir, fileExists, writeFile } = require('./fs-utils');

const GITIGNORE_MARKER = '# Yuva AI - generated native configs';

const GITIGNORE_BLOCK = `
${GITIGNORE_MARKER} (regenerate with: yuva init)
# Source of truth: AGENTS.md + .aiautomations/
CLAUDE.md
.claude/
GEMINI.md
.cursor/rules/yuva-*.mdc
.windsurfrules
.github/copilot-instructions.md
.kilo/
.sourcegraph/
.amazonq/
.continue/
.aider.conf.yml
OLLAMA_INSTRUCTIONS.md
`;

function getBaseTemplate(toolName) {
  return `# Yuva AI - ${toolName} Configuration
<!-- Auto-generated by yuva init. Do not edit — regenerate with: yuva init --force -->

## CRITICAL: Before ANY task
You MUST run \`yuva agent orchestrate\` first. Do NOT start work without it.
Read the JSON output to understand the project state.

## How to load agent instructions
NEVER guess or improvise agent behavior.
Run: \`yuva agent show <name>\` to get the EXACT prompt for any agent.
Follow each agent's instructions completely before moving to the next.

## Agent Selection Guide

| User wants to...        | Run these agents in order                                                     |
|-------------------------|-------------------------------------------------------------------------------|
| Build something new     | \`yuva agent show requirements\` then \`riskassessment\` then \`planning\` then \`execution\` |
| Continue previous work  | \`yuva agent show continuity\` then resume from last point                    |
| Fix a bug / error       | \`yuva agent show debugger\`                                                  |
| Write tests             | \`yuva agent show tester\`                                                    |
| Review code quality     | \`yuva agent show reviewer\`                                                  |
| Check security          | \`yuva agent show security\`                                                  |
| Clean up / improve code | \`yuva agent show refactor\`                                                  |

## Rules
1. Always run \`yuva agent orchestrate\` first
2. If existing code exists, run \`yuva agent show existingcode\` BEFORE any other agent
3. One agent at a time — complete each before the next
4. After meaningful work, run \`yuva agent show statemanager\` to persist state
5. Load standards from \`.aiautomations/standards/\` when writing code
6. Load checklists from \`.aiautomations/checklists/\` before/after code

## Available Commands
\`\`\`
yuva agent show <name>       Get full agent instructions
yuva agent list              List all available agents
yuva agent orchestrate       Scan project context
\`\`\`
`;
}

function updateGitignore(targetDir) {
  const gitignorePath = path.join(targetDir, '.gitignore');
  let content = '';

  if (fileExists(gitignorePath)) {
    content = fs.readFileSync(gitignorePath, 'utf8');
    if (content.includes(GITIGNORE_MARKER)) {
      return; // Already present
    }
  }

  content += GITIGNORE_BLOCK;
  fs.writeFileSync(gitignorePath, content);
}

module.exports = {
  getBaseTemplate,
  updateGitignore,
  GITIGNORE_MARKER,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/native-configs.test.js`
Expected: PASS (all 4 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/native-configs.js tests/native-configs.test.js
git commit -m "feat: add base template and gitignore updater for native configs"
```

---

### Task 3: Add Claude Code Generator

**Files:**
- Modify: `lib/native-configs.js`
- Modify: `tests/native-configs.test.js`

- [ ] **Step 1: Write failing tests for `generateClaudeConfig()`**

Add to `tests/native-configs.test.js` inside the main `describe`:

```js
  describe('generateClaudeConfig', () => {
    it('should create CLAUDE.md with base template', () => {
      const { generateClaudeConfig } = require('../lib/native-configs');
      const files = generateClaudeConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, 'CLAUDE.md'), 'utf8');
      expect(content).toContain('Yuva AI - Claude Code Configuration');
      expect(content).toContain('yuva agent orchestrate');
      expect(files).toContain('CLAUDE.md');
    });

    it('should create slash command files', () => {
      const { generateClaudeConfig } = require('../lib/native-configs');
      generateClaudeConfig(tmpDir);
      const commandsDir = path.join(tmpDir, '.claude', 'commands');
      expect(fs.existsSync(path.join(commandsDir, 'debug.md'))).toBe(true);
      expect(fs.existsSync(path.join(commandsDir, 'review.md'))).toBe(true);
      expect(fs.existsSync(path.join(commandsDir, 'test.md'))).toBe(true);
      expect(fs.existsSync(path.join(commandsDir, 'security.md'))).toBe(true);
      expect(fs.existsSync(path.join(commandsDir, 'plan.md'))).toBe(true);
      expect(fs.existsSync(path.join(commandsDir, 'orchestrate.md'))).toBe(true);
    });

    it('should create command files that call yuva CLI', () => {
      const { generateClaudeConfig } = require('../lib/native-configs');
      generateClaudeConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.claude', 'commands', 'debug.md'), 'utf8');
      expect(content).toContain('yuva agent show debugger');
      expect(content).toContain('$ARGUMENTS');
    });

    it('should create settings.json with yuva permissions', () => {
      const { generateClaudeConfig } = require('../lib/native-configs');
      generateClaudeConfig(tmpDir);
      const settings = JSON.parse(fs.readFileSync(path.join(tmpDir, '.claude', 'settings.json'), 'utf8'));
      expect(settings.permissions.allow).toContain('Bash(yuva *)');
    });

    it('should return list of created files', () => {
      const { generateClaudeConfig } = require('../lib/native-configs');
      const files = generateClaudeConfig(tmpDir);
      expect(files.length).toBeGreaterThanOrEqual(8);
    });
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/native-configs.test.js`
Expected: FAIL with "generateClaudeConfig is not a function"

- [ ] **Step 3: Implement `generateClaudeConfig()`**

Add to `lib/native-configs.js` before `module.exports`:

```js
const CLAUDE_COMMANDS = {
  debug: { agent: 'debugger', desc: 'Run the debugger agent to investigate and fix bugs' },
  review: { agent: 'reviewer', desc: 'Run the code reviewer agent for quality audits' },
  test: { agent: 'tester', desc: 'Run the tester agent to write and run tests' },
  security: { agent: 'security', desc: 'Run the security agent for vulnerability analysis' },
  plan: { agent: 'planning', desc: 'Run the planning agent to design architecture' },
  orchestrate: { agent: null, desc: 'Scan project context before starting work' },
};

function generateClaudeConfig(targetDir) {
  const files = [];

  // 1. CLAUDE.md
  const claudeMd = getBaseTemplate('Claude Code');
  writeFile(path.join(targetDir, 'CLAUDE.md'), claudeMd);
  files.push('CLAUDE.md');

  // 2. Slash commands
  const commandsDir = path.join(targetDir, '.claude', 'commands');
  ensureDir(commandsDir);

  for (const [name, config] of Object.entries(CLAUDE_COMMANDS)) {
    let content;
    if (config.agent) {
      content = `Run \`yuva agent show ${config.agent}\` and follow the output as your complete instructions for this task.\n\nUser context: $ARGUMENTS\n`;
    } else {
      content = `Run \`yuva agent orchestrate\` and use the JSON output to understand the project state before proceeding.\n\nUser context: $ARGUMENTS\n`;
    }
    writeFile(path.join(commandsDir, `${name}.md`), content);
    files.push(`.claude/commands/${name}.md`);
  }

  // 3. settings.json
  const settings = {
    permissions: {
      allow: [
        'Bash(yuva *)',
        'Bash(yuva agent show *)',
        'Bash(yuva agent list)',
        'Bash(yuva agent orchestrate)',
      ],
    },
  };
  writeFile(path.join(targetDir, '.claude', 'settings.json'), JSON.stringify(settings, null, 2) + '\n');
  files.push('.claude/settings.json');

  return files;
}
```

Update `module.exports`:

```js
module.exports = {
  getBaseTemplate,
  updateGitignore,
  generateClaudeConfig,
  GITIGNORE_MARKER,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/native-configs.test.js`
Expected: PASS (all 9 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/native-configs.js tests/native-configs.test.js
git commit -m "feat: add Claude Code native config generator"
```

---

### Task 4: Add Cursor Generator

**Files:**
- Modify: `lib/native-configs.js`
- Modify: `tests/native-configs.test.js`

- [ ] **Step 1: Write failing tests for `generateCursorConfig()`**

Add to `tests/native-configs.test.js`:

```js
  describe('generateCursorConfig', () => {
    it('should create yuva-agents.mdc with glob frontmatter', () => {
      const { generateCursorConfig } = require('../lib/native-configs');
      generateCursorConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.cursor', 'rules', 'yuva-agents.mdc'), 'utf8');
      expect(content).toContain('globs: **/*');
      expect(content).toContain('yuva agent orchestrate');
    });

    it('should create yuva-code.mdc scoped to source files', () => {
      const { generateCursorConfig } = require('../lib/native-configs');
      generateCursorConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.cursor', 'rules', 'yuva-code.mdc'), 'utf8');
      expect(content).toContain('globs: src/**,lib/**,app/**');
      expect(content).toContain('yuva agent show reviewer');
    });

    it('should create yuva-testing.mdc scoped to test files', () => {
      const { generateCursorConfig } = require('../lib/native-configs');
      generateCursorConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.cursor', 'rules', 'yuva-testing.mdc'), 'utf8');
      expect(content).toContain('globs: tests/**,test/**,**/*.test.*,**/*.spec.*');
      expect(content).toContain('yuva agent show tester');
    });

    it('should return list of created files', () => {
      const { generateCursorConfig } = require('../lib/native-configs');
      const files = generateCursorConfig(tmpDir);
      expect(files).toHaveLength(3);
    });
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/native-configs.test.js`
Expected: FAIL with "generateCursorConfig is not a function"

- [ ] **Step 3: Implement `generateCursorConfig()`**

Add to `lib/native-configs.js`:

```js
function generateCursorConfig(targetDir) {
  const files = [];
  const rulesDir = path.join(targetDir, '.cursor', 'rules');
  ensureDir(rulesDir);

  // 1. yuva-agents.mdc — always active
  const agentsRule = `---
description: Yuva AI agent routing — always active
globs: **/*
---

${getBaseTemplate('Cursor')}`;
  writeFile(path.join(rulesDir, 'yuva-agents.mdc'), agentsRule);
  files.push('.cursor/rules/yuva-agents.mdc');

  // 2. yuva-code.mdc — scoped to source files
  const codeRule = `---
description: Yuva AI code standards — load before writing code
globs: src/**,lib/**,app/**
---

Before writing or modifying code, run: \`yuva agent show reviewer\`
Follow the agent instructions for code quality standards.
Load code standards from: \`.aiautomations/standards/codestandards.md\`
Load API design standards from: \`.aiautomations/standards/apidesign.md\`
Run checklist before coding: \`.aiautomations/checklists/beforecode.md\`
Run checklist after coding: \`.aiautomations/checklists/aftercode.md\`
`;
  writeFile(path.join(rulesDir, 'yuva-code.mdc'), codeRule);
  files.push('.cursor/rules/yuva-code.mdc');

  // 3. yuva-testing.mdc — scoped to test files
  const testRule = `---
description: Yuva AI testing standards — load before writing tests
globs: tests/**,test/**,**/*.test.*,**/*.spec.*
---

Before writing tests, run: \`yuva agent show tester\`
Follow the agent instructions completely.
Load testing standards from: \`.aiautomations/standards/testingstandards.md\`
Load testing checklist from: \`.aiautomations/checklists/beforecode.md\`
`;
  writeFile(path.join(rulesDir, 'yuva-testing.mdc'), testRule);
  files.push('.cursor/rules/yuva-testing.mdc');

  return files;
}
```

Update `module.exports` to include `generateCursorConfig`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/native-configs.test.js`
Expected: PASS (all 13 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/native-configs.js tests/native-configs.test.js
git commit -m "feat: add Cursor native config generator"
```

---

### Task 5: Add Single-File Generators (Copilot, Windsurf, Gemini, Kilo, Cody, Amazon Q, Continue, Ollama, Aider)

**Files:**
- Modify: `lib/native-configs.js`
- Modify: `tests/native-configs.test.js`

- [ ] **Step 1: Write failing tests for `generateSingleFileConfig()` and specialized generators**

Add to `tests/native-configs.test.js`:

```js
  describe('generateSingleFileConfig', () => {
    it('should create copilot instructions', () => {
      const { generateCopilotConfig } = require('../lib/native-configs');
      const files = generateCopilotConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.github', 'copilot-instructions.md'), 'utf8');
      expect(content).toContain('Yuva AI - GitHub Copilot Configuration');
      expect(content).toContain('yuva agent orchestrate');
      expect(files).toContain('.github/copilot-instructions.md');
    });

    it('should create windsurf rules', () => {
      const { generateWindsurfConfig } = require('../lib/native-configs');
      const files = generateWindsurfConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.windsurfrules'), 'utf8');
      expect(content).toContain('Yuva AI - Windsurf Configuration');
      expect(files).toContain('.windsurfrules');
    });

    it('should create gemini config', () => {
      const { generateGeminiConfig } = require('../lib/native-configs');
      const files = generateGeminiConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, 'GEMINI.md'), 'utf8');
      expect(content).toContain('Yuva AI - Gemini Configuration');
      expect(files).toContain('GEMINI.md');
    });

    it('should create kilo code instructions', () => {
      const { generateKiloConfig } = require('../lib/native-configs');
      const files = generateKiloConfig(tmpDir);
      expect(fs.existsSync(path.join(tmpDir, '.kilo', 'instructions.md'))).toBe(true);
      expect(files).toContain('.kilo/instructions.md');
    });

    it('should create cody instructions', () => {
      const { generateCodyConfig } = require('../lib/native-configs');
      const files = generateCodyConfig(tmpDir);
      expect(fs.existsSync(path.join(tmpDir, '.sourcegraph', 'instructions.md'))).toBe(true);
      expect(files).toContain('.sourcegraph/instructions.md');
    });

    it('should create amazon q instructions', () => {
      const { generateAmazonQConfig } = require('../lib/native-configs');
      const files = generateAmazonQConfig(tmpDir);
      expect(fs.existsSync(path.join(tmpDir, '.amazonq', 'instructions.md'))).toBe(true);
      expect(files).toContain('.amazonq/instructions.md');
    });

    it('should create continue instructions', () => {
      const { generateContinueConfig } = require('../lib/native-configs');
      const files = generateContinueConfig(tmpDir);
      expect(fs.existsSync(path.join(tmpDir, '.continue', 'instructions.md'))).toBe(true);
      expect(files).toContain('.continue/instructions.md');
    });

    it('should create ollama instructions with fallback note', () => {
      const { generateOllamaConfig } = require('../lib/native-configs');
      const files = generateOllamaConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, 'OLLAMA_INSTRUCTIONS.md'), 'utf8');
      expect(content).toContain('Yuva AI - Ollama Configuration');
      expect(content).toContain('.aiautomations/prompts/');
      expect(files).toContain('OLLAMA_INSTRUCTIONS.md');
    });

    it('should create aider config yaml', () => {
      const { generateAiderConfig } = require('../lib/native-configs');
      const files = generateAiderConfig(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.aider.conf.yml'), 'utf8');
      expect(content).toContain('read: AGENTS.md');
      expect(files).toContain('.aider.conf.yml');
    });
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/native-configs.test.js`
Expected: FAIL with "generateCopilotConfig is not a function"

- [ ] **Step 3: Implement all single-file generators**

Add to `lib/native-configs.js`:

```js
function generateSingleFileConfig(toolName, filePath, targetDir, extraContent) {
  const files = [];
  const content = getBaseTemplate(toolName) + (extraContent || '');
  writeFile(path.join(targetDir, filePath), content);
  files.push(filePath);
  return files;
}

function generateCopilotConfig(targetDir) {
  return generateSingleFileConfig('GitHub Copilot', '.github/copilot-instructions.md', targetDir);
}

function generateWindsurfConfig(targetDir) {
  return generateSingleFileConfig('Windsurf', '.windsurfrules', targetDir);
}

function generateGeminiConfig(targetDir) {
  return generateSingleFileConfig('Gemini', 'GEMINI.md', targetDir);
}

function generateKiloConfig(targetDir) {
  return generateSingleFileConfig('Kilo Code', '.kilo/instructions.md', targetDir);
}

function generateCodyConfig(targetDir) {
  return generateSingleFileConfig('Cody', '.sourcegraph/instructions.md', targetDir);
}

function generateAmazonQConfig(targetDir) {
  return generateSingleFileConfig('Amazon Q', '.amazonq/instructions.md', targetDir);
}

function generateContinueConfig(targetDir) {
  return generateSingleFileConfig('Continue', '.continue/instructions.md', targetDir);
}

function generateOllamaConfig(targetDir) {
  const fallback = `
## Fallback (if yuva CLI is not available)
If \`yuva\` CLI is not installed, read agent prompts directly from:
\`.aiautomations/prompts/<agentname>agent.md\`

Available prompt files:
- existingcodeagent.md — Analyze existing code
- requirementsagent.md — Gather requirements
- planningprompt.md — Design architecture
- execution.md — Implement code
- debuggeragent.md — Fix bugs
- testeragent.md — Write tests
- revieweragent.md — Review code
- securityagent.md — Security audit
- refactoragent.md — Refactor code
`;
  return generateSingleFileConfig('Ollama', 'OLLAMA_INSTRUCTIONS.md', targetDir, fallback);
}

function generateAiderConfig(targetDir) {
  const files = [];
  const content = '# Yuva AI - Aider Configuration\n# Auto-generated by yuva init\nread: AGENTS.md\n';
  writeFile(path.join(targetDir, '.aider.conf.yml'), content);
  files.push('.aider.conf.yml');
  return files;
}
```

Update `module.exports` to include all new exports:

```js
module.exports = {
  getBaseTemplate,
  updateGitignore,
  generateClaudeConfig,
  generateCursorConfig,
  generateCopilotConfig,
  generateWindsurfConfig,
  generateGeminiConfig,
  generateKiloConfig,
  generateCodyConfig,
  generateAmazonQConfig,
  generateContinueConfig,
  generateOllamaConfig,
  generateAiderConfig,
  GITIGNORE_MARKER,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/native-configs.test.js`
Expected: PASS (all 22 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/native-configs.js tests/native-configs.test.js
git commit -m "feat: add all single-file native config generators"
```

---

### Task 6: Add `generateNativeConfig()` and `generateAllNativeConfigs()` Dispatchers

**Files:**
- Modify: `lib/native-configs.js`
- Modify: `tests/native-configs.test.js`

- [ ] **Step 1: Write failing tests for dispatchers**

Add to `tests/native-configs.test.js`:

```js
  describe('generateNativeConfig', () => {
    it('should dispatch to claude generator', () => {
      const { generateNativeConfig } = require('../lib/native-configs');
      const files = generateNativeConfig('claude', tmpDir);
      expect(files).toContain('CLAUDE.md');
      expect(files).toContain('.claude/settings.json');
    });

    it('should dispatch to cursor generator', () => {
      const { generateNativeConfig } = require('../lib/native-configs');
      const files = generateNativeConfig('cursor', tmpDir);
      expect(files).toContain('.cursor/rules/yuva-agents.mdc');
    });

    it('should return empty array for tools that use AGENTS.md natively', () => {
      const { generateNativeConfig } = require('../lib/native-configs');
      const files = generateNativeConfig('codex', tmpDir);
      expect(files).toHaveLength(0);
    });

    it('should return empty array for unknown tool', () => {
      const { generateNativeConfig } = require('../lib/native-configs');
      const files = generateNativeConfig('unknown-tool', tmpDir);
      expect(files).toHaveLength(0);
    });
  });

  describe('generateAllNativeConfigs', () => {
    it('should generate configs for all tools', () => {
      const { generateAllNativeConfigs } = require('../lib/native-configs');
      const result = generateAllNativeConfigs(tmpDir);
      expect(result.totalFiles).toBeGreaterThan(10);
      expect(result.tools).toContain('claude');
      expect(result.tools).toContain('cursor');
      expect(result.tools).toContain('copilot');
    });

    it('should create CLAUDE.md and .windsurfrules and GEMINI.md', () => {
      const { generateAllNativeConfigs } = require('../lib/native-configs');
      generateAllNativeConfigs(tmpDir);
      expect(fs.existsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.windsurfrules'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, 'GEMINI.md'))).toBe(true);
    });
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/native-configs.test.js`
Expected: FAIL with "generateNativeConfig is not a function"

- [ ] **Step 3: Implement dispatchers**

Add to `lib/native-configs.js`:

```js
const TOOL_GENERATORS = {
  claude: generateClaudeConfig,
  cursor: generateCursorConfig,
  copilot: generateCopilotConfig,
  windsurf: generateWindsurfConfig,
  gemini: generateGeminiConfig,
  'kilo-code': generateKiloConfig,
  cody: generateCodyConfig,
  'amazon-q': generateAmazonQConfig,
  continue: generateContinueConfig,
  ollama: generateOllamaConfig,
  lmstudio: generateOllamaConfig,
  jan: generateOllamaConfig,
  aider: generateAiderConfig,
  // These read AGENTS.md natively — no extra config needed
  // codex, opencode, antigravity, 'open-interpreter', tabby, 'llm-cli', gpt
};

function generateNativeConfig(toolId, targetDir) {
  const generator = TOOL_GENERATORS[toolId];
  if (!generator) return [];
  return generator(targetDir);
}

function generateAllNativeConfigs(targetDir) {
  const allFiles = [];
  const tools = [];

  for (const [toolId, generator] of Object.entries(TOOL_GENERATORS)) {
    const files = generator(targetDir);
    if (files.length > 0) {
      allFiles.push(...files);
      tools.push(toolId);
    }
  }

  return { files: allFiles, tools, totalFiles: allFiles.length };
}
```

Update `module.exports` to include `generateNativeConfig`, `generateAllNativeConfigs`, and `TOOL_GENERATORS`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/native-configs.test.js`
Expected: PASS (all 28 tests)

- [ ] **Step 5: Commit**

```bash
git add lib/native-configs.js tests/native-configs.test.js
git commit -m "feat: add native config dispatchers for single and all tools"
```

---

### Task 7: Modify `bin/cli.js` to Parse `--all` Flag

**Files:**
- Modify: `bin/cli.js:1-15`

- [ ] **Step 1: Write failing test**

Add to `tests/cli.test.js` (or verify manually):

```js
  it('should parse --all flag', () => {
    // This is a structural change — verified by integration in Task 8
    // The flag parsing in cli.js must pass `all: true` to initCommand
    const cliContent = fs.readFileSync(path.join(__dirname, '..', 'bin', 'cli.js'), 'utf8');
    expect(cliContent).toContain('flags.all');
  });
```

- [ ] **Step 2: Modify `bin/cli.js` flag parsing**

In `bin/cli.js`, add `all` to the flags object at line 6:

```js
const flags = {
  force: args.includes('--force'),
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose'),
  all: args.includes('--all'),
  version: args.includes('--version') || args.includes('-v'),
};
```

Update the init case at line 91-94:

```js
  case 'init': {
    const initCommand = require('../lib/commands/init');
    initCommand({ force: flags.force, dryRun: flags.dryRun, all: flags.all, tool: subArgs[0] || null });
    break;
  }
```

- [ ] **Step 3: Run tests to verify nothing breaks**

Run: `npx vitest run`
Expected: All existing tests PASS

- [ ] **Step 4: Commit**

```bash
git add bin/cli.js tests/cli.test.js
git commit -m "feat: add --all flag parsing in CLI for native config generation"
```

---

### Task 8: Rewrite `lib/commands/init.js` with Interactive Flow

**Files:**
- Modify: `lib/commands/init.js`

- [ ] **Step 1: Read the current init.js (already done during planning)**

Current behavior: detect tool, copy AGENTS.md, create .aiautomations, write pointer file.

New behavior: detect tool, confirm with user, create AGENTS.md + .aiautomations, generate native config, update gitignore.

- [ ] **Step 2: Rewrite `lib/commands/init.js`**

```js
// lib/commands/init.js
const path = require('path');
const fs = require('fs');
const { log, success, warn, box, info, error } = require('../colors');
const { fileExists, ensureDir, writeJSON, writeFile } = require('../fs-utils');
const { resolvePackagePath } = require('../resolve-package');
const { detectTool } = require('../detect-tool');
const { getLLMConfig, LLM_CONFIGS } = require('../llm-adapters');
const { generateNativeConfig, generateAllNativeConfigs, updateGitignore } = require('../native-configs');
const { confirm, select } = require('../prompt-utils');

async function initCommand(options = {}) {
  const targetDir = process.cwd();
  const force = options.force || false;
  const dryRun = options.dryRun || false;
  const all = options.all || false;
  const requestedTool = options.tool || null;

  box('Yuva AI - Setup');

  // Check for existing setup
  const hasAgentsMd = fileExists(path.join(targetDir, 'AGENTS.md'));
  if (hasAgentsMd && !force) {
    warn('AGENTS.md already exists.');
    log('   Use --force to overwrite.\n', 'yellow');
    process.exit(1);
  }

  // Resolve package path
  const pkgPath = resolvePackagePath();
  if (!pkgPath) {
    error('Cannot find yuva-ai package. Try reinstalling.');
    process.exit(1);
  }

  // Determine tool(s)
  let selectedTool = requestedTool;

  if (!all && !selectedTool) {
    // Auto-detect and confirm
    const detected = detectTool(targetDir);
    const llmConfig = getLLMConfig(detected);
    const detectedName = llmConfig ? llmConfig.name : detected;

    info(`Detected: ${detectedName}`);

    const useDetected = await confirm(`Use ${detectedName}?`, options);
    if (useDetected) {
      selectedTool = detected;
    } else {
      // Show selection list
      const toolOptions = Object.entries(LLM_CONFIGS).map(([id, config]) => ({
        id,
        name: config.name,
        category: config.category === 'commercial' ? 'Commercial' :
                  config.category === 'terminal' ? 'Terminal / CLI' :
                  config.category === 'open-source' ? 'Open Source' : 'Other',
      }));

      selectedTool = await select('Which AI tool are you using?', toolOptions, options);
      if (!selectedTool) {
        error('No tool selected. Exiting.');
        process.exit(1);
      }
    }
  }

  const llmConfig = selectedTool ? getLLMConfig(selectedTool) : null;
  const toolName = llmConfig ? llmConfig.name : (all ? 'All Tools' : selectedTool);

  info(`Configuring for: ${toolName}\n`);

  if (dryRun) {
    info('DRY RUN - No files will be created.\n');
    info('Would create:');
    log('   AGENTS.md (orchestrator)');
    log('   .aiautomations/config.json');
    log('   .aiautomations/agents.md (agent index)');
    if (all) {
      const result = generateAllNativeConfigs(path.join(require('os').tmpdir(), 'yuva-dry-' + Date.now()));
      result.files.forEach(f => log(`   ${f} (native config)`));
    } else if (selectedTool) {
      const tmpDry = path.join(require('os').tmpdir(), 'yuva-dry-' + Date.now());
      const files = generateNativeConfig(selectedTool, tmpDry);
      files.forEach(f => log(`   ${f} (native config)`));
      fs.rmSync(tmpDry, { recursive: true, force: true });
    }
    log('   .gitignore (updated)');
    return;
  }

  const createdFiles = [];

  try {
    // 1. Copy AGENTS.md from template
    const templatePath = path.join(pkgPath, 'template');
    const agentsMdSrc = path.join(templatePath, 'AGENTS.md');
    if (fileExists(agentsMdSrc)) {
      fs.copyFileSync(agentsMdSrc, path.join(targetDir, 'AGENTS.md'));
      createdFiles.push('AGENTS.md');
    }

    // 2. Create .aiautomations/config.json
    const configDir = path.join(targetDir, '.aiautomations');
    ensureDir(configDir);

    const pkg = require(path.join(pkgPath, 'package.json'));
    const config = {
      tool: selectedTool || 'all',
      packagePath: pkgPath,
      version: pkg.version,
      autoDetected: !requestedTool && !all,
      telemetry: false,
      sessionPersistence: true,
    };
    writeJSON(path.join(configDir, 'config.json'), config);
    createdFiles.push('.aiautomations/config.json');

    // 3. Copy agents.md index
    const agentsIndexSrc = path.join(templatePath, '.aiautomations', 'agents.md');
    if (fileExists(agentsIndexSrc)) {
      fs.copyFileSync(agentsIndexSrc, path.join(configDir, 'agents.md'));
      createdFiles.push('.aiautomations/agents.md');
    }

    // 4. Generate native configs
    if (all) {
      const result = generateAllNativeConfigs(targetDir);
      createdFiles.push(...result.files);
      info(`Generated native configs for ${result.tools.length} tools`);
    } else if (selectedTool) {
      const files = generateNativeConfig(selectedTool, targetDir);
      createdFiles.push(...files);
    }

    // 5. Update .gitignore
    updateGitignore(targetDir);
    createdFiles.push('.gitignore (updated)');

    // Success output
    success('Created files:');
    createdFiles.forEach(f => log(`   ${f}`));

    box('Setup Complete!', 'green');

    log(`\nConfigured for: ${toolName}`, 'bright');
    log(`Agent prompts served from: ${pkgPath}\n`);

    log('Quick start:', 'bright');
    log('  1. Open this project in your AI tool');
    log('  2. The AI reads its native config and uses yuva commands');
    log('  3. Tell it what you want to build\n');

    log('Commands:', 'bright');
    log('  yuva agent list        List all agents');
    log('  yuva agent show <name> Get agent prompt');
    log('  yuva agent orchestrate Scan project context');
    log('  yuva init --all        Generate configs for all tools');
    log('  yuva init --force      Regenerate configs\n');

  } catch (err) {
    error(`Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = initCommand;
```

- [ ] **Step 3: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 4: Manual smoke test**

```bash
cd /tmp && mkdir yuva-test && cd yuva-test && git init
node /path/to/automation/bin/cli.js init --tool claude --force
# Verify: AGENTS.md, CLAUDE.md, .claude/commands/, .claude/settings.json, .gitignore all exist
ls -la CLAUDE.md .claude/commands/ .claude/settings.json
cat .gitignore | grep "Yuva AI"
```

- [ ] **Step 5: Commit**

```bash
git add lib/commands/init.js
git commit -m "feat: rewrite init with interactive flow and native config generation"
```

---

### Task 9: Update Help Text and Documentation

**Files:**
- Modify: `bin/cli.js:41`

- [ ] **Step 1: Update help text in `bin/cli.js`**

Replace the init line in `showHelp()`:

```js
  log('  init [tool]       Initialize for AI tool (auto-detects if omitted)');
```

With:

```js
  log('  init              Initialize for AI tool (interactive, auto-detects)');
  log('  init --all        Generate native configs for ALL supported tools');
  log('  init --tool <n>   Initialize for specific tool (skip prompt)');
```

- [ ] **Step 2: Run tests**

Run: `npx vitest run`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add bin/cli.js
git commit -m "docs: update help text with --all flag and interactive init"
```

---

### Task 10: Final Integration Test

**Files:**
- Modify: `tests/cli.test.js`

- [ ] **Step 1: Add integration test for full init flow**

Add to `tests/cli.test.js`:

```js
  describe('init with native configs', () => {
    it('should generate claude native config via initCommand', () => {
      const origCwd = process.cwd();
      process.chdir(tmpDir);

      // Create a minimal package.json so resolvePackagePath works
      const pkgRoot = path.join(__dirname, '..');

      const initCommand = require('../lib/commands/init');
      // Use testInput to simulate confirm("y")
      initCommand({ tool: 'claude', force: true, testInput: 'y' });

      expect(fs.existsSync(path.join(tmpDir, 'AGENTS.md'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.claude', 'commands', 'debug.md'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.claude', 'settings.json'))).toBe(true);

      // Check gitignore was updated
      const gitignore = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      expect(gitignore).toContain('Yuva AI');

      process.chdir(origCwd);
    });
  });
```

- [ ] **Step 2: Run all tests**

Run: `npx vitest run`
Expected: All PASS

- [ ] **Step 3: Commit**

```bash
git add tests/cli.test.js
git commit -m "test: add integration test for native config generation"
```

---

## Summary

| Task | What | New/Modified Files |
|------|------|--------------------|
| 1 | Interactive prompts | `lib/prompt-utils.js`, `tests/prompt-utils.test.js` |
| 2 | Base template + gitignore | `lib/native-configs.js`, `tests/native-configs.test.js` |
| 3 | Claude generator | `lib/native-configs.js` |
| 4 | Cursor generator | `lib/native-configs.js` |
| 5 | All single-file generators | `lib/native-configs.js` |
| 6 | Dispatcher functions | `lib/native-configs.js` |
| 7 | CLI `--all` flag | `bin/cli.js` |
| 8 | Rewrite init.js | `lib/commands/init.js` |
| 9 | Help text update | `bin/cli.js` |
| 10 | Integration test | `tests/cli.test.js` |
