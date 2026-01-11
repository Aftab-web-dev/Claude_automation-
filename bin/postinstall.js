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
  // When installed via npm, we're in node_modules/claude-ai-automation/bin
  // We need to go up to find the project root
  let currentDir = __dirname;

  // Go up from bin/ to package root
  currentDir = path.dirname(currentDir);

  // Check if we're in node_modules
  const parentDir = path.dirname(currentDir);
  if (path.basename(parentDir) === 'node_modules') {
    // We're installed as a dependency, project root is parent of node_modules
    return path.dirname(parentDir);
  }

  // We're being run directly (development), use cwd
  return process.cwd();
}

function showNextSteps() {
  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
  log('║                      NEXT STEPS                          ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════╝\n', 'cyan');

  log('  Open Claude and write:', 'bright');
  log('  "Read the CLAUDE.md file and follow the instructions from there"', 'green');
  log('', 'reset');
}

function postinstall() {
  // Skip if this is a global install or development
  if (process.env.npm_config_global === 'true') {
    return;
  }

  const projectRoot = findProjectRoot();
  const templateDir = path.join(__dirname, '..', 'template');

  // Check if template exists (we're properly installed)
  if (!fs.existsSync(templateDir)) {
    return;
  }

  // Check if we're actually in a node_modules context
  const parentDir = path.dirname(path.dirname(__dirname));
  if (path.basename(parentDir) !== 'node_modules') {
    // Not installed as dependency, skip auto-setup
    return;
  }

  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Claude AI Automation System - Auto Setup             ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════╝\n', 'cyan');

  // Check if CLAUDE.md already exists
  if (fs.existsSync(path.join(projectRoot, 'CLAUDE.md'))) {
    log('✅ CLAUDE.md already exists. Skipping file copy.', 'yellow');
    log('   Run "npx claude-ai-automation init --force" to overwrite.\n', 'yellow');
  } else {
    log('📁 Setting up automation system in your project...\n', 'blue');

    try {
      // Copy template directory to project root
      copyDir(templateDir, projectRoot);

      log('✅ Created files:', 'green');
      log('   └── CLAUDE.md (main controller)', 'reset');
      log('   └── .aiautomations/', 'reset');
      log('       ├── prompts/ (11 agent prompts)', 'reset');
      log('       ├── standards/ (5 standard docs)', 'reset');
      log('       ├── checklists/ (3 checklists)', 'reset');
      log('       └── templates/ (4 planning templates)', 'reset');
      log('   └── .session/', 'reset');
      log('       ├── state.md', 'reset');
      log('       ├── log.md', 'reset');
      log('       └── next.md', 'reset');

      log('\n✅ Setup Complete!', 'green');
    } catch (error) {
      log(`\n❌ Error during setup: ${error.message}`, 'red');
      return;
    }
  }

  // Show next steps
  showNextSteps();
}

postinstall();
