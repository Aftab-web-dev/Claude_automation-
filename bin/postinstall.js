#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function findProjectRoot() {
  let currentDir = __dirname;
  currentDir = path.dirname(currentDir);
  const parentDir = path.dirname(currentDir);
  if (path.basename(parentDir) === 'node_modules') {
    return path.dirname(parentDir);
  }
  return process.cwd();
}

function showNextSteps() {
  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
  log('║                      NEXT STEPS                          ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════╝\n', 'cyan');

  log('  Quick start:', 'bright');
  log('  "Read the CLAUDE.md file and follow the instructions from there"', 'green');
  log('', 'reset');

  log('  CLI Commands:', 'bright');
  log('  npx yuva status        → Show project status', 'reset');
  log('  npx yuva list          → List all agents', 'reset');
  log('  npx yuva doctor        → Diagnose setup issues', 'reset');
  log('  npx yuva upgrade       → Update agent prompts', 'reset');
  log('  npx yuva llm list      → Show supported LLMs', 'reset');
  log('  npx yuva workflow list → Show available workflows', 'reset');
  log('  npx yuva help          → Full help\n', 'reset');
}

function postinstall() {
  if (process.env.npm_config_global === 'true') {
    return;
  }

  const projectRoot = findProjectRoot();
  const templateDir = path.join(__dirname, '..', 'template');

  if (!fs.existsSync(templateDir)) {
    return;
  }

  const parentDir = path.dirname(path.dirname(__dirname));
  if (path.basename(parentDir) !== 'node_modules') {
    return;
  }

  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Claude AI Automation System v2.0 - Auto Setup       ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════╝\n', 'cyan');

  if (fs.existsSync(path.join(projectRoot, 'CLAUDE.md'))) {
    log('✅ CLAUDE.md already exists. Skipping file copy.', 'yellow');
    log('   Run "npx yuva init --force" to overwrite.\n', 'yellow');
  } else {
    log('📁 Setting up automation system in your project...\n', 'blue');

    try {
      copyDir(templateDir, projectRoot);

      log('✅ Created files:', 'green');
      log('   └── CLAUDE.md (main controller)');
      log('   └── .aiautomations/');
      log('       ├── prompts/ (34 agents: 11 dev + 23 life)');
      log('       ├── protocols/ (collaboration, memory, quality, escalation)');
      log('       ├── standards/ (8 standard docs)');
      log('       ├── checklists/ (5 checklists)');
      log('       ├── templates/ (6 planning templates)');
      log('       └── workflows/ (3 sample workflows)');
      log('   └── .session/ (session persistence)');
      log('   └── .memory/ (user memory)');

      log('\n✅ Setup Complete!', 'green');
    } catch (error) {
      log(`\n❌ Error during setup: ${error.message}`, 'red');
      return;
    }
  }

  showNextSteps();
}

postinstall();
