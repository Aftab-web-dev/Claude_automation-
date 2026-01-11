# Tech Stack Guidelines

This document defines preferred technologies and rules for technology selection.

---

## Selection Criteria

When choosing technology, prioritize:

1. **Stability** - Proven, well-maintained
2. **Community** - Active community, good documentation
3. **Security** - Regular security updates
4. **Performance** - Meets requirements
5. **Team Familiarity** - Team can use effectively

---

## Preferred Technologies

### Frontend

| Category | Preferred | Also Acceptable | Avoid |
|----------|-----------|-----------------|-------|
| Framework | React, Next.js | Vue, Nuxt, Svelte | jQuery, Angular 1.x |
| State | Zustand, Jotai | Redux Toolkit, Pinia | MobX, Redux (old) |
| Styling | Tailwind CSS | CSS Modules, Styled Components | Inline styles, plain CSS |
| Build | Vite | Webpack 5 | Parcel, older Webpack |
| Testing | Vitest, Playwright | Jest, Cypress | Mocha, Jasmine |

### Backend

| Category | Preferred | Also Acceptable | Avoid |
|----------|-----------|-----------------|-------|
| Node.js | Express, Fastify | Hono, Koa | Sails, Meteor |
| Python | FastAPI | Django, Flask | Bottle, CherryPy |
| Go | Gin, Echo | Chi, Fiber | Beego |
| API Style | REST, GraphQL | gRPC (internal) | SOAP, XML-RPC |

### Database

| Category | Preferred | Also Acceptable | Avoid |
|----------|-----------|-----------------|-------|
| Relational | PostgreSQL | MySQL, SQLite (dev) | SQL Server, Oracle |
| Document | MongoDB | DynamoDB | CouchDB |
| Cache | Redis | Memcached | - |
| Search | Elasticsearch | Meilisearch | Solr |
| ORM | Prisma, Drizzle | TypeORM, Sequelize | Raw queries everywhere |

### Infrastructure

| Category | Preferred | Also Acceptable | Avoid |
|----------|-----------|-----------------|-------|
| Cloud | AWS, Vercel | GCP, Azure, Cloudflare | On-premise (unless required) |
| Container | Docker | Podman | LXC |
| Orchestration | Kubernetes | Docker Compose | Swarm |
| CI/CD | GitHub Actions | GitLab CI, CircleCI | Jenkins |
| IaC | Terraform | Pulumi, CDK | Manual setup |

---

## Version Requirements

### Minimum Versions
- Node.js: 18.x or later (LTS)
- Python: 3.10 or later
- Go: 1.21 or later
- TypeScript: 5.0 or later

### Always Use
- Package lockfiles (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Exact versions for production dependencies
- Latest LTS versions when possible

---

## Package Selection Rules

### Before Adding a Package

1. **Check necessity**
   - Can this be done with built-in features?
   - Is this worth adding a dependency?

2. **Evaluate the package**
   - Last update < 6 months ago
   - Active maintenance
   - No known vulnerabilities
   - Reasonable bundle size
   - Good documentation

3. **Check alternatives**
   - Compare with similar packages
   - Prefer well-established options

### Red Flags
- No updates in > 1 year
- Single maintainer with no activity
- Many open security issues
- Excessive dependencies
- No TypeScript support (for TS projects)

---

## Architecture Patterns

### Preferred Patterns

| Pattern | When to Use |
|---------|-------------|
| Clean Architecture | Large applications |
| MVC/MVVM | Web applications |
| Microservices | Large scale, team separation |
| Monolith | Small-medium apps, startups |
| Event-Driven | Async processing, decoupling |
| CQRS | Complex domains, high read/write ratio |

### Design Patterns to Use
- Repository Pattern (data access)
- Factory Pattern (object creation)
- Strategy Pattern (algorithm selection)
- Observer Pattern (event handling)
- Dependency Injection

### Anti-Patterns to Avoid
- God Classes
- Spaghetti Code
- Copy-Paste Programming
- Magic Numbers
- Premature Optimization

---

## Security Requirements

### Authentication
- Use established solutions (Auth0, Clerk, NextAuth)
- Implement proper session management
- Use secure password hashing (bcrypt, Argon2)

### API Security
- Always use HTTPS
- Implement rate limiting
- Use proper CORS configuration
- Validate all inputs
- Use parameterized queries

### Data Protection
- Encrypt sensitive data at rest
- Never log sensitive information
- Use environment variables for secrets
- Implement proper access controls

---

## Performance Guidelines

### Frontend
- Bundle size < 200KB (gzipped)
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Use code splitting
- Optimize images

### Backend
- API response time < 200ms (p95)
- Use connection pooling
- Implement caching where appropriate
- Use pagination for lists
- Optimize database queries

### Database
- Index frequently queried columns
- Avoid N+1 queries
- Use connection pooling
- Monitor slow queries

---

## Documentation Requirements

### Required Documentation
- README with setup instructions
- API documentation (OpenAPI/Swagger)
- Environment variables documentation
- Architecture decision records

### Code Documentation
- JSDoc/TSDoc for public APIs
- Comments for complex logic only
- Up-to-date type definitions
