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

function init() {
  const targetDir = process.cwd();
  const templateDir = path.join(__dirname, '..', 'template');

  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Claude AI Automation System - Setup                  ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════╝\n', 'cyan');

  // Check if CLAUDE.md already exists
  if (fs.existsSync(path.join(targetDir, 'CLAUDE.md'))) {
    log('⚠️  CLAUDE.md already exists in this directory.', 'yellow');
    log('   Use --force to overwrite existing files.\n', 'yellow');

    if (!process.argv.includes('--force')) {
      process.exit(1);
    }
    log('   --force flag detected. Overwriting...\n', 'yellow');
  }

  log('📁 Creating automation system files...\n', 'blue');

  try {
    // Copy template directory
    copyDir(templateDir, targetDir);

    log('✅ Created files:', 'green');
    log('   └── CLAUDE.md (main controller)', 'reset');
    log('   └── .aiautomations/', 'reset');
    log('       ├── prompts/ (34 agents: 11 dev + 23 life)', 'reset');
    log('       ├── protocols/ (collaboration, memory, quality)', 'reset');
    log('       ├── standards/ (8 standard docs)', 'reset');
    log('       ├── checklists/ (5 checklists)', 'reset');
    log('       └── templates/ (6 planning templates)', 'reset');

    log('\n╔══════════════════════════════════════════════════════════╗', 'green');
    log('║     ✅ Setup Complete!                                   ║', 'green');
    log('╚══════════════════════════════════════════════════════════╝', 'green');

    log('\n📖 How to use:', 'bright');
    log('   1. Open this project in Claude Code / Cursor / VS Code', 'reset');
    log('   2. Claude will automatically read CLAUDE.md', 'reset');
    log('   3. Tell Claude what you want to build', 'reset');
    log('   4. The system handles planning, execution, testing, etc.\n', 'reset');

    log('🚀 Development Commands:', 'bright');
    log('   "Build [something]"  → Plans and builds your project', 'reset');
    log('   "Continue"           → Resumes from last session', 'reset');
    log('   "Test"               → Runs testing agent', 'reset');
    log('   "Review"             → Runs code review agent', 'reset');
    log('   "Security"           → Runs security audit agent', 'reset');
    log('   "Debug"              → Runs debugger agent', 'reset');
    log('   "Refactor"           → Runs refactor agent\n', 'reset');

    log('🌟 Life Assistant Commands:', 'bright');
    log('   "Interview prep"     → Mock interviews & coaching', 'reset');
    log('   "Financial advice"   → Investment & budget education', 'reset');
    log('   "Health question"    → Medical guidance (not diagnosis)', 'reset');
    log('   "Career help"        → Resume, job search, growth', 'reset');
    log('   "Stress management"  → Coping techniques & support', 'reset');
    log('   "Teach me [topic]"   → Learning & education', 'reset');
    log('   "Plan a trip"        → Travel itineraries\n', 'reset');

    log('📚 Documentation: https://github.com/Aftab-web-dev/claude-ai-automation\n', 'cyan');

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

function showHelp() {
  log('\n╔══════════════════════════════════════════════════════════╗', 'cyan');
  log('║     Claude AI Automation System                          ║', 'cyan');
  log('╚══════════════════════════════════════════════════════════╝\n', 'cyan');

  log('Usage:', 'bright');
  log('  npx claude-ai-automation init    Initialize in current directory', 'reset');
  log('  npx claude-ai-automation help    Show this help message', 'reset');
  log('  npx caia init                    Short alias\n', 'reset');

  log('Options:', 'bright');
  log('  --force    Overwrite existing files\n', 'reset');

  log('Examples:', 'bright');
  log('  cd my-project', 'reset');
  log('  npx claude-ai-automation init\n', 'reset');
}

// Main
const command = process.argv[2];

switch (command) {
  case 'init':
    init();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (!command) {
      showHelp();
    } else {
      log(`\n❌ Unknown command: ${command}`, 'red');
      log('   Run "npx claude-ai-automation help" for usage.\n', 'reset');
      process.exit(1);
    }
}
