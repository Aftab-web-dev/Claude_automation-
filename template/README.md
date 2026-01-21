# AI Universal Assistant System

A comprehensive multi-agent AI orchestration system that handles **software development** AND **life/personal assistance**.

---

## Overview

This system provides **34 specialized AI agents** organized into two domains:

- **Development Domain** (11 agents): Full software development lifecycle
- **Life Domain** (23 agents): Personal and professional assistance

### What Makes This System Different

**For Development:**
- Complete SDLC coverage from requirements to deployment
- Risk assessment before coding begins
- Session persistence - never lose progress
- Automated quality gates and checklists

**For Life:**
- Expert-level guidance across health, finance, career, relationships
- Safety-first approach with crisis escalation protocols
- Mandatory disclaimers for sensitive topics
- Multi-agent collaboration for complex life situations
- Culturally aware (India-specific options where relevant)

---

## Quick Start

1. Copy the `template/` folder to your project
2. The `CLAUDE.md` file will be automatically read by Claude
3. Start chatting - the system auto-routes to the right agent

**Example prompts:**
```
Development Examples:
"I want to build a todo app"          → Development flow
"Debug this API error"                → Debugger Agent
"Review my code for security"         → Security Agent

Life Agent Examples:
"Help me prepare for an interview"    → Interview Agent
"Mock interview me for a PM role"     → Interview Agent (Mock Mode)
"Should I invest in mutual funds?"    → Finance Agent
"Explain what SIPs are"               → Finance Agent
"I have a persistent headache"        → Doctor Agent
"I'm stressed about work"             → Stress Agent
"Help me with breathing exercises"    → Stress Agent
"I'm feeling overwhelmed lately"      → Wellness Agent
"How do I talk to my crush?"          → Relationships Agent
"Help me get over a breakup"          → Relationships Agent
"Teach me about machine learning"     → Teaching Agent
"Plan a trip to Japan"                → Travel Agent
"Write a cover letter"                → Writer Agent
"How to stay focused while studying"  → Productivity Agent
"Beginner workout plan for home"      → Fitness Agent
"Research the history of AI"          → Research Agent
"Analyze my sales data trends"        → Analyst Agent
"I want to start a business"          → Business Agent
"What are my rights as a tenant?"     → Lawyer Agent
```

---

## System Architecture

```
template/
├── CLAUDE.md                    # Main system instructions
├── README.md                    # This file
├── QUICKSTART.md               # Getting started guide
│
└── .aiautomations/
    ├── prompts/                 # All 34 agent definitions
    │   ├── orchestrator.md      # Master routing logic
    │   │
    │   ├── [Development Agents]
    │   │   ├── requirementsagent.md
    │   │   ├── riskassessmentagent.md
    │   │   ├── planningprompt.md
    │   │   ├── execution.md
    │   │   ├── continuityagent.md
    │   │   ├── testeragent.md
    │   │   ├── revieweragent.md
    │   │   ├── securityagent.md
    │   │   ├── debuggeragent.md
    │   │   ├── refactoragent.md
    │   │   └── statemanageragent.md
    │   │
    │   └── [Life Agents]
    │       ├── researchagent.md
    │       ├── teachingagent.md
    │       ├── financeagent.md
    │       ├── businessagent.md
    │       ├── doctoragent.md
    │       ├── lawyeragent.md
    │       ├── travelagent.md
    │       ├── interviewagent.md
    │       ├── analyseragent.md
    │       ├── careeragent.md
    │       ├── writeragent.md
    │       ├── wellnessagent.md
    │       ├── productivityagent.md
    │       ├── fitnessagent.md
    │       ├── stressagent.md
    │       ├── sexualagent.md
    │       └── loveguideragent.md
    │
    ├── protocols/               # System protocols
    │   ├── collaboration.md     # Multi-agent coordination
    │   ├── memory.md           # Context persistence
    │   ├── quality.md          # Quality standards
    │   └── escalation.md       # Emergency handling
    │
    ├── standards/              # Code & design standards
    │   ├── codestandards.md
    │   ├── techstack.md
    │   ├── apidesign.md
    │   ├── databasedesign.md
    │   ├── validation.md
    │   ├── frontendstandards.md
    │   ├── testingstandards.md
    │   └── documentationstandards.md
    │
    ├── checklists/             # Quality checklists
    │   ├── beforecode.md
    │   ├── aftercode.md
    │   ├── prchecklist.md
    │   ├── deploymentchecklist.md
    │   └── securitychecklist.md
    │
    └── templates/              # Project templates
        ├── planning-web.md
        ├── planning-api.md
        ├── planning-cli.md
        ├── planning-mobile.md
        ├── planning-datasci.md
        └── architecturedecisions.md
```

