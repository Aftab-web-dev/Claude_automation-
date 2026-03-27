const path = require('path');
const fs = require('fs');
const os = require('os');

describe('native-configs', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yuva-native-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getBaseTemplate', () => {
    it('should return markdown string with tool name', () => {
      const { getBaseTemplate } = require('../lib/native-configs');
      const result = getBaseTemplate('Claude Code');
      expect(result).toContain('Yuva AI');
      expect(result).toContain('yuva agent orchestrate');
      expect(result).toContain('yuva agent show');
      expect(result).toContain('Build something new');
    });
  });

  describe('updateGitignore', () => {
    it('should create .gitignore if it does not exist', () => {
      const { updateGitignore } = require('../lib/native-configs');
      updateGitignore(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      expect(content).toContain('# Yuva AI - generated native configs');
      expect(content).toContain('CLAUDE.md');
      expect(content).toContain('.claude/');
    });

    it('should append to existing .gitignore', () => {
      fs.writeFileSync(path.join(tmpDir, '.gitignore'), 'node_modules/\n');
      const { updateGitignore } = require('../lib/native-configs');
      updateGitignore(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      expect(content).toContain('node_modules/');
      expect(content).toContain('# Yuva AI - generated native configs');
    });

    it('should not duplicate if already present', () => {
      const { updateGitignore } = require('../lib/native-configs');
      updateGitignore(tmpDir);
      updateGitignore(tmpDir);
      const content = fs.readFileSync(path.join(tmpDir, '.gitignore'), 'utf8');
      const matches = content.match(/# Yuva AI - generated native configs/g);
      expect(matches.length).toBe(1);
    });
  });
});
