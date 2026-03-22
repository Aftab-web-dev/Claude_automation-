# Agent Configurations

This directory contains configuration files for custom agents.

Each agent config is a JSON file with the following structure:

```json
{
  "name": "agent-name",
  "version": "1.0.0",
  "type": "custom",
  "category": "dev|life|custom",
  "triggers": ["keyword1", "keyword2"],
  "description": "What this agent does",
  "file": "agentnameagent.md",
  "dependencies": [],
  "created": "2024-01-01T00:00:00.000Z"
}
```

## Creating Custom Agents

Use the CLI to create agents:

```bash
npx yuva add create my-agent
```

This creates both the prompt file and the config file automatically.
