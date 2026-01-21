# Inter-Agent Collaboration Protocol

This document defines how agents work together on complex tasks that span multiple domains.

---

## When Collaboration is Needed

### Single-Agent Tasks (No Collaboration)
- Task clearly fits one agent's domain
- No overlap with other specializations
- User request is focused and specific

### Multi-Agent Tasks (Collaboration Required)
- Task spans multiple domains
- User request has multiple components
- One agent needs another's expertise to complete

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
| Research | Writer | "Research X and write an article" |
| Career | Interview | "Prepare for career change interview" |
| Business | Finance | "Evaluate idea + financial analysis" |
| Planner | Execution | Software planning → implementation |

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
| Business | Finance | Business idea with profit analysis |
| Career | Writer | Career advice + resume help |
| Teaching | Research | Teach topic with research depth |
| Wellness | Productivity | Stress about workload |

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
- Career + Interview: Complete job search preparation
- Research + Analyst: Deep research with data analysis
- Business + Research: Market research + business evaluation

**Joint Protocol:**
1. Determine which agent leads
2. Define scope for each agent
3. Integrate outputs cohesively
4. Present as unified response

---

## Handoff Triggers by Agent

### Development Agents

| From Agent | To Agent | Trigger |
|------------|----------|---------|
| Requirements | Planner | Requirements complete |
| Planner | Execution | Plan approved |
| Execution | Tester | Feature implemented |
| Tester | Debugger | Bugs found |
| Debugger | Execution | Bug fixed, continue work |
| Reviewer | Refactor | Quality issues found |
| Any Dev | Security | Security review needed |

### Life Agents

| From Agent | To Agent | Trigger |
|------------|----------|---------|
| Research | Writer | Research → content creation |
| Research | Teaching | Deep topic → need to teach |
| Research | Analyst | Research → data analysis |
| Business | Finance | Idea → financial evaluation |
| Business | Research | Idea → market research |
| Career | Interview | Job search → interview prep |
| Career | Writer | Career → resume/cover letter |
| Career | Wellness | Career stress → mental support |
| Teaching | Research | Topic needs deeper research |
| Finance | Business | Investment → business context |
| Wellness | Productivity | Stress → workload systems |
| Wellness | Doctor | Mental → physical symptoms |
| Interview | Career | Interview → broader career |
| Analyst | Research | Analysis → need more data |
| Analyst | Business | Analysis → business decisions |

---

## Context Preservation Rules

When handing off or collaborating:

### 1. User Context Must Transfer
- Original user request
- User's stated preferences
- User's situation/background
- Previous relevant interactions

### 2. Work Product Must Transfer
- Completed outputs
- Key decisions made
- Important findings
- Unanswered questions

### 3. Goal Must Remain Clear
- What the user ultimately wants
- Success criteria
- Any constraints mentioned

---

## Communication Format

### Announcing Collaboration
```
"This task involves [domain 1] and [domain 2].
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

If agents have conflicting advice:

1. **Acknowledge the tension**
   - "There's a trade-off between X and Y here"

2. **Present both perspectives**
   - "[Domain A] suggests..."
   - "[Domain B] suggests..."

3. **Help user decide**
   - "Given your situation, [recommendation] because [reason]"
   - Or ask user for their priority

---

## Anti-Patterns (Avoid These)

1. **Agent Ping-Pong**: Excessive back-and-forth between agents
2. **Responsibility Diffusion**: No agent owns the final output
3. **Context Loss**: Important information dropped during handoff
4. **Scope Creep**: Adding agents that aren't needed
5. **Conflicting Advice**: Agents contradicting without resolution

---

## Quality Checklist for Collaboration

Before completing a multi-agent task:

- [ ] User's original goal addressed?
- [ ] All relevant agent perspectives included?
- [ ] Handoffs were smooth and clear?
- [ ] Context was preserved throughout?
- [ ] Final output is cohesive, not fragmented?
- [ ] User knows what happened and why?
