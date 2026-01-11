# Web Application Planning Template

## Project Overview

### Project Name
[Name]

### Description
[One paragraph description]

### Problem Statement
[What problem this solves]

### Target Users
[Who will use this]

---

## Requirements Summary

### Functional Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### Non-Functional Requirements
- Performance: [requirements]
- Security: [requirements]
- Scalability: [requirements]
- Accessibility: [requirements]

---

## Technical Stack

### Frontend
- Framework: [React/Vue/Angular/etc.]
- State Management: [Redux/Zustand/Pinia/etc.]
- Styling: [Tailwind/CSS Modules/Styled Components/etc.]
- Build Tool: [Vite/Webpack/etc.]

### Backend
- Runtime: [Node.js/Python/Go/etc.]
- Framework: [Express/FastAPI/Gin/etc.]
- Database: [PostgreSQL/MySQL/MongoDB/etc.]
- ORM: [Prisma/TypeORM/SQLAlchemy/etc.]

### Infrastructure
- Hosting: [Vercel/AWS/GCP/etc.]
- CI/CD: [GitHub Actions/GitLab CI/etc.]
- Monitoring: [Sentry/DataDog/etc.]

---

## Architecture

### System Architecture
```
[Diagram or description]

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│  Database   │
│  (Browser)  │◀────│   (API)     │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Folder Structure
```
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── types/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── types/
│   └── package.json
├── docs/
└── README.md
```

---

## Features & Phases

### Phase 1: MVP
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

### Phase 2: Enhancement
- [ ] Feature 4
- [ ] Feature 5

### Phase 3: Polish
- [ ] Feature 6
- [ ] Feature 7

---

## Page/Screen List

| Page | Route | Description | Auth Required |
|------|-------|-------------|---------------|
| Home | / | Landing page | No |
| Login | /login | User login | No |
| Dashboard | /dashboard | Main dashboard | Yes |
| Settings | /settings | User settings | Yes |

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/login | User login | No |
| POST | /api/auth/register | User registration | No |
| GET | /api/users/me | Get current user | Yes |
| PUT | /api/users/me | Update current user | Yes |

---

## Data Models

### User
```
User {
  id: UUID
  email: String (unique)
  password: String (hashed)
  name: String
  createdAt: DateTime
  updatedAt: DateTime
}
```

### [Other Models]
```
[Define other models]
```

---

## Development Steps

### Step 1: Project Setup
- [ ] Initialize frontend project
- [ ] Initialize backend project
- [ ] Set up database
- [ ] Configure environment variables
- [ ] Set up version control

### Step 2: Authentication
- [ ] Implement user registration
- [ ] Implement user login
- [ ] Implement JWT/session handling
- [ ] Create protected route middleware

### Step 3: Core Features
- [ ] [Feature implementation steps]

### Step 4: Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Manual testing

### Step 5: Deployment
- [ ] Set up CI/CD
- [ ] Configure production environment
- [ ] Deploy to staging
- [ ] Deploy to production

---

## Milestones

| Milestone | Description | Criteria |
|-----------|-------------|----------|
| M1 | Project Setup Complete | All tooling configured |
| M2 | Auth Complete | Users can register/login |
| M3 | MVP Complete | Core features working |
| M4 | Testing Complete | All tests passing |
| M5 | Production Ready | Deployed and monitored |
