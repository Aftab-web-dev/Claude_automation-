function validateAgentName(name) {
  if (!name) return { valid: false, error: 'Agent name is required' };
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    return { valid: false, error: 'Agent name must start with a letter and contain only lowercase letters, numbers, and hyphens' };
  }
  if (name.length > 50) return { valid: false, error: 'Agent name must be 50 characters or less' };
  return { valid: true };
}

function validateWorkflowName(name) {
  if (!name) return { valid: false, error: 'Workflow name is required' };
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    return { valid: false, error: 'Workflow name must start with a letter and contain only lowercase letters, numbers, and hyphens' };
  }
  return { valid: true };
}

function validateCommand(command, validCommands) {
  if (!command) return { valid: false, error: 'No command provided' };
  if (!validCommands.includes(command)) {
    return { valid: false, error: `Unknown command: ${command}. Valid commands: ${validCommands.join(', ')}` };
  }
  return { valid: true };
}

module.exports = { validateAgentName, validateWorkflowName, validateCommand };
