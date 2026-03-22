
const { getAvailableLLMs, getLLMsByCategory, getLLMConfig, generateLLMConfig, getModelSuggestions } = require('../lib/llm-adapters');

describe('llm-adapters', () => {
  describe('getAvailableLLMs', () => {
    it('should return all supported LLMs (15+)', () => {
      const llms = getAvailableLLMs();
      expect(llms.length).toBeGreaterThanOrEqual(15);
      const ids = llms.map(l => l.id);
      expect(ids).toContain('claude');
      expect(ids).toContain('gpt');
      expect(ids).toContain('gemini');
      expect(ids).toContain('copilot');
      expect(ids).toContain('ollama');
      expect(ids).toContain('opencode');
      expect(ids).toContain('kilo-code');
      expect(ids).toContain('codex');
      expect(ids).toContain('cursor');
      expect(ids).toContain('windsurf');
      expect(ids).toContain('aider');
      expect(ids).toContain('continue');
    });
  });

  describe('getLLMsByCategory', () => {
    it('should filter by commercial', () => {
      const llms = getLLMsByCategory('commercial');
      expect(llms.length).toBeGreaterThanOrEqual(5);
      llms.forEach(l => expect(l.category).toBe('commercial'));
    });

    it('should filter by open-source', () => {
      const llms = getLLMsByCategory('open-source');
      expect(llms.length).toBeGreaterThanOrEqual(4);
      llms.forEach(l => expect(l.category).toBe('open-source'));
    });

    it('should filter by terminal', () => {
      const llms = getLLMsByCategory('terminal');
      expect(llms.length).toBeGreaterThanOrEqual(2);
      llms.forEach(l => expect(l.category).toBe('terminal'));
    });
  });

  describe('getLLMConfig', () => {
    it('should return config for known LLM', () => {
      const config = getLLMConfig('claude');
      expect(config).not.toBeNull();
      expect(config.name).toBe('Claude');
    });

    it('should return config for ollama', () => {
      const config = getLLMConfig('ollama');
      expect(config).not.toBeNull();
      expect(config.name).toBe('Ollama');
      expect(config.category).toBe('open-source');
      expect(config.models.length).toBeGreaterThan(0);
    });

    it('should return null for unknown LLM', () => {
      expect(getLLMConfig('unknown')).toBeNull();
    });
  });

  describe('generateLLMConfig', () => {
    it('should return original content for claude', () => {
      const content = '# Test Content';
      expect(generateLLMConfig('claude', content)).toBe(content);
    });

    it('should adapt content for other LLMs', () => {
      const content = '# Claude AI Universal\nClaude Code works great.';
      const adapted = generateLLMConfig('gpt', content);
      expect(adapted).toContain('GPT');
    });

    it('should adapt content for ollama', () => {
      const content = '# Claude AI Universal\nClaude Code works.';
      const adapted = generateLLMConfig('ollama', content);
      expect(adapted).toContain('Ollama');
      expect(adapted).toContain('llama3');
    });

    it('should return null for unknown LLM', () => {
      expect(generateLLMConfig('unknown', 'test')).toBeNull();
    });
  });

  describe('getModelSuggestions', () => {
    it('should return models for ollama', () => {
      const models = getModelSuggestions('ollama');
      expect(models.length).toBeGreaterThan(0);
      expect(models).toContain('llama3');
      expect(models).toContain('deepseek-coder');
    });

    it('should return empty array for LLMs without models', () => {
      const models = getModelSuggestions('gpt');
      expect(models).toEqual([]);
    });
  });
});