---

## Available Agents

### Development Agents

| Agent | Purpose | Trigger Keywords |
|-------|---------|------------------|
| Requirements | Gather project requirements | "build", "create", "new project" |
| Risk Assessment | Identify risks before coding | New projects, major changes |
| Planner | Design architecture | "plan", "design", "architect" |
| Execution | Implement code | "start", "code", "implement" |
| Continuity | Resume previous work | "continue", returning user |
| Tester | QA and testing | "test", "QA", "bugs" |
| Reviewer | Code quality audits | "review", "audit" |
| Security | Security analysis | "security", "vulnerabilities" |
| Debugger | Fix bugs | "debug", "fix", "error" |
| Refactor | Improve code | "refactor", "clean up" |
| State Manager | Maintain session | Auto-activated |

### Life Agents

| Agent | Purpose | Trigger Keywords |
|-------|---------|------------------|
| Research | Deep research on any topic | "research", "explain" |
| Teaching | Education & learning | "teach", "learn", "exam" |
| Finance | Money & investments | "invest", "budget", "money" |
| Business | Startups & entrepreneurship | "startup", "business idea" |
| Doctor | Health guidance | "health", "symptom" |
| Lawyer | Legal awareness | "legal", "law", "rights" |
| Travel | Trip planning | "trip", "travel", "vacation" |
| Interview | Interview preparation | "interview", "job prep" |
| Analyst | Data analysis | "analyze", "data", "metrics" |
| Career | Career development | "career", "job search" |
| Writer | Content creation | "write", "content", "draft" |
| Wellness | Mental wellness | "anxious", "overwhelmed" |
| Productivity | Time management | "organize", "focus", "habits" |
| Fitness | Exercise guidance | "workout", "gym", "exercise" |
| Stress | Stress management | "stressed", "burnout" |
| Sexual Health | Sexual health education | "sexual health", "puberty", "reproductive" |
| Relationships | Dating & love guidance | "love", "dating", "relationship", "breakup" |
| Resume | Resume & LinkedIn optimization | "resume", "linkedin", "cv", "portfolio" |
| Negotiation | Salary & deal negotiation | "negotiate", "salary", "raise", "offer" |
| Parenting | Child-rearing guidance | "parenting", "child", "kids", "baby" |
| Social Media | Content strategy & growth | "instagram", "tiktok", "content", "followers" |
| Study | Study techniques & exam prep | "study", "exam prep", "flashcards", "revision" |
| Email | Professional communication | "email", "message", "communication", "reply" |

---

## Life Agents - Detailed Capabilities

### Interview Agent
Comprehensive interview preparation for all career levels:
- **Mock Interviews**: Live practice with real-time feedback
- **HR/Behavioral/Technical**: Covers all interview types
- **Answer Coaching**: Teaches STAR method, clarity, structure
- **Resume-Based Questions**: Practice based on your actual experience
- **Confidence Building**: Stress management, body language tips
- **Salary Negotiation**: How to discuss compensation professionally

**Modes**: Fresher, Experienced, Tech, HR, Rapid Fire, Salary Negotiation

### Finance Agent
Practical financial education (not financial advice):
- **Personal Finance**: Budgeting, saving, emergency funds, debt management
- **Investments**: Mutual funds, stocks, ETFs, SIPs (education, not tips)
- **Insurance**: Health, term life - protection vs investment
- **Taxes**: Basic awareness, tax-saving instruments
- **Scam Awareness**: Identifying Ponzi schemes, "guaranteed returns" fraud
- **Financial Psychology**: Understanding greed, fear, herd mentality

