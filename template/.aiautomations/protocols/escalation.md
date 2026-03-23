# Escalation Protocol

Guidelines for handling situations requiring escalation or user intervention during development tasks.

---

## Purpose

This protocol defines when and how to escalate beyond normal agent flow to ensure the user is informed and can make decisions about their project.

---

## Escalation Levels

### Level 1: Continue Automatically
- Standard pipeline step
- No risks or blockers
- Agent can fully handle
- **Action**: Proceed and update session

### Level 2: Inform User
- Notable finding worth mentioning
- Non-blocking issue
- User should be aware
- **Action**: Complete work, include note in summary

### Level 3: Ask User Permission
- Security vulnerability found
- Significant code change required
- Decision affects project architecture
- **Action**: Stop, present finding, ask user to approve before proceeding

### Level 4: Block Until Resolved
- Critical blocker preventing progress
- Conflicting requirements
- Missing information that cannot be inferred
- **Action**: Present the blocker clearly, wait for user input

---

## Domain-Specific Escalation

### Security Issues

**Level 2 (Inform):**
- Low-severity findings
- Best practice recommendations
- Minor code quality issues

**Level 3 (Ask Permission):**
- Medium or high severity vulnerabilities
- Any security fix that modifies existing logic
- Changes to authentication or authorization

**Level 4 (Block):**
- Critical vulnerability in production-bound code
- Security configuration that requires user decision

**Security Escalation Format:**
```
Security Agent found: [issue description]
Severity: [LOW / MEDIUM / HIGH / CRITICAL]
Location: [file and line]
Risk: [what could happen]
Proposed fix: [what will be changed]

Proceed with fix? [Yes / No / Show me more details]
```

---

### Architecture Decisions

**Level 3 (Ask Permission):**
- Changing folder structure
- Adding new dependencies
- Modifying database schema
- Changing API contracts

**Escalation Format:**
```
Architecture decision needed:
Current: [current state]
Proposed: [proposed change]
Reason: [why this is needed]
Impact: [what will be affected]

Approve this change? [Yes / No / Discuss]
```

---

### Missing Requirements

**Level 4 (Block):**
- Cannot determine intended behavior
- Conflicting requirements in planning docs
- Business logic unclear

**Escalation Format:**
```
Blocked: Cannot proceed without clarification.
Question: [specific question]
Context: [why this matters]
Options: [possible interpretations]

Which approach should I take?
```

---

### Breaking Changes

**Level 3 (Ask Permission):**
- Change will break existing functionality
- Migration required
- API contract change

**Escalation Format:**
```
Warning: This change will affect existing functionality.
What will change: [description]
Files affected: [list]
Migration needed: [yes/no, and what]

Proceed? [Yes / No]
```

---

## Escalation Response Rules

### Do's
- Be specific about what was found
- Provide actionable options
- Show the exact location of the issue
- Explain the impact clearly

### Don'ts
- Don't proceed with Level 3+ issues without user approval
- Don't make security fixes silently
- Don't make architecture decisions unilaterally
- Don't block on minor issues that have obvious solutions

---

## Post-Escalation

After user responds to an escalation:

1. **If approved**: Proceed with proposed action, update session log with decision
2. **If declined**: Log as accepted risk or skipped item, continue pipeline
3. **If needs discussion**: Provide more detail, present alternatives

---

## Escalation Triggers

### Immediate Block (Level 4)
- Requirements not found and cannot be inferred
- Conflicting information in session files
- Critical dependency missing

### Ask Permission (Level 3)
- Security vulnerability (MEDIUM or higher)
- Destructive or irreversible change
- Major refactor affecting many files

### Inform (Level 2)
- Low-severity security finding
- Deprecated dependency found
- Performance concern noted

---

## Agent Responsibilities

All development agents must:

1. **Monitor** for escalation triggers during their work
2. **Prioritize** user safety over task speed
3. **Interrupt** normal flow for Level 3+ situations
4. **Log** all escalations in `.session/log.md`
5. **Resume** normal pipeline only after escalation is resolved
