const path = require('path');
const fs = require('fs');
const { log, box, success, warn, info } = require('../colors');
const { copyDir, fileExists, getTemplateDir, listFiles } = require('../fs-utils');

function upgradeCommand(options = {}) {
  const targetDir = process.cwd();
  const templateDir = getTemplateDir();
  const dryRun = options.dryRun || false;

  box('Claude AI Automation - Upgrade');

  if (!fileExists(path.join(targetDir, 'CLAUDE.md'))) {
    warn('Not initialized. Run "caia init" first.\n');
    return;
  }

  const templatePrompts = path.join(templateDir, '.aiautomations', 'prompts');
  const installedPrompts = path.join(targetDir, '.aiautomations', 'prompts');

  const templateFiles = fileExists(templatePrompts) ? listFiles(templatePrompts, '*.md') : [];
  const installedFiles = fileExists(installedPrompts) ? listFiles(installedPrompts, '*.md') : [];

  const newAgents = templateFiles.filter(f => !installedFiles.includes(f));
  const existingAgents = templateFiles.filter(f => installedFiles.includes(f));

  let updatedCount = 0;

  const updatedAgents = [];
  for (const file of existingAgents) {
    const templateContent = fs.readFileSync(path.join(templatePrompts, file), 'utf8');
    const installedContent = fs.readFileSync(path.join(installedPrompts, file), 'utf8');
    if (templateContent !== installedContent) {
      updatedAgents.push(file);
    }
  }

  if (newAgents.length === 0 && updatedAgents.length === 0) {
    success('All agents are up to date!\n');
    return;
  }

  if (newAgents.length > 0) {
    log(`\n📦 New agents available: ${newAgents.length}`, 'bright');
    newAgents.forEach(f => log(`   + ${f}`, 'green'));
  }

  if (updatedAgents.length > 0) {
    log(`\n🔄 Updated agents: ${updatedAgents.length}`, 'bright');
    updatedAgents.forEach(f => log(`   ~ ${f}`, 'yellow'));
  }

  if (dryRun) {
    info('\nDRY RUN - No files will be modified.\n');
    return;
  }

  for (const file of newAgents) {
    fs.copyFileSync(
      path.join(templatePrompts, file),
      path.join(installedPrompts, file)
    );
    updatedCount++;
  }

  for (const file of updatedAgents) {
    fs.copyFileSync(
      path.join(templatePrompts, file),
      path.join(installedPrompts, file)
    );
    updatedCount++;
  }

  const dirs = ['standards', 'checklists', 'protocols', 'templates'];
  for (const dir of dirs) {
    const templateSub = path.join(templateDir, '.aiautomations', dir);
    const installedSub = path.join(targetDir, '.aiautomations', dir);
    if (fileExists(templateSub)) {
      copyDir(templateSub, installedSub);
    }
  }

  const templateClaude = path.join(templateDir, 'CLAUDE.md');
  if (fileExists(templateClaude)) {
    fs.copyFileSync(templateClaude, path.join(targetDir, 'CLAUDE.md'));
  }

  success(`\nUpgraded ${updatedCount} agents and refreshed system files.\n`);
}

module.exports = upgradeCommand;