**India-specific**: PF, PPF, NPS, ELSS, SEBI/RBI references

### Doctor Agent
Medical education and health guidance (not diagnosis):
- **Symptom Understanding**: What symptoms mean, when to worry
- **Condition Awareness**: Common illnesses, chronic diseases, lifestyle disorders
- **Red Flags**: Emergency signs that need immediate attention
- **Specialist Referral**: Which doctor to consult for what
- **Prevention**: Hygiene, lifestyle, diet, vaccination awareness

**Safety**: Never diagnoses, prescribes, or replaces real medical advice

### Wellness Agent
Mental wellness support for everyday challenges:
- **Stress Management**: Identifying sources, reduction techniques
- **Anxiety Support**: Grounding, breathing, thought reframing
- **Motivation**: Overcoming procrastination, building momentum
- **Emotional Processing**: Validating feelings, healthy expression
- **Life Transitions**: Career changes, relationships, relocations
- **Self-Care**: Sleep hygiene, work-life balance, digital wellness

**Crisis Protocol**: Immediate escalation with helpline resources for serious concerns

### Stress Agent
Dedicated stress management specialist:
- **Immediate Coping**: 4-7-8 breathing, box breathing, grounding techniques
- **Long-Term Management**: Lifestyle changes, cognitive approaches
- **Workplace Stress**: Workload, difficult colleagues, boundaries
- **Academic Stress**: Exam anxiety, deadline pressure, perfectionism
- **Stress Resilience**: Building sustainable coping mechanisms
- **Stress Audit**: Identifying patterns, triggers, and solutions

### Relationships Agent
Healthy relationship guidance:
- **Understanding Love**: Attraction vs infatuation vs love vs attachment
- **Self-Improvement**: Confidence, communication, emotional maturity
- **Expressing Interest**: Natural, respectful approaches
- **Dating Guidance**: First dates, building trust, healthy dynamics
- **Emotional Healing**: One-sided love, breakups, moving on
- **Boundaries**: Consent, respect, recognizing red flags

**Ethics**: No manipulation tactics, promotes authenticity and mutual respect

### Sexual Health Agent
Science-based sexual health education:
- **Anatomy & Physiology**: Male, female, intersex - educational
- **Puberty & Development**: Physical and emotional changes
- **Reproductive Health**: Menstrual cycles, common concerns
- **STI Awareness**: Prevention, testing importance, removing stigma
- **Mental Aspects**: Body image, performance anxiety, cultural sensitivity
- **Gender & Orientation**: Inclusive, affirming explanations

**Safety**: Educational only, age-appropriate, immediate escalation for abuse/assault

### Career Agent
Professional development guidance:
- **Job Search**: Resume building, job applications, networking
- **Career Growth**: Skill development, promotions, leadership
- **Career Transitions**: Changing fields, upskilling strategies
- **Professional Branding**: LinkedIn, personal brand, visibility
- **Workplace Navigation**: Office politics, difficult situations

### Teaching Agent
Personalized education assistant:
- **Concept Explanation**: Any topic broken down simply
- **Exam Preparation**: Study strategies, practice questions
- **Learning Paths**: Structured learning for new skills
- **Doubt Clearing**: Patient, thorough explanations
- **Multiple Levels**: Beginner to advanced explanations

### Business Agent
Entrepreneurship and startup guidance:
- **Idea Validation**: Market analysis, feasibility assessment
- **Business Planning**: Strategy, go-to-market, operations
- **Startup Guidance**: Funding, scaling, common pitfalls
- **Market Analysis**: Competition, opportunities, trends

### Lawyer Agent
Legal education and rights awareness (not legal advice):
- **Rights Education**: Know your rights as worker, consumer, tenant, citizen
- **Legal Concepts**: Laws explained in plain language
- **Process Guidance**: How FIRs, complaints, courts work (high-level)
- **Coverage Areas**: Civil, criminal, consumer, labor, property, family, cyber law
- **Jurisdiction Aware**: Asks/clarifies location for relevant laws

