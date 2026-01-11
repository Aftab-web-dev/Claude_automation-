# Next Steps

## System Status
The automation system is **COMPLETE** and ready to use.

## How to Use

### Starting a New Project
1. Tell me what you want to build
2. The system will:
   - Activate Requirements Agent (if requirements unclear)
   - Activate Risk Assessment Agent (for new projects)
   - Activate Planner Agent (to create architecture)
   - Create `/docs/planning.md`

### Executing a Project
1. Say "start", "build", or "execute"
2. The system will:
   - Activate Execution Agent
   - Follow the plan step-by-step
   - Update session after each step
   - Run all checklists

### Other Operations
- **"test"** → Activates Tester Agent
- **"review"** → Activates Reviewer Agent
- **"security"** → Activates Security Agent
- **"debug"** → Activates Debugger Agent
- **"refactor"** → Activates Refactor Agent

## Files to Know

### Agent Prompts
Located in `.aiautomations/prompts/`:
- `mainsystem.md` - Main orchestrator
- `requirementsagent.md` - Requirements gathering
- `planningpropmt.md` - Architecture planning
- `riskassessmentagent.md` - Risk assessment
- `execution.md` - Code execution
- `continuityagent.md` - Session understanding
- `testeragent.md` - Testing
- `revieweragent.md` - Code review
- `securityagent.md` - Security audit
- `debuggeragent.md` - Bug fixing
- `refactoragent.md` - Code improvement
- `statemangeragent.md` - Session management

### Standards
Located in `.aiautomations/standards/`:
- `codestandards.md` - Coding conventions
- `techstack.md` - Technology guidelines
- `apidesign.md` - API design rules
- `databasedesign.md` - Database design rules
- `validation.md` - Validation rules

### Checklists
Located in `.aiautomations/checklists/`:
- `beforecode.md` - Before coding checklist
- `aftercode.md` - After coding checklist
- `prchecklist.md` - PR/feature complete checklist

### Templates
Located in `.aiautomations/templates/`:
- `planning-web.md` - Web app template
- `planning-api.md` - API template
- `planning-cli.md` - CLI tool template
- `architecturedecisions.md` - ADR template

## Ready for Your First Project!

Tell me what you want to build and we'll get started.
