# Yuva AI - Development Agent System

A lightweight multi-agent framework for software development with on-demand prompts.

---

## Overview

This system provides **12 specialized development agents** that are served on demand from the installed package:

- **Complete SDLC coverage** from requirements to deployment
- **On-demand agents** — prompts loaded via `yuva agent show <name>`
- **Hybrid orchestrator** — CLI scans project, AI picks the right agents
- **Session persistence** — never lose progress across conversations
- **Quality gates** — built-in standards and checklists

---

## How It Works

1. AI reads `AGENTS.md` to understand the agent system
2. AI runs `yuva agent orchestrate` to scan the project
3. AI picks the right agents based on your request
4. AI runs `yuva agent show <name>` to get each agent's instructions
5. Agents execute in sequence, updating session files

---

## Available Agents

| Agent | Command | Purpose |
|-------|---------|---------|
| Existing Code | `yuva agent show existingcode` | Analyze existing codebase |
| Requirements | `yuva agent show requirements` | Gather requirements |
| Risk Assessment | `yuva agent show riskassessment` | Identify risks |
| Planner | `yuva agent show planning` | Design architecture |
| Execution | `yuva agent show execution` | Implement code |
| Continuity | `yuva agent show continuity` | Resume from session |
| Tester | `yuva agent show tester` | Write and run tests |
| Reviewer | `yuva agent show reviewer` | Code quality review |
| Security | `yuva agent show security` | Security audit |
| Debugger | `yuva agent show debugger` | Bug investigation |
| Refactor | `yuva agent show refactor` | Code improvement |
| State Manager | `yuva agent show statemanager` | Update session files |

---

## Quick Commands

```bash
yuva agent show <name>     # Get agent prompt
yuva agent list            # List all agents
yuva agent orchestrate     # Scan project context
yuva doctor                # Check setup health
yuva init <tool>           # Switch AI tool
```

---

## Customization

Add custom agents in `.aiautomations/prompts/` — local files always override package agents.

See [QUICKSTART.md](QUICKSTART.md) for detailed usage examples.
