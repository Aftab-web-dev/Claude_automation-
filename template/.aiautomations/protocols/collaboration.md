# Inter-Agent Collaboration Protocol

This document defines how development agents work together on complex tasks.

---

## When Collaboration is Needed

### Single-Agent Tasks (No Collaboration)
- Task clearly fits one agent's domain
- No overlap with other specializations
- User request is focused and specific

### Multi-Agent Tasks (Collaboration Required)
- Task spans multiple stages of the development pipeline
- One agent needs another's expertise to complete
- Post-code pipeline agents are always multi-agent by design

---

## Collaboration Types

### 1. Sequential Handoff
One agent completes their part, then hands off to another.

**Pattern:**
```
Agent A (completes task) → Summary → Agent B (continues)
```

**Examples:**
| First Agent | Handoff To | Scenario |
|-------------|------------|----------|
| Requirements | Risk Assessment | Requirements complete → risk analysis |
| Risk Assessment | Planner | Risk assessed → architecture planning |
| Planner | Execution | Plan approved → implementation |
| Execution | Tester | Code written → testing |
| Tester | Debugger | Tests fail → bug fixing |
| Security | Refactor | Scan complete → code improvement |

**Handoff Protocol:**
1. Agent A announces: "Task complete. Handing off to [Agent B] for [reason]"
2. Agent A provides structured summary:
   ```
   ## Handoff Summary
   **Completed:** [what was done]
   **Key Findings:** [relevant information for next agent]
   **User Goal:** [what user ultimately wants]
   **Next Step:** [what Agent B should do]
   ```
3. Agent B acknowledges: "Received handoff. Continuing with [task]"
4. Agent B uses the summary as context

---

### 2. Parallel Consultation
One agent is primary, but consults another for specific expertise.

**Pattern:**
```
Agent A (primary) ←→ Agent B (consults) → Combined response
```

**Examples:**
| Primary Agent | Consults | Scenario |
|---------------|----------|----------|
| Execution | Security | Implementation with security considerations |
| Planner | Execution | Architecture with implementation feasibility check |
| Reviewer | Security | Final review with security verification |

**Consultation Protocol:**
1. Primary agent identifies need: "Consulting [Agent] for [specific question]"
2. Frame specific question for consulted agent
3. Integrate response into primary agent's output
4. Primary agent remains responsible for final response

---

### 3. Collaborative Task
Both agents contribute equally to the output.

**Pattern:**
```
Agent A + Agent B → Joint output
```

**Examples:**
- Tester + Security: Verify fixes from both angles after Debugger resolves issues
- Refactor + Reviewer: Ensure refactored code meets all quality standards

**Joint Protocol:**
1. Determine which agent leads
2. Define scope for each agent
3. Integrate outputs cohesively
4. Present as unified response

---

## Handoff Triggers by Agent

### Development Agents (Automatic Pipeline)

**These handoffs happen AUTOMATICALLY. The State Manager updates session after each one.**

| From Agent | To Agent | Trigger | Context Passed (via context.md) |
|------------|----------|---------|-------------------------------|
| Existing Code | Any Dev Agent | Code exists in project | Codebase Context section |
| Requirements | Risk Assessment | Requirements complete | User Requirements Summary |
| Risk Assessment | Planner | Risk assessed | Risk findings |
| Planner | Execution | Plan approved | Architecture + plan |
| Execution | Tester | Code written | Code Written section |
| Tester | Debugger | Tests fail | Test Results section |
| Debugger | Tester | Bug fixed | Updated code + fix description |
| Tester | Security | Tests pass | Test Results section |
| Security | Debugger | Issues found (user approved fix) | Security Report section |
| Debugger | Security | Security fix applied | Updated code |
| Security | Refactor | Scan complete | Security Report section |
| Refactor | Tester | Code refactored | Refactor Changes section |
| Refactor | Security | Code refactored | Refactor Changes section |
| Tester + Security | Reviewer | Both pass after refactor | All sections |
| Reviewer | Any Agent | Changes needed | Review Verdict section |
| Reviewer | State Manager | APPROVED | Final state |

---

## Context Preservation Rules

### The Agent Context Bus (`.session/context.md`)

**This is the primary mechanism for passing context between agents.**

Every development agent MUST:
1. **READ** `.session/context.md` before starting any work
2. **WRITE** their section to `.session/context.md` after completing work
3. **NEVER** erase or overwrite other agents' sections

The context bus has these sections:
- **User Requirements Summary** — what the user asked for
- **User Decisions** — answers to the 6 mandatory questions
- **Codebase Context** — from Existing Code Agent
- **Code Written** — from Execution Agent
- **Test Results** — from Tester Agent
- **Security Report** — from Security Agent
- **Refactor Changes** — from Refactor Agent
- **Review Verdict** — from Reviewer Agent

### Why This Exists

Without the context bus, agents lose critical information:
- Security Agent doesn't know what code was written
- Debugger doesn't know what tests failed or what security found
- Refactor Agent doesn't know what security issues to address
- Reviewer doesn't know the full history of changes

The context bus ensures every agent has the full picture.

### Session Updates After Every Agent

The State Manager MUST run after EVERY agent — not just at the end. This means:
- `.session/state.md` is always current (even if conversation breaks)
- `.session/log.md` has every agent's action logged
- `.session/context.md` has every agent's output for the next agent

### When handing off or collaborating:

#### 1. User Context Must Transfer
- Original user request
- User's stated preferences
- User's situation/background
- Previous relevant interactions
- Answers to the 6 mandatory questions (if answered)

#### 2. Work Product Must Transfer (via Context Bus)
- Completed outputs (code, tests, reports)
- Key decisions made
- Important findings
- Unanswered questions
- All data from `.session/context.md`

#### 3. Goal Must Remain Clear
- What the user ultimately wants
- Success criteria
- Any constraints mentioned
- Current pipeline stage and what comes next

---

## Communication Format

### Announcing Collaboration
```
"This task involves [stage 1] and [stage 2].
I'll start with [Agent A] for [reason],
then [hand off to / consult] [Agent B] for [reason]."
```

### During Handoff
```
"[First part] is complete.
Now activating [Agent B] to [next step]."
```

### Consultation Result
```
"Based on [consulted domain] considerations: [insight]
Continuing with [primary task]..."
```

---

## Conflict Resolution

If agents have conflicting findings:

1. **Acknowledge the tension**
   - "There's a trade-off between X and Y here"

2. **Present both perspectives**
   - "[Agent A] found..."
   - "[Agent B] found..."

3. **Help user decide**
   - "Given your situation, [recommendation] because [reason]"
   - Or ask user for their priority

---

## Anti-Patterns (Avoid These)

1. **Agent Ping-Pong**: Excessive back-and-forth between agents
2. **Responsibility Diffusion**: No agent owns the final output
3. **Context Loss**: Important information dropped during handoff
4. **Scope Creep**: Adding agents that aren't needed
5. **Conflicting Findings**: Agents contradicting without resolution

---

## Quality Checklist for Collaboration

Before completing a multi-agent task:

- [ ] User's original goal addressed?
- [ ] All relevant agent perspectives included?
- [ ] Handoffs were smooth and clear?
- [ ] Context was preserved throughout?
- [ ] Final output is cohesive, not fragmented?
- [ ] User knows what happened and why?
