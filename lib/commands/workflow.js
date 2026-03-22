const path = require('path');
const fs = require('fs');
const { log, box, success, warn, error, info, table } = require('../colors');
const { fileExists, readFile, writeFile, ensureDir, listFiles } = require('../fs-utils');
const { validateWorkflowName } = require('../validator');

const SAMPLE_WORKFLOW = `# Workflow: {{NAME}}
# Multi-agent pipeline definition

name: {{NAME}}
description: Custom workflow

steps:
  - agent: research
    task: "Research the topic thoroughly"
    output: research_notes

  - agent: writer
    task: "Write content based on research"
    input: research_notes
    output: draft

  - agent: reviewer
    task: "Review the draft for quality"
    input: draft
    output: final
`;

function workflowCommand(args = []) {
  const action = args[0];

  switch (action) {
    case 'list':
      return listWorkflows();
    case 'create':
      return createWorkflow(args.slice(1));
    case 'show':
      return showWorkflow(args[1]);
    case 'delete':
      return deleteWorkflow(args[1]);
    default:
      showWorkflowHelp();
  }
}

function showWorkflowHelp() {
  box('Yuva AI - Workflows');
  log('Workflows define multi-agent pipelines.\n', 'bright');
  log('Usage:', 'bright');
  log('   yuva workflow list              List all workflows');
  log('   yuva workflow create <name>     Create a new workflow');
  log('   yuva workflow show <name>       Show workflow details');
  log('   yuva workflow delete <name>     Delete a workflow\n');
  log('Example workflow (YAML):', 'bright');
  log('   name: blog-post');
  log('   steps:');
  log('     - agent: research');
  log('       task: "Research the topic"');
  log('       output: research_notes');
  log('     - agent: writer');
  log('       task: "Write the article"');
  log('       input: research_notes\n');
}

function listWorkflows() {
  const targetDir = process.cwd();
  const workflowsDir = path.join(targetDir, '.aiautomations', 'workflows');

  box('Available Workflows');

  if (!fileExists(workflowsDir)) {
    info('No workflows defined yet.');
    log('   Create one with: yuva workflow create <name>\n');
    return;
  }

  const files = listFiles(workflowsDir, '*.yml');
  if (files.length === 0) {
    info('No workflows defined yet.');
    log('   Create one with: yuva workflow create <name>\n');
    return;
  }

  const rows = files.map(f => {
    const content = readFile(path.join(workflowsDir, f)) || '';
    const descMatch = content.match(/^description:\s*(.+)$/m);
    const stepCount = (content.match(/- agent:/g) || []).length;
    return [
      f.replace('.yml', ''),
      descMatch ? descMatch[1] : '-',
      `${stepCount} steps`
    ];
  });

  table(['Name', 'Description', 'Steps'], rows);
  log('');
}

function createWorkflow(args) {
  const name = args[0];
  const validation = validateWorkflowName(name);
  if (!validation.valid) {
    error(validation.error);
    return;
  }

  const targetDir = process.cwd();
  const workflowsDir = path.join(targetDir, '.aiautomations', 'workflows');
  ensureDir(workflowsDir);

  const filePath = path.join(workflowsDir, `${name}.yml`);
  if (fileExists(filePath)) {
    warn(`Workflow "${name}" already exists.`);
    return;
  }

  const content = SAMPLE_WORKFLOW.replace(/\{\{NAME\}\}/g, name);
  writeFile(filePath, content);

  success(`Created workflow "${name}"`);
  log(`   File: .aiautomations/workflows/${name}.yml`);
  log('   Edit the file to customize your workflow.\n');
}

function showWorkflow(name) {
  if (!name) {
    error('Workflow name required. Usage: yuva workflow show <name>');
    return;
  }

  const targetDir = process.cwd();
  const filePath = path.join(targetDir, '.aiautomations', 'workflows', `${name}.yml`);

  if (!fileExists(filePath)) {
    error(`Workflow "${name}" not found.`);
    return;
  }

  box(`Workflow: ${name}`);
  const content = readFile(filePath);
  log(content);
}

function deleteWorkflow(name) {
  if (!name) {
    error('Workflow name required. Usage: yuva workflow delete <name>');
    return;
  }

  const targetDir = process.cwd();
  const filePath = path.join(targetDir, '.aiautomations', 'workflows', `${name}.yml`);

  if (!fileExists(filePath)) {
    error(`Workflow "${name}" not found.`);
    return;
  }

  fs.unlinkSync(filePath);
  success(`Deleted workflow "${name}"\n`);
}

module.exports = workflowCommand;