**Safety**: Never provides case-specific advice or helps evade laws

### Travel Agent
Complete trip planning:
- **Destination Research**: Best places, seasons, experiences
- **Itinerary Planning**: Day-by-day schedules, logistics
- **Budget Planning**: Cost estimates, money-saving tips
- **Practical Tips**: Visas, packing, local customs

### Writer Agent
Content creation assistant:
- **Various Formats**: Blogs, articles, emails, social media
- **Tone Adaptation**: Professional, casual, persuasive, creative
- **Editing Support**: Grammar, structure, clarity improvement
- **Content Strategy**: What to write, how to engage

### Productivity Agent
Time and energy management:
- **Time Management**: Techniques, prioritization, scheduling
- **Focus Strategies**: Deep work, distraction management
- **Habit Building**: Creating and maintaining good habits
- **Organization**: Systems for tasks, projects, goals

### Fitness Agent
Exercise and workout guidance:
- **Workout Plans**: Customized for goals and equipment
- **Form Guidance**: Proper technique explanations
- **Progress Tracking**: How to measure and improve
- **Nutrition Basics**: Eating for fitness goals

### Research Agent
Deep dive into any topic:
- **Comprehensive Analysis**: Multiple angles, thorough coverage
- **Source Synthesis**: Gathering and combining information
- **Structured Output**: Clear, organized findings
- **Follow-up Questions**: Exploring related topics

### Analyst Agent
Data and metrics analysis:
- **Data Interpretation**: Understanding numbers and trends
- **Insight Generation**: What the data means
- **Visualization Advice**: How to present findings
- **Decision Support**: Data-driven recommendations

### Resume Agent
Professional resume and LinkedIn optimization:
- **Resume Writing**: ATS-friendly, achievement-focused
- **Resume Review**: Score and improve existing resumes
- **LinkedIn Optimization**: Profile, headline, about section
- **Achievement Transformation**: Turn duties into impact statements
- **Personal Branding**: Build professional presence

### Negotiation Agent
Salary and deal negotiation coaching:
- **Salary Negotiation**: Preparation, scripts, counter-offers
- **Raise Requests**: How to ask and when
- **Business Deals**: Vendor, client, partnership negotiations
- **Freelance Rates**: Setting and defending prices
- **Psychology**: Understanding tactics and leverage

**Ethics**: Win-win focus, no manipulation

### Parenting Agent
Evidence-based parenting guidance:
- **Age-Specific**: Newborn to teenager strategies
- **Behavioral**: Tantrums, discipline, boundaries
- **Emotional**: Building resilience, processing feelings
- **Practical**: Sleep, eating, screen time
- **Self-Care**: Managing parental burnout

**Safety**: Crisis escalation for serious concerns

### Social Media Agent
Content strategy and growth:
- **Platform Strategy**: Instagram, TikTok, LinkedIn, Twitter, YouTube
- **Content Creation**: Hooks, captions, formats
- **Growth Tactics**: Organic, ethical engagement
- **Analytics**: What metrics matter
- **Monetization**: Brand deals, products

### Study Agent
Study techniques and exam preparation:
- **Techniques**: Active recall, spaced repetition, Pomodoro
- **Note-Taking**: Cornell, mind maps, flow notes
- **Exam Prep**: Planning, mock tests, day-of strategies
- **Subject-Specific**: Sciences, math, languages, humanities
- **Motivation**: Overcoming procrastination, building habits

### Email Agent
Professional communication:
- **Email Types**: Requests, follow-ups, apologies, cold outreach
- **Tone Adaptation**: Formal, casual, startup, executive
- **Templates**: Ready-to-use frameworks
- **Job Search**: Cover letters, thank you notes, negotiations
- **Business**: Proposals, client updates, partnerships

---

## How It Works

### 1. Auto-Routing
The system automatically detects your request type:
- **Development tasks** → Routes to dev agents
- **Life/personal tasks** → Routes to life agents

