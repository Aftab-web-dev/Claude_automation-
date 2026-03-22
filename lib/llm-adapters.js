const path = require('path');
const { fileExists } = require('./fs-utils');

const LLM_CONFIGS = {
  claude: {
    name: 'Claude',
    vendor: 'Anthropic',
    configFile: 'CLAUDE.md',
    description: 'Anthropic Claude (Claude Code, Cursor, VS Code)',
    promptFormat: 'markdown',
    features: ['agent-routing', 'session-persistence', 'quality-gates', 'safety-protocols'],
    instructions: 'Open this project in Claude Code, Cursor, or VS Code with Claude extension.'
  },
  gpt: {
    name: 'GPT',
    vendor: 'OpenAI',
    configFile: 'AGENTS.md',
    description: 'OpenAI GPT (ChatGPT, Codex, GitHub Copilot)',
    promptFormat: 'markdown',
    features: ['agent-routing', 'session-persistence', 'quality-gates', 'safety-protocols'],
    instructions: 'Use with GitHub Copilot or compatible OpenAI-based editors.'
  },
  gemini: {
    name: 'Gemini',
    vendor: 'Google',
    configFile: 'GEMINI.md',
    description: 'Google Gemini (Gemini CLI, AI Studio)',
    promptFormat: 'markdown',
    features: ['agent-routing', 'session-persistence', 'quality-gates', 'safety-protocols'],
    instructions: 'Use with Gemini CLI or Google AI Studio.'
  },
  copilot: {
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    configFile: '.github/copilot-instructions.md',
    description: 'GitHub Copilot with custom instructions',
    promptFormat: 'markdown',
    features: ['agent-routing', 'quality-gates'],
    instructions: 'Works automatically with GitHub Copilot in VS Code.'
  }
};

function getAvailableLLMs() {
  return Object.entries(LLM_CONFIGS).map(([key, config]) => ({
    id: key,
    ...config
  }));
}

function getLLMConfig(llmId) {
  return LLM_CONFIGS[llmId] || null;
}

function detectLLM(targetDir) {
  for (const [id, config] of Object.entries(LLM_CONFIGS)) {
    const configPath = path.join(targetDir, config.configFile);
    if (fileExists(configPath)) {
      return { id, ...config };
    }
  }
  return null;
}

function generateLLMConfig(llmId, masterContent) {
  const config = LLM_CONFIGS[llmId];
  if (!config) return null;

  if (llmId === 'claude') return masterContent;

  let adapted = masterContent;

  adapted = adapted.replace(/Claude AI/g, `${config.name} AI`);
  adapted = adapted.replace(/Claude Code/g, config.name);

  const header = `# ${config.name} AI Universal Assistant System\n\n> Auto-generated from CLAUDE.md for ${config.description}\n> All agent prompts in .aiautomations/prompts/ are compatible.\n\n`;

  adapted = header + adapted.split('\n').slice(1).join('\n');

  return adapted;
}

module.exports = { LLM_CONFIGS, getAvailableLLMs, getLLMConfig, detectLLM, generateLLMConfig };
