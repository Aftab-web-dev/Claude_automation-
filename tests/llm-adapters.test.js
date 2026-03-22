
const { getAvailableLLMs, getLLMConfig, generateLLMConfig } = require('../lib/llm-adapters');

describe('llm-adapters', () => {
  describe('getAvailableLLMs', () => {
    it('should return all supported LLMs', () => {
      const llms = getAvailableLLMs();
      expect(llms.length).toBeGreaterThanOrEqual(4);
      const ids = llms.map(l => l.id);
      expect(ids).toContain('claude');
      expect(ids).toContain('gpt');
      expect(ids).toContain('gemini');
      expect(ids).toContain('copilot');
    });
  });

  describe('getLLMConfig', () => {
    it('should return config for known LLM', () => {
      const config = getLLMConfig('claude');
      expect(config).not.toBeNull();
      expect(config.name).toBe('Claude');
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

    it('should return null for unknown LLM', () => {
      expect(generateLLMConfig('unknown', 'test')).toBeNull();
    });
  });
});
