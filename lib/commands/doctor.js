const path = require('path');
const { log, box, success, warn, error } = require('../colors');
const { fileExists, listFiles } = require('../fs-utils');

function doctorCommand() {
  const targetDir = process.cwd();
  let issues = 0;
  let warnings = 0;

  box('Yuva AI - Doctor');

  // Check CLAUDE.md
  if (fileExists(path.join(targetDir, 'CLAUDE.md'))) {
    success('CLAUDE.md exists');
  } else {
    error('CLAUDE.md missing - run "yuva init"');
    issues++;
  }

  // Check prompts directory
  const promptsDir = path.join(targetDir, '.aiautomations', 'prompts');
  if (fileExists(promptsDir)) {
    const agents = listFiles(promptsDir, '*.md');
    if (agents.length >= 34) {
      success(`Agent prompts: ${agents.length} found`);
    } else {
      warn(`Agent prompts: only ${agents.length} found (expected 34+)`);
      warnings++;
    }
  } else {
    error('.aiautomations/prompts/ missing');
    issues++;
  }

  // Check standards
  const standardsDir = path.join(targetDir, '.aiautomations', 'standards');
  if (fileExists(standardsDir)) {
    const files = listFiles(standardsDir, '*.md');
    if (files.length >= 5) {
      success(`Standards: ${files.length} found`);
    } else {
      warn(`Standards: only ${files.length} found`);
      warnings++;
    }
  } else {
    error('.aiautomations/standards/ missing');
    issues++;
  }

  // Check checklists
  const checklistsDir = path.join(targetDir, '.aiautomations', 'checklists');
  if (fileExists(checklistsDir)) {
    const files = listFiles(checklistsDir, '*.md');
    success(`Checklists: ${files.length} found`);
  } else {
    error('.aiautomations/checklists/ missing');
    issues++;
  }

  // Check protocols
  const protocolsDir = path.join(targetDir, '.aiautomations', 'protocols');
  if (fileExists(protocolsDir)) {
    const files = listFiles(protocolsDir, '*.md');
    success(`Protocols: ${files.length} found`);
  } else {
    error('.aiautomations/protocols/ missing');
    issues++;
  }

  // Check templates
  const templatesDir = path.join(targetDir, '.aiautomations', 'templates');
  if (fileExists(templatesDir)) {
    const files = listFiles(templatesDir, '*.md');
    success(`Templates: ${files.length} found`);
  } else {
    warn('.aiautomations/templates/ missing');
    warnings++;
  }

  // Check session directory
  const sessionDir = path.join(targetDir, '.session');
  if (fileExists(sessionDir)) {
    success('.session/ directory exists');
  } else {
    warn('.session/ not found (created on first use)');
  }

  // Check memory directory
  const memoryDir = path.join(targetDir, '.memory');
  if (fileExists(memoryDir)) {
    success('.memory/ directory exists');
  } else {
    warn('.memory/ not found (created on first use)');
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

  // Check agent configs
  const configDir = path.join(targetDir, '.aiautomations', 'agents');
  if (fileExists(configDir)) {
    const configs = listFiles(configDir, '*.json');
    if (configs.length > 0) {
      success(`Agent configs: ${configs.length} found`);
    }
  }

  // Check workflows
  const workflowsDir = path.join(targetDir, '.aiautomations', 'workflows');
  if (fileExists(workflowsDir)) {
    const workflows = listFiles(workflowsDir, '*.yml');
    success(`Workflows: ${workflows.length} found`);
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