### 2. Session Management
For development projects:
```
.session/
├── state.md    # Current project state
├── log.md      # History of actions
└── next.md     # Next steps
```

### 3. Memory System
For personalized experience:
```
.memory/
├── user.md     # Your preferences
└── context.md  # Session context
```

### 4. Multi-Agent Collaboration
Complex tasks can involve multiple agents:

**Development + Development:**
```
"Build and test an API"
→ Planner → Execution → Tester
```

**Life + Life:**
```
"Research AI and write an article"
→ Research Agent → Writer Agent

"Stressed about career change and have interviews"
→ Stress Agent → Career Agent → Interview Agent

"Want to start a business and need financial planning"
→ Business Agent + Finance Agent

"Health anxiety affecting my work"
→ Doctor Agent → Wellness Agent → Productivity Agent

"Learning to invest while managing debt"
→ Teaching Agent (concepts) → Finance Agent (practical)
```

**Cross-Domain:**
```
"Build a fitness tracking app"
→ Development flow (with Fitness Agent for domain knowledge)
```

---

## Quality Gates

### For Development
- Lint passes
- Type check passes
- Tests pass
- Build succeeds
- Security reviewed
- Checklists completed

### For Life Agents
- Question fully understood and addressed
- Appropriate disclaimers included
- Actionable, practical guidance provided
- Professional referral when needed
- Crisis resources provided for emergencies
- Tone appropriate to situation
- No harmful or misleading information

### Sensitive Topic Standards
| Topic | Required Elements |
|-------|-------------------|
| Health | Medical disclaimer, "consult a doctor" reminder |
| Finance | Not financial advice disclaimer, risk warnings |
| Legal | Legal disclaimer, "consult a lawyer" reminder |
| Mental Health | Crisis resources, professional help encouragement |
| Relationships | Consent emphasis, healthy boundaries focus |
| Sexual Health | Educational framing, age-appropriate content |

---

## Safety Rules

### Universal Safety
1. Health, legal, and financial agents include mandatory disclaimers
2. Sensitive topics recommend professional consultation
3. Emergency situations trigger escalation protocols
4. No harmful or illegal guidance provided
5. Age-appropriate content for younger users

### Crisis Escalation
Life agents are trained to recognize and escalate emergencies:

| Situation | Response |
|-----------|----------|
| Suicidal thoughts | Immediate crisis resources (988, Crisis Text Line) |
| Self-harm | Crisis hotline + encourage professional help |
| Domestic violence | National DV Hotline (1-800-799-7233) |
| Sexual assault | RAINN (1-800-656-4673) |
| Severe medical symptoms | "Seek immediate medical help" |
| Mental health crisis | iCall, Vandrevala Foundation (India) |

### Agent Boundaries
| Agent | Does NOT Do |
|-------|-------------|
| Doctor | Diagnose, prescribe medication, provide dosages |
| Finance | Give stock tips, guarantee returns, provide personalized advice |
| Lawyer | Provide legal judgments, specific case advice |
| Wellness | Replace therapy, handle trauma, diagnose conditions |
| Relationships | Teach manipulation, encourage pursuing rejection |
| Sexual Health | Explicit content, graphic instructions |
| Interview | Guarantee job offers, encourage dishonesty |

---

## Customization

### Adding New Agents
1. Create new file in `.aiautomations/prompts/`
2. Follow existing agent structure
3. Add to orchestrator.md routing table
4. Update CLAUDE.md agent list

### Modifying Standards
1. Edit files in `.aiautomations/standards/`
2. Changes apply to all future work

### Adding Checklists
1. Create new file in `.aiautomations/checklists/`
2. Reference in relevant agent prompts

---

## Best Practices

1. **Be specific** - Clear requests get better routing
2. **Provide context** - Help agents understand your situation
3. **Use keywords** - Triggers help with agent selection
4. **Continue sessions** - Say "continue" to resume work

---

## Support

For issues or improvements, modify the relevant files in `.aiautomations/`.

---

## License

This system is provided as a template for AI-assisted workflows.
