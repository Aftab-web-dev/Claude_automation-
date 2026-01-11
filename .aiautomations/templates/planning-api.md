# API/Backend Planning Template

## Project Overview

### Project Name
[Name]

### Description
[One paragraph description]

### Problem Statement
[What problem this solves]

### Consumers
[Who/what will consume this API]

---

## Requirements Summary

### Functional Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]

### Non-Functional Requirements
- Throughput: [X requests/second]
- Latency: [< X ms p99]
- Availability: [X% uptime]
- Data Retention: [X days/months]

---

## Technical Stack

### Runtime & Framework
- Language: [Node.js/Python/Go/Rust/etc.]
- Framework: [Express/FastAPI/Gin/Actix/etc.]
- API Style: [REST/GraphQL/gRPC]

### Database
- Primary: [PostgreSQL/MySQL/etc.]
- Cache: [Redis/Memcached/etc.]
- Search: [Elasticsearch/etc.] (if needed)

### Infrastructure
- Hosting: [AWS/GCP/Azure/etc.]
- Container: [Docker/Kubernetes/etc.]
- Message Queue: [RabbitMQ/SQS/Kafka/etc.] (if needed)

---

## Architecture

### System Architecture
```
┌──────────────┐
│   Clients    │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│ Load Balancer│     │     CDN      │
└──────┬───────┘     └──────────────┘
       │
       ▼
┌──────────────┐
│  API Server  │
│   (Cluster)  │
└──────┬───────┘
       │
   ┌───┴───┐
   ▼       ▼
┌──────┐ ┌──────┐
│ Cache│ │  DB  │
└──────┘ └──────┘
```

### Folder Structure
```
api/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── repositories/     # Data access
│   ├── models/           # Data models
│   ├── middleware/       # Auth, logging, etc.
│   ├── routes/           # Route definitions
│   ├── validators/       # Input validation
│   ├── utils/            # Helpers
│   ├── types/            # TypeScript types
│   └── config/           # Configuration
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/
│   └── api/              # API documentation
├── scripts/              # Utility scripts
├── docker/
└── package.json
```

---

## API Design

### Base URL
```
Production: https://api.example.com/v1
Staging: https://api-staging.example.com/v1
```

### Authentication
- Method: [JWT/API Key/OAuth2]
- Header: `Authorization: Bearer <token>`

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [ ... ]
  }
}
```

---

## Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login user |
| POST | /auth/refresh | Refresh token |
| POST | /auth/logout | Logout user |

### Resources

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /resources | List resources |
| POST | /resources | Create resource |
| GET | /resources/:id | Get resource |
| PUT | /resources/:id | Update resource |
| DELETE | /resources/:id | Delete resource |

---

## Data Models

### Entity Relationship
```
User 1──────N Session
User 1──────N Resource
Resource N──────N Tag
```

### Models

#### User
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| email | String | Unique, Not Null |
| password | String | Not Null (hashed) |
| name | String | Not Null |
| role | Enum | Default: 'user' |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

#### Resource
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| userId | UUID | FK -> User |
| title | String | Not Null |
| content | Text | |
| status | Enum | Default: 'draft' |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

---

## Development Steps

### Step 1: Project Setup
- [ ] Initialize project
- [ ] Set up TypeScript/linting
- [ ] Configure database connection
- [ ] Set up environment management
- [ ] Create Docker setup

### Step 2: Core Infrastructure
- [ ] Implement error handling middleware
- [ ] Implement logging
- [ ] Implement request validation
- [ ] Set up authentication

### Step 3: Implement Endpoints
- [ ] Auth endpoints
- [ ] Resource CRUD
- [ ] [Other endpoints]

### Step 4: Testing
- [ ] Unit tests for services
- [ ] Integration tests for endpoints
- [ ] Load testing

### Step 5: Documentation
- [ ] OpenAPI/Swagger spec
- [ ] README
- [ ] Deployment guide

### Step 6: Deployment
- [ ] CI/CD pipeline
- [ ] Staging deployment
- [ ] Production deployment
- [ ] Monitoring setup

---

## Security Checklist

- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Helmet/security headers
- [ ] Secrets management
- [ ] Audit logging
