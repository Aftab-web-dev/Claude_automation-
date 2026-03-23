# Yuva AI

A lightweight development agent framework with **12 specialized agents**, **19 LLM platforms**, on-demand prompts, and auto-detection.

[![npm version](https://img.shields.io/npm/v/yuva-ai.svg)](https://www.npmjs.com/package/yuva-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-vitest-green.svg)](https://vitest.dev/)

## What is this?

A **development agent framework** that turns your AI coding tool into a multi-agent system:

- **12 Specialized Dev Agents** — Requirements, Planning, Execution, Testing, Security, Debugging, and more
- **On-Demand Prompts** — Agent prompts served from the package, not copied to your project
- **Auto-Detection** — Detects your AI tool (Claude, OpenCode, Cursor, Codex, etc.) and configures automatically
- **19 LLM Platforms** — Works with Claude, GPT, Gemini, Ollama, OpenCode, Cursor, and more
- **Lightweight Init** — Creates only 3 files instead of 67
- **Hybrid Orchestrator** — CLI scans your project, AI picks the right agents
- **Session Persistence** — Never lose progress across conversations
- **Zero Dependencies** — Pure Node.js, installs in seconds

## Quick Start

```bash
# Install globally
npm install -g yuva-ai

# Initialize in your project (auto-detects your AI tool)
yuva init

# Or specify your tool
yuva init opencode
yuva init cursor
yuva init codex
```

That's it. Open your project in your AI tool — it reads `AGENTS.md` and knows how to use agents.

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENTS.md (Orchestrator)                   │
│  AI reads this file and learns how to use the agent system   │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
         ┌──────────────────┐  ┌──────────────────┐
         │ yuva agent       │  │ yuva agent       │
         │ orchestrate      │  │ show <name>      │
         │                  │  │                  │
         │ Scans project:   │  │ Returns full     │
         │ - existing code? │  │ agent prompt     │
         │ - language?      │  │ from package     │
         │ - framework?     │  │ on demand        │
         │ - git status?    │  │                  │
         └──────────────────┘  └──────────────────┘
                    │                   │
                    ▼                   ▼
         ┌──────────────────────────────────────────┐
         │          DEVELOPMENT AGENTS (12)          │
         ├──────────────────────────────────────────┤
         │ Existing Code │ Requirements │ Planner   │
         │ Execution     │ Tester       │ Reviewer  │
         │ Security      │ Debugger     │ Refactor  │
         │ Continuity    │ Risk         │ State Mgr │
         └──────────────────────────────────────────┘
```

## CLI Commands

```bash
# Setup
yuva init                  # Auto-detect AI tool and initialize
yuva init opencode         # Initialize for specific tool
yuva init cursor --force   # Reinitialize for different tool
yuva upgrade               # Migrate from old format / update
yuva doctor                # Diagnose setup issues

# Agent Commands
yuva agent show <name>     # Get full agent prompt (on demand)
yuva agent list            # List all available agents
yuva agent orchestrate     # Scan project context (JSON output)

# List & Custom Agents
yuva list                  # List all installed agents
yuva add create <name>     # Create a custom agent
yuva add remove <name>     # Remove an agent

# Multi-LLM
yuva llm list              # List supported LLMs
yuva llm use <name>        # Switch LLM platform
yuva llm detect            # Detect current LLM
yuva llm generate          # Generate configs for all LLMs

# Configuration
yuva config                # Show current config
yuva config set <k> <v>    # Set a config value

# Analytics
yuva status                # Show project status
yuva help                  # Show full help
```

## Available Agents

| Agent | Command | Purpose |
|-------|---------|---------|
| **Existing Code** | `yuva agent show existingcode` | Analyze existing codebase before changes |
| **Requirements** | `yuva agent show requirements` | Gather and clarify what to build |
| **Risk Assessment** | `yuva agent show riskassessment` | Identify risks before development |
| **Planner** | `yuva agent show planning` | Create architecture and detailed plans |
| **Execution** | `yuva agent show execution` | Implement code step-by-step |
| **Continuity** | `yuva agent show continuity` | Resume from last session state |
| **Tester** | `yuva agent show tester` | Create and run tests |
| **Reviewer** | `yuva agent show reviewer` | Code quality analysis |
| **Security** | `yuva agent show security` | Security vulnerability audit |
| **Debugger** | `yuva agent show debugger` | Bug investigation and fixing |
| **Refactor** | `yuva agent show refactor` | Code improvement and cleanup |
| **State Manager** | `yuva agent show statemanager` | Update session files |

## Multi-LLM Support

Works with **19 AI platforms**. Auto-detected on `yuva init`:

### Commercial
| Platform | Config | Auto-Detect |
|----------|--------|-------------|
| **Claude** (Claude Code, VS Code) | `AGENTS.md` | Yes |
| **GPT / Codex CLI** | `AGENTS.md` | Yes |
| **Gemini** | `GEMINI.md` | Yes |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Yes |
| **Cursor** | `.cursor/rules/yuva.mdc` | Yes |
| **Windsurf** | `.windsurfrules` | Yes |
| **Cody** | `.sourcegraph/instructions.md` | Yes |
| **Amazon Q** | `.amazonq/instructions.md` | Yes |

### Open Source / Local
| Platform | Config | Auto-Detect |
|----------|--------|-------------|
| **Ollama** (Llama, Mistral, DeepSeek, Qwen) | `OLLAMA_INSTRUCTIONS.md` | Yes |
| **LM Studio** | `OLLAMA_INSTRUCTIONS.md` | - |
| **Jan.ai** | `OLLAMA_INSTRUCTIONS.md` | - |
| **Continue.dev** | `.continue/instructions.md` | Yes |
| **Open Interpreter** | `AGENTS.md` | - |
| **LLM CLI** | `AGENTS.md` | - |
| **Tabby** | `AGENTS.md` | - |

### Terminal / CLI
| Platform | Config | Auto-Detect |
|----------|--------|-------------|
| **OpenCode** | `AGENTS.md` | Yes |
| **Kilo Code** | `.kilo/instructions.md` | Yes |
| **Aider** | `.aider.conf.yml` | Yes |

```bash
# Switch platforms anytime
yuva llm use opencode
yuva llm use cursor
yuva llm use ollama
```

## Project Structure (After `yuva init`)

```
your-project/
├── AGENTS.md                       # Orchestrator (source of truth)
├── .aiautomations/
│   ├── config.json                 # Tool config + package path
│   └── agents.md                   # Agent index
└── .cursor/rules/yuva.mdc         # (only if Cursor detected)
```

Agent prompts are served on demand from the installed package — **no file bloat**.

## Custom Agents

```bash
# Create a custom agent
yuva add create my-agent

# This creates a local override in:
# .aiautomations/prompts/my-agentagent.md

# Local agents always take priority over package agents
```

## Upgrading from v3.2 (Old Format)

If you have the old setup with CLAUDE.md and 67+ copied files:

```bash
yuva upgrade
```

This will:
- Rename `CLAUDE.md` → `AGENTS.md`
- Create `.aiautomations/config.json`
- Create `.aiautomations/agents.md` index
- Remove copied prompts (now served from package)

## Development

```bash
npm install
npm test
npm run test:coverage
npm run lint
npm run doctor
```

## Works With

**Commercial:** Claude Code, Cursor, Windsurf, GitHub Copilot, Gemini CLI, Amazon Q, Cody
**Open Source:** Ollama, LM Studio, Jan.ai, Continue.dev, Open Interpreter, LLM CLI, Tabby
**Terminal:** OpenCode, Codex CLI, Kilo Code, Aider
**Models:** Llama 3, Mistral, CodeLlama, DeepSeek, Qwen, Phi-3, GPT-4, Claude, Gemini

## Contributing

1. Create agent prompt in `template/.aiautomations/prompts/`
2. Add to `AGENT_MAP` in `lib/commands/agent.js`
3. Add tests
4. Submit PR

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [NPM Package](https://www.npmjs.com/package/yuva-ai)
- [GitHub Repository](https://github.com/Aftab-web-dev/yuva-ai)
- [Report Issues](https://github.com/Aftab-web-dev/yuva-ai/issues)
