# Quick Start Guide

Get started with Yuva AI in 2 minutes.

---

## Step 1: Initialize

```bash
yuva init
```

This creates 3 files:
```
your-project/
├── AGENTS.md                  # Orchestrator (AI reads this)
├── .aiautomations/
│   ├── config.json            # Tool config
│   └── agents.md              # Agent index
```

---

## Step 2: Start Working

Open your project in your AI tool and start chatting. The AI reads AGENTS.md and knows how to use agents.

---

## Example Workflow

### Building Software

```
You: "I want to build a task management API"

AI runs: yuva agent orchestrate
AI sees: hasExistingCode: false
AI runs: yuva agent show requirements

1. Requirements Agent gathers your requirements
2. Risk Assessment Agent identifies risks
3. Planner Agent creates architecture
4. Execution Agent implements step-by-step
5. Tester Agent writes tests
6. Session files updated automatically
```

### Working with Existing Code

```
You: "Add authentication to this project"

AI runs: yuva agent orchestrate
AI sees: hasExistingCode: true, languages: ["javascript"], frameworks: ["express"]
AI runs: yuva agent show existingcode

1. Existing Code Agent analyzes the codebase
2. Requirements Agent clarifies the feature
3. Planner Agent designs the implementation
4. Execution Agent implements it
```

### Fixing a Bug

```
You: "There's a login error on the dashboard"

AI runs: yuva agent show debugger
1. Debugger Agent investigates the issue
2. Implements the fix
3. Tester Agent verifies it
```

---

## Key Commands

| Say This | What Happens |
|----------|-------------|
| "Build X" | Requirements → Planning → Execution |
| "Continue" | Continuity agent resumes from session |
| "Fix this bug" | Debugger agent investigates |
| "Test this" | Tester agent writes tests |
| "Review the code" | Reviewer agent audits quality |
| "Check security" | Security agent scans for vulnerabilities |

---

## CLI Commands

```bash
yuva agent show <name>    # Get any agent's full prompt
yuva agent list           # See all available agents
yuva agent orchestrate    # Scan project context
yuva doctor               # Check setup health
yuva init <tool>          # Switch AI tool
```

---

## Session Files

The system creates session files to track progress:

```
.session/
├── state.md    # Current project state
├── log.md      # What was done
└── next.md     # What's next
```

To resume: just say "Continue" and the continuity agent picks up where you left off.

---

## Tips

### Be Specific
```
Bad:  "Help me with code"
Good: "Build a REST API for user authentication with JWT"
```

### Use Agent Names Directly
```
"Run the security agent on this code"
"Show me the debugger agent"
```

---

## Troubleshooting

### Setup Issues?
```bash
yuva doctor
```

### Want to Start Fresh?
```bash
yuva init --force
```

### Switch AI Tool?
```bash
yuva init cursor --force
yuva init opencode --force
```
