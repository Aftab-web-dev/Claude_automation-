const path = require('path');
const { copyDir, fileExists, getTemplateDir } = require('../fs-utils');
const { log, success, warn, box, info } = require('../colors');

function initCommand(options = {}) {
  const targetDir = process.cwd();
  const templateDir = getTemplateDir();
  const force = options.force || false;
  const dryRun = options.dryRun || false;

  box('Claude AI Automation System - Setup');

  if (fileExists(path.join(targetDir, 'CLAUDE.md'))) {
    warn('CLAUDE.md already exists in this directory.');
    if (!force) {
      log('   Use --force to overwrite existing files.\n', 'yellow');
      process.exit(1);
    }
    warn('--force flag detected. Overwriting...\n');
  }

  if (dryRun) {
    info('DRY RUN - No files will be created.\n');
    info('Would create:');
    log('   └── CLAUDE.md (main controller)');
    log('   └── .aiautomations/');
    log('       ├── prompts/ (34 agents: 11 dev + 23 life)');
    log('       ├── protocols/ (collaboration, memory, quality, escalation)');
    log('       ├── standards/ (8 standard docs)');
    log('       ├── checklists/ (5 checklists)');
    log('       ├── templates/ (6 planning templates)');
    log('       └── workflows/ (3 sample workflows)');
    return;
  }

  info('Creating automation system files...\n');

  try {
    copyDir(templateDir, targetDir);

    success('Created files:');
    log('   └── CLAUDE.md (main controller)');
    log('   └── .aiautomations/');
    log('       ├── prompts/ (34 agents: 11 dev + 23 life)');
    log('       ├── protocols/ (collaboration, memory, quality, escalation)');
    log('       ├── standards/ (8 standard docs)');
    log('       ├── checklists/ (5 checklists)');
    log('       ├── templates/ (6 planning templates)');
    log('       └── workflows/ (3 sample workflows)');

    box('Setup Complete!', 'green');

    log('\n📖 How to use:', 'bright');
    log('   1. Open this project in Claude Code / Cursor / VS Code');
    log('   2. Claude will automatically read CLAUDE.md');
    log('   3. Tell Claude what you want to build');
    log('   4. The system handles planning, execution, testing, etc.\n');

    log('🚀 Quick Commands:', 'bright');
    log('   caia status      → Show project status');
    log('   caia list         → List all agents');
    log('   caia doctor       → Diagnose setup issues');
    log('   caia upgrade      → Update agent prompts\n');
  } catch (err) {
    log(`\n❌ Error: ${err.message}`, 'red');
    process.exit(1);
  }
}

module.exports = initCommand;
