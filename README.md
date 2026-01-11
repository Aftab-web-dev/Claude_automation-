# Claude AI Automation System

A powerful multi-agent automation system for AI-assisted software development with Claude.

[![npm version](https://img.shields.io/npm/v/claude-ai-automation.svg)](https://www.npmjs.com/package/claude-ai-automation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is this?

This is an automation framework that turns Claude into a **structured software development system** with:

- **11 Specialized Agents** - Each handles a specific task (planning, coding, testing, security, etc.)
- **Automatic Agent Selection** - Claude decides which agent to activate based on your request
- **Session Persistence** - Never lose progress, even across conversations
- **Quality Gates** - Built-in checklists ensure high-quality, secure code
- **Standards Enforcement** - Consistent coding standards, API design, database design

## Quick Start

### Option 1: NPX (Recommended)

```bash
cd your-project
npx claude-ai-automation init
```

### Option 2: GitHub Template

Click **"Use this template"** button on GitHub to create a new repository.

### Option 3: Manual Clone

```bash
git clone https://github.com/YOUR_USERNAME/claude-ai-automation.git
cp -r claude-ai-automation/template/* your-project/
```

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE.md (Controller)                    │
│  - Reads session state                                       │
│  - Decides which agent to activate                           │
│  - Enforces quality gates                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Agent Selection                         │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│ Requirements│   Planner   │  Execution  │    Continuity     │
│    Agent    │    Agent    │    Agent    │      Agent        │
├─────────────┼─────────────┼─────────────┼───────────────────┤
│   Tester    │  Reviewer   │  Security   │     Debugger      │
│    Agent    │    Agent    │    Agent    │      Agent        │
├─────────────┼─────────────┼─────────────┼───────────────────┤
│  Refactor   │    Risk     │    State    │                   │
│    Agent    │  Assessment │   Manager   │                   │
└─────────────┴─────────────┴─────────────┴───────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Standards & Checklists                    │
│  - Code Standards    - API Design      - Before Code        │
│  - Tech Stack        - DB Design       - After Code         │
│  - Validation        - Security        - PR Checklist       │
└─────────────────────────────────────────────────────────────┘
```

## Available Agents

| Agent | Trigger | Purpose |
|-------|---------|---------|
| **Requirements** | Unclear requirements | Gathers and clarifies what to build |
| **Risk Assessment** | New projects | Identifies risks before development |
| **Planner** | "Plan", new project | Creates architecture and detailed plans |
| **Execution** | "Build", "Start", "Execute" | Implements code step-by-step |
| **Continuity** | Returning to project | Reconstructs context from session |
| **Tester** | "Test", "QA" | Creates and runs tests |
| **Reviewer** | "Review", "Audit" | Code quality analysis |
| **Security** | "Security", "Vulnerabilities" | Security audit |
| **Debugger** | "Debug", "Fix bug", "Error" | Bug investigation and fixing |
| **Refactor** | "Refactor", "Clean up" | Code improvement |
| **State Manager** | After any task | Updates session files |

## Usage Examples

### Start a New Project
```
You: "I want to build a task management API"

Claude:
1. Activates Requirements Agent (clarifies what you need)
2. Activates Risk Assessment Agent (identifies risks)
3. Activates Planner Agent (creates architecture)
4. Creates /docs/planning.md
5. Asks: "Ready to start building?"
```

### Continue Working
```
You: "Continue"

Claude:
1. Reads .session/state.md
2. Activates Continuity Agent (summarizes progress)
3. Activates Execution Agent
4. Continues from exact last point
```

### Debug an Issue
```
You: "The login is not working"

Claude:
1. Activates Debugger Agent
2. Investigates the issue
3. Finds root cause
4. Proposes and implements fix
5. Updates session
```

## Project Structure

After initialization, your project will have:

```
your-project/
├── CLAUDE.md                    # Main controller (Claude reads this)
├── .aiautomations/
│   ├── prompts/                 # Agent prompts
│   │   ├── mainsystem.md
│   │   ├── requirementsagent.md
│   │   ├── planningpropmt.md
│   │   ├── riskassessmentagent.md
│   │   ├── execution.md
│   │   ├── continuityagent.md
│   │   ├── testeragent.md
│   │   ├── revieweragent.md
│   │   ├── securityagent.md
│   │   ├── debuggeragent.md
│   │   ├── refactoragent.md
│   │   └── statemangeragent.md
│   ├── standards/               # Coding standards
│   │   ├── codestandards.md
│   │   ├── techstack.md
│   │   ├── apidesign.md
│   │   ├── databasedesign.md
│   │   └── validation.md
│   ├── checklists/              # Quality checklists
│   │   ├── beforecode.md
│   │   ├── aftercode.md
│   │   └── prchecklist.md
│   └── templates/               # Planning templates
│       ├── planning-web.md
│       ├── planning-api.md
│       ├── planning-cli.md
│       └── architecturedecisions.md
└── .session/                    # Session persistence
    ├── state.md                 # Current state
    ├── log.md                   # Action history
    └── next.md                  # Next steps
```

## Quality Gates

Code is not considered complete until:

- [ ] Lint passes (no errors)
- [ ] Type check passes (no errors)
- [ ] Tests pass (all green)
- [ ] Build succeeds
- [ ] Security reviewed
- [ ] Checklists completed
- [ ] Session updated

## Customization

### Add Your Own Agent

1. Create a new file in `.aiautomations/prompts/youragent.md`
2. Follow the existing agent format
3. Add it to the agent list in `CLAUDE.md`
4. Add trigger words in the decision tree

### Modify Standards

Edit files in `.aiautomations/standards/` to match your team's preferences:
- `codestandards.md` - Naming conventions, formatting
- `techstack.md` - Preferred technologies
- `apidesign.md` - API design rules
- `databasedesign.md` - Database conventions

### Customize Checklists

Edit files in `.aiautomations/checklists/` to add your own verification steps.

## Works With

- **Claude Code** (CLI)
- **Cursor** (with Claude)
- **VS Code** (with Claude extension)
- **Any IDE** where Claude can read project files

## Commands

| Command | Description |
|---------|-------------|
| `npx claude-ai-automation init` | Initialize in current directory |
| `npx claude-ai-automation init --force` | Overwrite existing files |
| `npx caia init` | Short alias |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.
