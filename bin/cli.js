#!/usr/bin/env node

// Parse flags
const args = process.argv.slice(2);
const flags = {
  force: args.includes('--force'),
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose'),
  all: args.includes('--all'),
  version: args.includes('--version') || args.includes('-v'),
};

// Remove flags from args
const commands = args.filter(a => !a.startsWith('--') && !a.startsWith('-v'));
const command = commands[0];
const subArgs = commands.slice(1);

// Version check
if (flags.version) {
  const pkg = require('../package.json');
  console.log(`yuva-ai v${pkg.version}`);
  process.exit(0);
}

// Set up verbose logging
if (flags.verbose) {
  const { getLogger } = require('../lib/logger');
  getLogger({ verbose: true });
}

// Load color utilities
const { log, box } = require('../lib/colors');

function showHelp() {
  const pkg = require('../package.json');
  box(`Yuva AI v${pkg.version}`);

  log('Usage:', 'bright');
  log('  yuva <command> [options]\n');

  log('Setup Commands:', 'bright');
  log('  init              Initialize for AI tool (interactive, auto-detects)');
  log('  init --all        Generate native configs for ALL supported tools');
  log('  init --tool <n>   Initialize for specific tool (skip prompt)');
  log('  upgrade           Update/migrate to latest format');
  log('  update            Update yuva-ai and regenerate all configs');
  log('  doctor            Diagnose setup issues\n');

  log('Agent Commands:', 'bright');
  log('  agent show <name> Get full agent prompt');
  log('  agent list        List all available agents');
  log('  agent orchestrate Scan project context');
  log('  list              List all installed agents');
  log('  add create <name> Create a custom agent');
  log('  add remove <name> Remove an agent\n');

  log('Workflow Commands:', 'bright');
  log('  workflow list     List all workflows');
  log('  workflow create   Create a new workflow');
  log('  workflow show     Show workflow details');
  log('  workflow delete   Delete a workflow\n');

  log('Configuration:', 'bright');
  log('  config            Show/edit configuration');
  log('  config set <k> <v>  Set a config value');
  log('  llm list          List supported LLMs');
  log('  llm use <name>    Switch LLM platform');
  log('  llm generate      Generate configs for all LLMs\n');

  log('Analytics:', 'bright');
  log('  status            Show project status');
  log('  telemetry         Manage usage analytics');
  log('  analytics         View analytics dashboard\n');

  log('Options:', 'bright');
  log('  --force           Overwrite existing files');
  log('  --dry-run         Preview changes without applying');
  log('  --verbose         Enable detailed logging');
  log('  --version, -v     Show version');
  log('  --skip-npm        Skip npm update (only regenerate configs)\n');

  log('Examples:', 'bright');
  log('  npx yuva init');
  log('  npx yuva init opencode');
  log('  npx yuva agent list');
  log('  npx yuva agent show requirements');
  log('  npx yuva agent orchestrate');
  log('  npx yuva llm use gpt');
  log('  npx yuva status\n');

  log('Documentation: https://github.com/Aftab-web-dev/yuva-ai\n', 'cyan');
}

// Route commands
switch (command) {
  case 'init': {
    const initCommand = require('../lib/commands/init');
    initCommand({ force: flags.force, dryRun: flags.dryRun, all: flags.all, tool: subArgs[0] || null });
    break;
  }
  case 'agent': {
    const agentCommand = require('../lib/commands/agent');
    agentCommand(subArgs);
    break;
  }
  case 'status': {
    const statusCommand = require('../lib/commands/status');
    statusCommand();
    break;
  }
  case 'doctor': {
    const doctorCommand = require('../lib/commands/doctor');
    doctorCommand();
    break;
  }
  case 'list': {
    const listCommand = require('../lib/commands/list');
    listCommand({ category: subArgs[0] });
    break;
  }
  case 'upgrade': {
    const upgradeCommand = require('../lib/commands/upgrade');
    upgradeCommand({ dryRun: flags.dryRun });
    break;
  }
  case 'update': {
    const updateCommand = require('../lib/commands/update');
    updateCommand({ dryRun: flags.dryRun, skipNpm: args.includes('--skip-npm') });
    break;
  }
  case 'config': {
    const configCommand = require('../lib/commands/config');
    configCommand(subArgs);
    break;
  }
  case 'add': {
    const addCommand = require('../lib/commands/add');
    addCommand(subArgs);
    break;
  }
  case 'workflow': {
    const workflowCommand = require('../lib/commands/workflow');
    workflowCommand(subArgs);
    break;
  }
  case 'llm': {
    const llmCommand = require('../lib/commands/llm');
    llmCommand(subArgs);
    break;
  }
  case 'telemetry': {
    const telemetryCommand = require('../lib/commands/telemetry');
    telemetryCommand(subArgs);
    break;
  }
  case 'analytics': {
    const analyticsCommand = require('../lib/commands/analytics');
    analyticsCommand();
    break;
  }
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (!command) {
      showHelp();
    } else {
      log(`\n❌ Unknown command: ${command}`, 'red');
      log('   Run "yuva help" for usage.\n', 'reset');
      process.exit(1);
    }
}
