const path = require('path');
const fs = require('fs');
const { log, box, success, warn, error, info, table } = require('../colors');
const { fileExists, readFile, writeFile, readJSON, writeJSON } = require('../fs-utils');
const { getAvailableLLMs, getLLMConfig, generateLLMConfig, detectLLM } = require('../llm-adapters');

function llmCommand(args = []) {
  const action = args[0];

  switch (action) {
    case 'list': return listLLMs();
    case 'use': return useLLM(args[1]);
    case 'detect': return detectCurrentLLM();
    case 'generate': return generateConfigs(args[1]);
    default: showLLMHelp();
  }
}

function showLLMHelp() {
  box('Claude AI Automation - LLM Support');
  log('Configure which LLM platform to use.\n', 'bright');
  log('Usage:', 'bright');
  log('   caia llm list          List supported LLMs');
  log('   caia llm use <name>    Set active LLM');
  log('   caia llm detect        Detect current LLM');
  log('   caia llm generate      Generate configs for all LLMs');
  log('   caia llm generate <n>  Generate config for specific LLM\n');
}

function listLLMs() {
  box('Supported LLMs');
  const llms = getAvailableLLMs();
  const rows = llms.map(l => [l.id, l.name, l.vendor, l.configFile]);
  table(['ID', 'Name', 'Vendor', 'Config File'], rows);

  const configPath = path.join(process.cwd(), '.aiautomations', 'config.json');
  const config = readJSON(configPath) || {};
  log(`\n   Current: ${config.llm || 'claude'}\n`);
}

function useLLM(llmId) {
  if (!llmId) {
    error('LLM name required. Use "caia llm list" to see options.');
    return;
  }

  const configData = getLLMConfig(llmId);
  if (!configData) {
    error(`Unknown LLM: ${llmId}. Use "caia llm list" to see options.`);
    return;
  }

  const configPath = path.join(process.cwd(), '.aiautomations', 'config.json');
  const config = readJSON(configPath) || {};
  config.llm = llmId;
  config.llmConfig = configData.configFile;
  writeJSON(configPath, config);

  const claudeMd = path.join(process.cwd(), 'CLAUDE.md');
  if (fileExists(claudeMd)) {
    const content = readFile(claudeMd);
    const adapted = generateLLMConfig(llmId, content);
    if (adapted && llmId !== 'claude') {
      const targetFile = path.join(process.cwd(), configData.configFile);
      const dir = path.dirname(targetFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      writeFile(targetFile, adapted);
      success(`Set LLM to ${configData.name}`);
      log(`   Generated: ${configData.configFile}\n`);
    } else {
      success(`Set LLM to ${configData.name}\n`);
    }
  } else {
    success(`Set LLM to ${configData.name}\n`);
  }
}

function detectCurrentLLM() {
  const targetDir = process.cwd();
  const detected = detectLLM(targetDir);

  if (detected) {
    success(`Detected: ${detected.name} (${detected.vendor})`);
    log(`   Config: ${detected.configFile}\n`);
  } else {
    warn('No LLM configuration detected.');
    info('Run "caia init" to set up.\n');
  }
}

function generateConfigs(specific) {
  const targetDir = process.cwd();
  const claudeMd = path.join(targetDir, 'CLAUDE.md');

  if (!fileExists(claudeMd)) {
    error('CLAUDE.md not found. Run "caia init" first.');
    return;
  }

  const content = readFile(claudeMd);
  const llms = getAvailableLLMs();

  const toGenerate = specific
    ? llms.filter(l => l.id === specific)
    : llms.filter(l => l.id !== 'claude');

  if (toGenerate.length === 0) {
    error(specific ? `Unknown LLM: ${specific}` : 'No LLMs to generate configs for.');
    return;
  }

  for (const llm of toGenerate) {
    const adapted = generateLLMConfig(llm.id, content);
    if (adapted) {
      const targetFile = path.join(targetDir, llm.configFile);
      const dir = path.dirname(targetFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      writeFile(targetFile, adapted);
      success(`Generated ${llm.configFile} for ${llm.name}`);
    }
  }
  log('');
}

module.exports = llmCommand;
