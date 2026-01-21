# Claude AI Automation System

A powerful multi-agent automation system for AI-assisted **software development** AND **life/personal assistance** with Claude.

[![npm version](https://img.shields.io/npm/v/claude-ai-automation.svg)](https://www.npmjs.com/package/claude-ai-automation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is this?

This is a **universal AI assistant framework** that turns Claude into a comprehensive multi-agent system with:

- **34 Specialized Agents** - 11 for development + 23 for life/personal assistance
- **Automatic Agent Selection** - Claude decides which agent to activate based on your request
- **Session Persistence** - Never lose progress, even across conversations
- **Quality Gates** - Built-in checklists ensure high-quality, secure code
- **Standards Enforcement** - Consistent coding standards, API design, database design
- **Life Assistance** - Expert guidance for health, finance, career, relationships, and more
- **Safety First** - Crisis escalation protocols, mandatory disclaimers for sensitive topics

## Quick Start

### Option 1: NPX (Recommended)

```bash
cd your-project
npx claude-ai-automation init
```

### Option 2: GitHub Template

Click **"Use this template"** button on GitHub to create a new repository.

### Option 3: Manual Clone

```bash
git clone https://github.com/Aftab-web-dev/claude-ai-automation.git
cp -r claude-ai-automation/template/* your-project/
```

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE.md (Controller)                    │
│  - Reads session state & user memory                         │
│  - Detects task type (Development vs Life)                   │
│  - Routes to appropriate agent                               │
│  - Enforces quality gates & safety protocols                 │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│   DEVELOPMENT AGENTS     │    │      LIFE AGENTS         │
├──────────────────────────┤    ├──────────────────────────┤
│ Requirements │ Planner   │    │ Interview │ Finance     │
│ Execution    │ Tester    │    │ Doctor    │ Lawyer      │
│ Reviewer     │ Security  │    │ Career    │ Business    │
│ Debugger     │ Refactor  │    │ Teaching  │ Research    │
│ Continuity   │ Risk      │    │ Wellness  │ Stress      │
│ State Manager│           │    │ Travel    │ Writer      │
│              │           │    │ Fitness   │ Productivity│
│              │           │    │ Analyst   │ Relationships│
│              │           │    │ Sexual Health            │
└──────────────────────────┘    └──────────────────────────┘
              │                               │
              ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│  Standards & Checklists  │    │  Safety & Disclaimers    │
│  - Code Standards        │    │  - Crisis Escalation     │
│  - API/DB Design         │    │  - Professional Referrals│
│  - Quality Gates         │    │  - Mandatory Disclaimers │
└──────────────────────────┘    └──────────────────────────┘
```

## Available Agents

### Development Agents (11)

| Agent | Trigger | Purpose |
|-------|---------|---------|
| **Requirements** | Unclear requirements | Gathers and clarifies what to build |
| **Risk Assessment** | New projects | Identifies risks before development |
| **Planner** | "Plan", new project | Creates architecture and detailed plans |
| **Execution** | "Build", "Start", "Execute" | Implements code step-by-step |
| **Continuity** | Returning to project | Reconstructs context from session |
| **Tester** | "Test", "QA" | Creates and runs tests |
| **Reviewer** | "Review", "Audit" | Code quality analysis |
| **Security** | "Security", "Vulnerabilities" | Security audit |
| **Debugger** | "Debug", "Fix bug", "Error" | Bug investigation and fixing |
| **Refactor** | "Refactor", "Clean up" | Code improvement |
| **State Manager** | After any task | Updates session files |

### Life Agents (23)

| Agent | Trigger | Purpose |
|-------|---------|---------|
| **Interview** | "Interview", "job prep" | Mock interviews, answer coaching, salary negotiation |
| **Finance** | "Invest", "budget", "money" | Financial education, investments, scam awareness |
| **Doctor** | "Health", "symptom" | Medical education, symptom guidance, specialist referrals |
| **Lawyer** | "Legal", "law", "rights" | Legal awareness, rights education, process guidance |
| **Career** | "Career", "job search" | Resume, job search, professional development |
| **Business** | "Startup", "business idea" | Entrepreneurship, idea validation, market analysis |
| **Teaching** | "Teach", "learn", "exam" | Education, concept explanation, exam prep |
| **Research** | "Research", "explain" | Deep research and analysis on any topic |
| **Wellness** | "Anxious", "overwhelmed" | Mental wellness, emotional support, self-care |
| **Stress** | "Stressed", "burnout" | Stress management, coping techniques, resilience |
| **Travel** | "Trip", "travel", "vacation" | Destination research, itinerary planning |
| **Writer** | "Write", "content", "draft" | Content creation, copywriting, editing |
| **Fitness** | "Workout", "gym", "exercise" | Exercise guidance, workout plans |
| **Productivity** | "Organize", "focus", "habits" | Time management, habit building |
| **Analyst** | "Analyze", "data", "metrics" | Data analysis, insights, visualization |
| **Relationships** | "Love", "dating", "breakup" | Healthy relationship guidance, emotional healing |
| **Sexual Health** | "Sexual health", "puberty" | Science-based sexual health education |
| **Resume** | "Resume", "LinkedIn", "CV" | Resume writing, ATS optimization, personal branding |
| **Negotiation** | "Negotiate", "salary", "raise" | Salary, business, and life negotiation coaching |
| **Parenting** | "Parenting", "child", "kids" | Evidence-based parenting guidance |
| **Social Media** | "Instagram", "TikTok", "content" | Content strategy and social media growth |
| **Study** | "Study", "exam prep", "flashcards" | Study techniques and exam preparation |
| **Email** | "Email", "message", "reply" | Professional communication and email writing |

## Usage Examples

### Start a New Project
```
You: "I want to build a task management API"

Claude:
1. Activates Requirements Agent (clarifies what you need)
2. Activates Risk Assessment Agent (identifies risks)
3. Activates Planner Agent (creates architecture)
4. Creates /docs/planning.md
5. Asks: "Ready to start building?"
```

### Continue Working
```
You: "Continue"

Claude:
1. Reads .session/state.md
2. Activates Continuity Agent (summarizes progress)
3. Activates Execution Agent
4. Continues from exact last point
```

### Debug an Issue
```
You: "The login is not working"

Claude:
1. Activates Debugger Agent
2. Investigates the issue
3. Finds root cause
4. Proposes and implements fix
5. Updates session
```

### Life Agent Examples

**Interview Preparation:**
```
You: "Help me prepare for a PM interview"

Claude:
1. Activates Interview Agent
2. Assesses your experience level
3. Conducts mock interview with real questions
4. Provides feedback on answers
5. Suggests improvements
```

**Financial Guidance:**
```
You: "Should I invest in mutual funds or stocks?"

Claude:
1. Activates Finance Agent
2. Explains both options clearly
3. Discusses risks and returns
4. Covers common mistakes
5. Includes mandatory disclaimer
```

**Health Concerns:**
```
You: "I have persistent headaches"

Claude:
1. Activates Doctor Agent
2. Asks clarifying questions
3. Explains possible causes (non-diagnostic)
4. Identifies red flags to watch for
5. Recommends which specialist to consult
```

**Stress Management:**
```
You: "I'm stressed about work deadlines"

Claude:
1. Activates Stress Agent
2. Validates the feeling
3. Provides immediate breathing technique
4. Discusses long-term strategies
5. Offers practical boundary-setting advice
```

## Project Structure

After initialization, your project will have:

```
your-project/
├── CLAUDE.md                    # Main controller (Claude reads this)
├── .aiautomations/
│   ├── prompts/                 # All 28 agent prompts
│   │   ├── orchestrator.md      # Master routing logic
│   │   │
│   │   ├── [Development Agents]
│   │   │   ├── requirementsagent.md
│   │   │   ├── riskassessmentagent.md
│   │   │   ├── planningprompt.md
│   │   │   ├── execution.md
│   │   │   ├── continuityagent.md
│   │   │   ├── testeragent.md
│   │   │   ├── revieweragent.md
│   │   │   ├── securityagent.md
│   │   │   ├── debuggeragent.md
│   │   │   ├── refactoragent.md
│   │   │   └── statemanageragent.md
│   │   │
│   │   └── [Life Agents]
│   │       ├── interviewagent.md
│   │       ├── financeagent.md
│   │       ├── doctoragent.md
│   │       ├── lawyeragent.md
│   │       ├── careeragent.md
│   │       ├── businessagent.md
│   │       ├── teachingagent.md
│   │       ├── researchagent.md
│   │       ├── wellnessagent.md
│   │       ├── stressagent.md
│   │       ├── travelagent.md
│   │       ├── writeragent.md
│   │       ├── fitnessagent.md
│   │       ├── productivityagent.md
│   │       ├── analyseragent.md
│   │       ├── loveguideragent.md
│   │       └── sexualagent.md
│   │
│   ├── protocols/               # System protocols
│   │   ├── collaboration.md     # Multi-agent coordination
│   │   ├── memory.md           # Context persistence
│   │   ├── quality.md          # Quality standards
│   │   └── escalation.md       # Emergency handling
│   │
│   ├── standards/               # Code & design standards
│   │   ├── codestandards.md
│   │   ├── techstack.md
│   │   ├── apidesign.md
│   │   ├── databasedesign.md
│   │   ├── validation.md
│   │   ├── frontendstandards.md
│   │   ├── testingstandards.md
│   │   └── documentationstandards.md
│   │
│   ├── checklists/              # Quality checklists
│   │   ├── beforecode.md
│   │   ├── aftercode.md
│   │   ├── prchecklist.md
│   │   ├── deploymentchecklist.md
│   │   └── securitychecklist.md
│   │
│   └── templates/               # Planning templates
│       ├── planning-web.md
│       ├── planning-api.md
│       ├── planning-cli.md
│       ├── planning-mobile.md
│       ├── planning-datasci.md
│       └── architecturedecisions.md
│
├── .session/                    # Session persistence (dev)
│   ├── state.md                 # Current project state
│   ├── log.md                   # Action history
│   └── next.md                  # Next steps
│
└── .memory/                     # User memory (universal)
    ├── user.md                  # User preferences
    └── context.md               # Session context
```

## Quality Gates

### For Development
Code is not considered complete until:

- [ ] Lint passes (no errors)
- [ ] Type check passes (no errors)
- [ ] Tests pass (all green)
- [ ] Build succeeds
- [ ] Security reviewed
- [ ] Checklists completed
- [ ] Session updated

### For Life Agents
Responses must include:

- [ ] Question fully addressed
- [ ] Appropriate disclaimers included
- [ ] Professional referral when needed
- [ ] Crisis resources for emergencies
- [ ] No harmful or misleading information

## Safety Features

Life agents include built-in safety protocols:

| Topic | Safety Measures |
|-------|-----------------|
| **Health** | Medical disclaimer, "consult a doctor" reminder, never diagnoses |
| **Finance** | "Not financial advice" disclaimer, risk warnings, no stock tips |
| **Legal** | Legal disclaimer, "consult a lawyer" reminder, jurisdiction aware |
| **Mental Health** | Crisis hotlines provided, professional help encouraged |
| **Relationships** | Consent emphasis, no manipulation tactics |

### Crisis Escalation
Agents automatically provide crisis resources when detecting:
- Suicidal thoughts → 988, Crisis Text Line
- Domestic violence → National DV Hotline
- Sexual assault → RAINN
- Severe medical symptoms → "Seek immediate help"

## Customization

### Add Your Own Agent

1. Create a new file in `.aiautomations/prompts/youragent.md`
2. Follow the existing agent format
3. Add it to the agent list in `CLAUDE.md`
4. Add trigger words in the decision tree

### Modify Standards

Edit files in `.aiautomations/standards/` to match your team's preferences:
- `codestandards.md` - Naming conventions, formatting
- `techstack.md` - Preferred technologies
- `apidesign.md` - API design rules
- `databasedesign.md` - Database conventions

### Customize Checklists

Edit files in `.aiautomations/checklists/` to add your own verification steps.

## Works With

- **Claude Code** (CLI)
- **Cursor** (with Claude)
- **VS Code** (with Claude extension)
- **Any IDE** where Claude can read project files

## Commands

| Command | Description |
|---------|-------------|
| `npx claude-ai-automation init` | Initialize in current directory |
| `npx claude-ai-automation init --force` | Overwrite existing files |
| `npx caia init` | Short alias |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details.
