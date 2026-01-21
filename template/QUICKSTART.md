# Quick Start Guide

Get started with the AI Universal Assistant System in 5 minutes.

---

## Step 1: Setup

Copy the `template/` folder to your project root:

```
your-project/
├── CLAUDE.md              # Auto-read by Claude
├── .aiautomations/        # Agent system
└── [your project files]
```

---

## Step 2: Start a Conversation

Simply start chatting. The system auto-routes to the right agent.

---

## Example Workflows

### Building Software

```
You: "I want to build a task management API"

System:
1. Activates Requirements Agent
2. Gathers your requirements
3. Activates Risk Assessment Agent
4. Activates Planner Agent
5. Creates planning document
6. Asks: "Ready to start building?"

You: "Yes"

System:
1. Activates Execution Agent
2. Implements step-by-step
3. Updates session files
4. Runs quality checks
```

### Learning Something

```
You: "Teach me how mutual funds work"

System:
1. Activates Teaching Agent
2. Explains concept with real-life examples
3. Provides exam weightage info
4. Gives practice questions
```

### Interview Preparation

```
You: "I have a software engineer interview next week"

System:
1. Activates Interview Agent
2. Asks about role and experience level
3. Conducts mock interview
4. Provides feedback on answers
5. Suggests improvements
```

### Research Task

```
You: "Research the latest trends in AI for healthcare"

System:
1. Activates Research Agent
2. Performs deep research
3. Provides structured analysis
4. Cites sources
5. Offers to hand off to Writer Agent if needed
```

### Stress Management

```
You: "I'm feeling overwhelmed with work deadlines"

System:
1. Activates Stress Agent
2. Validates your feelings
3. Provides immediate coping techniques
4. Offers long-term strategies
5. Suggests Productivity Agent handoff if needed
```

---

## Key Commands

| Say This | To Do This |
|----------|------------|
| "Continue" | Resume previous work |
| "Start building" | Begin implementation |
| "Test this" | Run testing agent |
| "Review the code" | Get code review |
| "Debug this" | Fix issues |
| "Teach me X" | Learn something |
| "Research X" | Deep research |
| "Help me write X" | Content creation |

---

## Session Files

For development projects, the system creates:

```
.session/
├── state.md    # Where you are now
├── log.md      # What was done
└── next.md     # What's next
```

**To resume work:**
```
You: "Continue"
System: Reads session files and picks up where you left off
```

---

## Tips for Best Results

### Be Specific
```
Bad:  "Help me with code"
Good: "Help me build a REST API for user authentication"
```

### Provide Context
```
Bad:  "I need investment advice"
Good: "I'm 25, earning 50k/year, want to start investing for retirement"
```

### Use Keywords
```
"teach" → Teaching Agent
"research" → Research Agent
"interview" → Interview Agent
"debug" → Debugger Agent
```

---

## Multi-Agent Tasks

Some tasks use multiple agents:

```
You: "Research blockchain and write a blog post about it"

System:
1. Activates Research Agent → Does research
2. Hands off to Writer Agent → Writes blog post
```

---

## Safety Notes

- **Health topics**: Agent provides education, not diagnosis
- **Legal topics**: Agent explains rights, not legal advice
- **Finance topics**: Agent educates, not financial advice

All sensitive domains include disclaimers and recommend professionals.

---

## Troubleshooting

### Agent Not Routing Correctly?
Use explicit keywords:
- "Activate Interview Agent"
- "I need the Finance Agent"

### Lost Progress?
```
You: "Show me the session state"
```

### Want to Start Fresh?
```
You: "RESET PROJECT"
```

---

## Next Steps

1. Try a development project
2. Explore life agents
3. Customize agents in `.aiautomations/prompts/`
4. Add your own standards in `.aiautomations/standards/`

Happy building!
