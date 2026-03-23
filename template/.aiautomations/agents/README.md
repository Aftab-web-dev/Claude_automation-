# Agent Configurations

This directory contains configuration files for custom agents.

Each agent config is a JSON file with the following structure:

```json
{
  "name": "agent-name",
  "version": "1.0.0",
  "type": "custom",
  "category": "dev|custom",
  "triggers": ["keyword1", "keyword2"],
  "description": "What this agent does",
  "file": "agentnameagent.md",
  "dependencies": [],
  "created": "2024-01-01T00:00:00.000Z"
}
```

## Built-in Development Agents

The system includes 12 built-in development agents:

| Agent | File | Purpose |
|-------|------|---------|
| Existing Code | `existingcodeagent.md` | Analyze existing codebases |
| Requirements | `requirementsagent.md` | Gather and clarify requirements |
| Risk Assessment | `riskassessmentagent.md` | Identify risks before development |
| Planner | `planningprompt.md` | Design architecture and create plans |
| Execution | `execution.md` | Implement code step-by-step |
| Continuity | `continuityagent.md` | Understand and resume project state |
| Tester | `testeragent.md` | QA and testing |
| Security | `securityagent.md` | Security vulnerability review |
| Debugger | `debuggeragent.md` | Bug investigation and fixing |
| Refactor | `refactoragent.md` | Code improvement |
| Reviewer | `revieweragent.md` | Code quality audits |
| State Manager | `statemanageragent.md` | Maintain session files |

## Creating Custom Agents

Use the CLI to create agents:

```bash
npx yuva add create my-agent
```

This creates both the prompt file and the config file automatically.
