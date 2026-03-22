# Claude AI Automation System

A powerful multi-agent AI framework for **software development** AND **life/personal assistance** with multi-LLM support, plugin system, workflow composer, and analytics.

[![npm version](https://img.shields.io/npm/v/claude-ai-automation.svg)](https://www.npmjs.com/package/claude-ai-automation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-vitest-green.svg)](https://vitest.dev/)

## What is this?

A **universal AI assistant framework** that turns your AI into a comprehensive multi-agent system:

- **34+ Specialized Agents** — 11 for development + 23 for life/personal assistance
- **Multi-LLM Support** — Works with Claude, GPT, Gemini, and GitHub Copilot
- **Plugin System** — Create, install, and manage custom agents
- **Workflow Composer** — Define multi-agent pipelines with YAML
- **Analytics Dashboard** — Track agent usage and productivity (opt-in, local only)
- **Session Persistence** — Never lose progress, even across conversations
- **Quality Gates** — Built-in checklists, standards, and security reviews
- **Safety Protocols** — Crisis escalation, mandatory disclaimers for sensitive topics
- **Zero Dependencies** — Pure Node.js, installs in seconds

## Quick Start

```bash
# Install and initialize
npx claude-ai-automation init

# Or use the short alias
npx yuva init
```

That's it. Open your project in Claude Code, Cursor, or VS Code and start working.

## CLI Commands

```bash
# Setup
yuva init                  # Initialize in current directory
yuva init --force          # Overwrite existing files
yuva init --dry-run        # Preview what would be created
yuva upgrade               # Update agents and system files
yuva doctor                # Diagnose setup issues

# Agents
yuva list                  # List all installed agents
yuva list dev              # List development agents only
yuva list life             # List life/personal agents only
yuva add create <name>     # Create a custom agent
yuva add remove <name>     # Remove an agent

# Workflows
yuva workflow list         # List all workflows
yuva workflow create <n>   # Create a new workflow
yuva workflow show <n>     # Show workflow details
yuva workflow delete <n>   # Delete a workflow

# Configuration
yuva config                # Show current config
yuva config set <k> <v>    # Set a config value
yuva config get <key>      # Get a config value
yuva config reset          # Reset to defaults

# Multi-LLM
yuva llm list              # List supported LLMs
yuva llm use <name>        # Switch LLM platform
yuva llm detect            # Detect current LLM
yuva llm generate          # Generate configs for all LLMs

# Analytics
yuva status                # Show project status
yuva telemetry on/off      # Enable/disable analytics
yuva telemetry stats       # View usage statistics
yuva analytics             # View analytics dashboard

# General
yuva help                  # Show full help
yuva --version             # Show version
```

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE.md (Controller)                    │
│  - Reads session state & user memory                        │
│  - Detects task type (Development vs Life)                  │
│  - Routes to appropriate agent                              │
│  - Enforces quality gates & safety protocols                │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   DEVELOPMENT AGENTS     │    │      LIFE AGENTS         │
├──────────────────────────┤    ├──────────────────────────┤
│ Requirements │ Planner   │    │ Interview │ Finance     │
│ Execution    │ Tester    │    │ Doctor    │ Lawyer      │
│ Reviewer     │ Security  │    │ Career    │ Business    │
│ Debugger     │ Refactor  │    │ Teaching  │ Research    │
│ Continuity   │ Risk      │    │ Wellness  │ Stress      │
│ State Manager│           │    │ Travel    │ Writer      │
│              │           │    │ Fitness   │ Productivity│
│              │           │    │ + 10 more               │
└──────────────────────────┘    └──────────────────────────┘
              │                               │
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│  Standards & Checklists  │    │  Safety & Disclaimers    │
│  Quality Gates           │    │  Crisis Escalation       │
│  Workflow Pipelines      │    │  Professional Referrals  │
└──────────────────────────┘    └──────────────────────────┘
```

## Available Agents

### Development Agents (11)

| Agent | Trigger | Purpose |
|-------|---------|---------|
| **Requirements** | Unclear requirements | Gathers and clarifies what to build |
| **Risk Assessment** | New projects | Identifies risks before development |
| **Planner** | "Plan", new project | Creates architecture and detailed plans |
| **Execution** | "Build", "Start" | Implements code step-by-step |
| **Continuity** | Returning to project | Reconstructs context from session |
| **Tester** | "Test", "QA" | Creates and runs tests |
| **Reviewer** | "Review", "Audit" | Code quality analysis |
| **Security** | "Security" | Security audit |
| **Debugger** | "Debug", "Fix bug" | Bug investigation and fixing |
| **Refactor** | "Refactor", "Clean up" | Code improvement |
| **State Manager** | After any task | Updates session files |

### Life Agents (23)

| Agent | Trigger | Purpose |
|-------|---------|---------|
| **Interview** | "Interview", "job prep" | Mock interviews, answer coaching |
| **Finance** | "Invest", "budget" | Financial education, investments |
| **Doctor** | "Health", "symptom" | Medical education (not diagnosis) |
| **Lawyer** | "Legal", "law" | Legal awareness, rights education |
| **Career** | "Career", "job search" | Professional development |
| **Business** | "Startup", "business" | Entrepreneurship, idea validation |
| **Teaching** | "Teach", "learn" | Education, concept explanation |
| **Research** | "Research", "explain" | Deep research and analysis |
| **Wellness** | "Anxious", "overwhelmed" | Mental wellness, emotional support |
| **Stress** | "Stressed", "burnout" | Stress management, coping |
| **Travel** | "Trip", "travel" | Trip planning, itineraries |
| **Writer** | "Write", "content" | Content creation, copywriting |
| **Fitness** | "Workout", "gym" | Exercise guidance, workout plans |
| **Productivity** | "Organize", "focus" | Time management, habits |
| **Analyst** | "Analyze", "data" | Data analysis, insights |
| **Relationships** | "Love", "dating" | Relationship guidance |
| **Sexual Health** | "Sexual health" | Science-based health education |
| **Resume** | "Resume", "LinkedIn" | Resume writing, personal branding |
| **Negotiation** | "Negotiate", "salary" | Negotiation coaching |
| **Parenting** | "Parenting", "child" | Evidence-based parenting |
| **Social Media** | "Instagram", "TikTok" | Content strategy and growth |
| **Study** | "Study", "exam prep" | Study techniques, exam preparation |
| **Email** | "Email", "message" | Professional communication |

## Multi-LLM Support

Works with **18+ AI platforms** — commercial, open-source, and terminal-based:

### Commercial
| LLM | Config File | Status |
|-----|------------|--------|
| **Claude** | `CLAUDE.md` | Full support |
| **GPT / Codex** | `AGENTS.md` | Full support |
| **Gemini** | `GEMINI.md` | Full support |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Full support |
| **Cursor** | `.cursor/rules/yuva.mdc` | Full support |
| **Windsurf** | `.windsurfrules` | Full support |
| **Cody** | `.sourcegraph/instructions.md` | Full support |
| **Amazon Q** | `.amazonq/instructions.md` | Full support |

### Open Source / Local
| LLM | Config File | Status |
|-----|------------|--------|
| **Ollama** (Llama, Mistral, DeepSeek, Qwen) | `OLLAMA_INSTRUCTIONS.md` | Full support |
| **LM Studio** | `OLLAMA_INSTRUCTIONS.md` | Full support |
| **Jan.ai** | `OLLAMA_INSTRUCTIONS.md` | Full support |
| **Continue.dev** | `.continue/instructions.md` | Full support |
| **Open Interpreter** | `CLAUDE.md` | Full support |
| **LLM CLI** | `CLAUDE.md` | Full support |
| **Tabby** | `CLAUDE.md` | Full support |

### Terminal / CLI
| LLM | Config File | Status |
|-----|------------|--------|
| **OpenCode** | `AGENTS.md` | Full support |
| **Kilo Code** | `.kilo/instructions.md` | Full support |
| **Aider** | `.aider.conf.yml` | Full support |

```bash
# List all supported LLMs
yuva llm list

# List by category
yuva llm list open-source

# Switch LLM platform
yuva llm use ollama

# Generate configs for all platforms
yuva llm generate

# See suggested models for a platform
yuva llm models ollama
```

## Plugin System

### Create Custom Agents

```bash
# Create a new agent
yuva add create my-agent

# This creates:
# .aiautomations/prompts/my-agentagent.md (prompt template)
# .aiautomations/agents/my-agent.json (agent config)

# Remove an agent
yuva add remove my-agent
```

### Agent Configuration

Each agent can have a config file in `.aiautomations/agents/`:

```json
{
  "name": "my-agent",
  "version": "1.0.0",
  "type": "custom",
  "category": "custom",
  "triggers": ["keyword1", "keyword2"],
  "description": "What this agent does",
  "file": "my-agentagent.md",
  "dependencies": []
}
```

## Workflow Composer

Define multi-agent pipelines with YAML:

```yaml
# .aiautomations/workflows/blog-post.yml
name: blog-post
description: Research and write a blog post

steps:
  - agent: research
    task: "Research the topic thoroughly"
    output: research_notes

  - agent: writer
    task: "Write article based on research"
    input: research_notes
    output: draft

  - agent: reviewer
    task: "Review for quality and accuracy"
    input: draft
    output: final
```

### Built-in Workflows

| Workflow | Agents | Purpose |
|----------|--------|---------|
| `research-and-write` | Research → Writer → Reviewer | Content creation pipeline |
| `career-prep` | Career → Resume → Interview → Negotiation | Job preparation |
| `full-dev-cycle` | Requirements → Risk → Plan → Execute → Test → Review → Security | Complete dev cycle |

```bash
# Manage workflows
yuva workflow list
yuva workflow create my-pipeline
yuva workflow show my-pipeline
```

## Analytics Dashboard

Track your usage patterns locally (opt-in):

```bash
# Enable analytics
yuva telemetry on

# View statistics
yuva telemetry stats

# View full dashboard with charts
yuva analytics

# All data stays local - nothing sent externally
```

## Project Structure

```
your-project/
├── CLAUDE.md                    # Main controller
├── .aiautomations/
│   ├── config.json              # Project configuration
│   ├── prompts/                 # 34+ agent prompts
│   ├── protocols/               # System protocols
│   ├── standards/               # Code & design standards
│   ├── checklists/              # Quality checklists
│   ├── templates/               # Planning templates
│   ├── workflows/               # Multi-agent pipelines
│   └── agents/                  # Custom agent configs
├── .session/                    # Session persistence
│   ├── state.md
│   ├── log.md
│   └── next.md
└── .memory/                     # User memory
    ├── user.md
    └── context.md
```

## Quality Gates

### For Development
- [ ] Lint passes (no errors)
- [ ] Type check passes
- [ ] Tests pass (all green)
- [ ] Build succeeds
- [ ] Security reviewed
- [ ] Checklists completed
- [ ] Session updated

### For Life Agents
- [ ] Question fully addressed
- [ ] Appropriate disclaimers included
- [ ] Professional referral when needed
- [ ] Crisis resources for emergencies

## Safety Features

| Topic | Safety Measures |
|-------|-----------------|
| **Health** | Medical disclaimer, never diagnoses |
| **Finance** | "Not financial advice" disclaimer |
| **Legal** | "Consult a lawyer" reminder |
| **Mental Health** | Crisis hotlines provided |
| **Relationships** | Consent emphasis |

### Crisis Escalation
Agents automatically provide crisis resources:
- Suicidal thoughts → 988, Crisis Text Line
- Domestic violence → National DV Hotline
- Sexual assault → RAINN
- Severe symptoms → "Seek immediate help"

## Development

```bash
# Install dev dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Check project health
npm run doctor
```

## Works With

**Commercial:** Claude Code, Cursor, Windsurf, GitHub Copilot, Gemini CLI, Amazon Q, Cody
**Open Source:** Ollama, LM Studio, Jan.ai, Continue.dev, Open Interpreter, LLM CLI, Tabby
**Terminal:** OpenCode, Codex CLI, Kilo Code, Aider
**Models:** Llama 3, Mistral, CodeLlama, DeepSeek Coder, Qwen, Phi-3, Gemma, StarCoder, GPT-4, Claude, Gemini

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding Agents

1. Create prompt in `.aiautomations/prompts/`
2. Create config in `.aiautomations/agents/`
3. Add to routing table in `CLAUDE.md`
4. Add tests
5. Submit PR

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [NPM Package](https://www.npmjs.com/package/claude-ai-automation)
- [GitHub Repository](https://github.com/Aftab-web-dev/claude-ai-automation)
- [Landing Page](https://aftab-web-dev.github.io/claude-ai-automation/)
- [Report Issues](https://github.com/Aftab-web-dev/claude-ai-automation/issues)
