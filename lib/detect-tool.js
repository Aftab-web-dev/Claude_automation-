const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function commandExists(cmd) {
  try {
    const isWin = process.platform === 'win32';
    const check = isWin ? `where ${cmd}` : `which ${cmd}`;
    execSync(check, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function detectTool(targetDir) {
  // 1. Check environment variables for IDE
  if (process.env.CURSOR_TRACE_ID || process.env.CURSOR_SESSION) return 'cursor';
  if (process.env.VSCODE_GIT_ASKPASS_MAIN) return 'claude';
  if (process.env.CODEX_ENV) return 'codex';

  // 2. Check existing config files in project
  const configChecks = [
    { file: '.cursor/rules', tool: 'cursor' },
    { file: '.github/copilot-instructions.md', tool: 'copilot' },
    { file: '.windsurfrules', tool: 'windsurf' },
    { file: '.kilo/instructions.md', tool: 'kilo-code' },
    { file: '.sourcegraph/instructions.md', tool: 'cody' },
    { file: '.amazonq/instructions.md', tool: 'amazon-q' },
    { file: '.continue/instructions.md', tool: 'continue' },
    { file: '.aider.conf.yml', tool: 'aider' },
  ];
  for (const { file, tool } of configChecks) {
    if (fs.existsSync(path.join(targetDir, file))) return tool;
  }

  // 3. Check installed CLIs
  const cliChecks = [
    { cmd: 'agy', tool: 'antigravity' },
    { cmd: 'claude', tool: 'claude' },
    { cmd: 'opencode', tool: 'opencode' },
    { cmd: 'codex', tool: 'codex' },
    { cmd: 'aider', tool: 'aider' },
    { cmd: 'ollama', tool: 'ollama' },
  ];
  for (const { cmd, tool } of cliChecks) {
    if (commandExists(cmd)) return tool;
  }

  // 4. Fallback
  return 'claude';
}

module.exports = { detectTool, commandExists };
