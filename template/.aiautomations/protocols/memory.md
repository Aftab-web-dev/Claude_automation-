# Universal Memory & Context System

This system maintains context across all agents (development and life) for a more personalized and continuous experience.

---

## Memory Architecture

```
.memory/
├── user.md           # User profile and preferences
├── context.md        # Current session context
├── history.md        # Important interaction history
└── decisions.md      # Key decisions made
```

---

## File Specifications

### 1. `.memory/user.md` - User Profile

```markdown
# User Profile

## Identity (Optional - Only if shared)
- Name: [if provided]
- Location: [country/region]
- Timezone: [if mentioned]
- Language Preference: [primary language]

## Professional Context
- Profession/Role: [current job/role]
- Industry: [sector]
- Experience Level: [student/early/mid/senior]
- Skills: [relevant skills mentioned]

## Preferences
### Communication
- Preferred detail level: [concise/detailed/thorough]
- Tone preference: [casual/professional/formal]
- Format preference: [bullets/paragraphs/structured]

### Technical (if applicable)
- Tech stack: [languages, frameworks]
- OS: [operating system]
- Editor/IDE: [tools used]

### Life Domains
- Financial: [risk tolerance, goals if shared]
- Health: [any relevant context shared]
- Learning style: [visual/reading/hands-on]

## Important Notes
- [Any user-stated important information]
- [Things to remember]
- [Things to avoid]

## Last Updated
[timestamp]
```

---

### 2. `.memory/context.md` - Session Context

```markdown
# Current Context

## Active Domain
[Development / Life - specify which]

## Current Task
**What:** [brief description]
**Started:** [when]
**Status:** [in-progress/paused/blocked]

## Recent Topics (Last 5)
1. [Topic] - [domain] - [date]
2. [Topic] - [domain] - [date]
3. [Topic] - [domain] - [date]
4. [Topic] - [domain] - [date]
5. [Topic] - [domain] - [date]

## Open Threads
- [Unfinished conversations or tasks]
- [Questions asked but not fully resolved]

## Current Agent
**Active:** [agent name]
**Since:** [when activated]

## Session Notes
- [Important context for this session]

## Last Updated
[timestamp]
```

---

### 3. `.memory/history.md` - Interaction History

```markdown
# Interaction History

## Development Projects
| Date | Project | Status | Notes |
|------|---------|--------|-------|
| [date] | [name] | [status] | [key notes] |

## Life Consultations

### Research Topics
| Date | Topic | Depth | Outcome |
|------|-------|-------|---------|
| [date] | [topic] | [quick/deep] | [key finding] |

### Career Interactions
| Date | Focus | Advice Given |
|------|-------|--------------|
| [date] | [topic] | [summary] |

### Finance Discussions
| Date | Topic | Key Points |
|------|-------|------------|
| [date] | [topic] | [summary] |

### Learning Sessions
| Date | Subject | Level | Progress |
|------|---------|-------|----------|
| [date] | [topic] | [beginner/etc] | [where left off] |

## Important Past Interactions
- [Significant interactions to remember]

## Last Updated
[timestamp]
```

---

### 4. `.memory/decisions.md` - Key Decisions

```markdown
# Key Decisions Log

## Development Decisions
| Date | Decision | Rationale | Impact |
|------|----------|-----------|--------|
| [date] | [what was decided] | [why] | [files/areas affected] |

## Life Domain Decisions

### Career
| Date | Decision | Context |
|------|----------|---------|
| [date] | [decision] | [situation] |

### Finance
| Date | Decision | Reasoning |
|------|----------|-----------|
| [date] | [decision] | [why] |

### Other
| Date | Domain | Decision |
|------|--------|----------|
| [date] | [area] | [decision] |

## Preferences Expressed
- [User stated preferences that should guide future interactions]

## Last Updated
[timestamp]
```

---

## Memory Update Rules

### When to Update User Profile
- User shares personal information
- User states a preference
- User corrects previous information
- User's situation changes

### When to Update Context
- New task starts
- Agent switches
- Topic changes
- Task completes or pauses

### When to Update History
- Meaningful interaction completes
- Project reaches milestone
- Learning session ends
- Important advice given

### When to Update Decisions
- User makes a decision
- Important choice is discussed
- User states a strong preference

---

## Memory Read Rules

### On Conversation Start
1. Read `user.md` for personalization
2. Read `context.md` for continuity
3. Check if previous task was incomplete

### On Agent Activation
1. Read relevant history section
2. Check for past interactions in same domain
3. Load relevant decisions

### On New Topic
1. Check if topic was discussed before
2. Load relevant context
3. Note any user preferences for this domain

---

## Privacy & Safety Rules

### What to Store
- Information explicitly shared by user
- Decisions made during sessions
- Preferences stated by user
- Project/task progress

### What NOT to Store
- Sensitive personal data (unless user requests)
- Medical details (only general context)
- Financial account details
- Passwords or credentials
- Private relationship details

### User Control
- User can request memory deletion
- User can correct stored information
- User can opt out of memory system

---

## Memory Quality Guidelines

### Keep It Useful
- Store actionable information
- Remove outdated entries
- Consolidate duplicate information

### Keep It Accurate
- Only store what user actually said
- Don't infer private information
- Update when information changes

### Keep It Minimal
- Don't store everything
- Focus on what improves future interactions
- Prune regularly

---

## Integration with Agents

Every agent should:

1. **On Start**: Check memory for relevant context
2. **During**: Note important information to remember
3. **On End**: Update memory with new learnings

### Agent-Specific Memory Notes

| Agent | What to Remember |
|-------|------------------|
| Career | Goals, industry, experience level |
| Finance | Risk tolerance, financial goals |
| Teaching | Learning style, current level, progress |
| Research | Topics researched, preferred depth |
| Business | Business interests, entrepreneurial stage |
| Doctor | General health context (not details) |
| Wellness | Stress patterns, what helps |
| Productivity | Work style, tools preferred |
| Interview | Target roles, preparation stage |
| Writer | Writing style preferences, past content |
| Travel | Travel preferences, past trips discussed |
| Legal | Jurisdiction, relevant legal contexts |
| Development | Tech stack, coding style, project history |
