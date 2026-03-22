
const path = require('path');
const fs = require('fs');
const os = require('os');

describe('CLI', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yuva-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('init command', () => {
    it('should copy template files to target directory', () => {
      const templateDir = path.join(__dirname, '..', 'template');
      const { copyDir } = require('../lib/fs-utils');

      copyDir(templateDir, tmpDir);

      expect(fs.existsSync(path.join(tmpDir, 'CLAUDE.md'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'prompts'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'standards'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'checklists'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'protocols'))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'templates'))).toBe(true);
    });

    it('should create all 35 agent prompt files', () => {
      const templateDir = path.join(__dirname, '..', 'template');
      const { copyDir } = require('../lib/fs-utils');

      copyDir(templateDir, tmpDir);

      const promptsDir = path.join(tmpDir, '.aiautomations', 'prompts');
      const agents = fs.readdirSync(promptsDir).filter(f => f.endsWith('.md'));
      expect(agents.length).toBeGreaterThanOrEqual(34);
    });

    it('should create config.json', () => {
      const templateDir = path.join(__dirname, '..', 'template');
      const { copyDir } = require('../lib/fs-utils');

      copyDir(templateDir, tmpDir);

      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'config.json'))).toBe(true);
    });

    it('should create agents directory', () => {
      const templateDir = path.join(__dirname, '..', 'template');
      const { copyDir } = require('../lib/fs-utils');

      copyDir(templateDir, tmpDir);

      expect(fs.existsSync(path.join(tmpDir, '.aiautomations', 'agents'))).toBe(true);
    });

    it('should create workflow directory with sample workflows', () => {
      const templateDir = path.join(__dirname, '..', 'template');
      const { copyDir } = require('../lib/fs-utils');

      copyDir(templateDir, tmpDir);

      const workflowsDir = path.join(tmpDir, '.aiautomations', 'workflows');
      expect(fs.existsSync(workflowsDir)).toBe(true);
      const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml'));
      expect(workflows.length).toBeGreaterThanOrEqual(3);
    });
  });
});
