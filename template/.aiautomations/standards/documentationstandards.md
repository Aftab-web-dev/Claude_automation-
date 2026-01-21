# Documentation Standards

Standards for all documentation.

---

## 1. Documentation Types

| Type | Purpose | Location |
|------|---------|----------|
| README | Project overview | Root directory |
| API Docs | Endpoint reference | `/docs/api/` |
| Code Comments | Inline explanations | In code |
| Architecture | System design | `/docs/architecture/` |
| User Guide | How to use | `/docs/guide/` |
| Contributing | How to contribute | `CONTRIBUTING.md` |
| Changelog | Version history | `CHANGELOG.md` |

---

## 2. README Structure

Every project must have a README with:

```markdown
# Project Name

Brief description (1-2 sentences).

## Features

- Feature 1
- Feature 2

## Quick Start

\`\`\`bash
# Installation
npm install

# Run
npm start
\`\`\`

## Documentation

- [API Reference](./docs/api.md)
- [Architecture](./docs/architecture.md)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
```

---

## 3. Code Comments

### When to Comment
- Complex algorithms
- Non-obvious business logic
- Workarounds with reasons
- Public APIs

### When NOT to Comment
- Obvious code
- Self-explanatory names
- Every line

### Comment Styles
```typescript
// Single line for brief notes

/*
 * Multi-line for longer explanations
 * that span multiple lines
 */

/**
 * JSDoc for functions/classes
 * @param {string} name - User's name
 * @returns {User} Created user object
 */
function createUser(name: string): User {
  // ...
}

// TODO: Description of what needs to be done
// FIXME: Description of bug to fix
// HACK: Explanation of why this workaround exists
// NOTE: Important information for future developers
```

### JSDoc Standards
```typescript
/**
 * Calculates the total price including tax.
 *
 * @description Handles edge cases like negative values
 * and rounds to 2 decimal places.
 *
 * @param {number} subtotal - Pre-tax amount
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns {number} Total with tax, rounded to 2 decimals
 * @throws {Error} If subtotal is negative
 *
 * @example
 * calculateTotal(100, 0.1); // Returns 110.00
 */
function calculateTotal(subtotal: number, taxRate: number): number {
  if (subtotal < 0) {
    throw new Error('Subtotal cannot be negative');
  }
  return Math.round((subtotal * (1 + taxRate)) * 100) / 100;
}
```

---

## 4. API Documentation

### Endpoint Documentation
```markdown
## Create User

Creates a new user account.

### Request

`POST /api/users`

#### Headers

| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Bearer token |
| Content-Type | Yes | application/json |

#### Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Valid email address |
| name | string | Yes | Full name (2-100 chars) |
| role | string | No | User role (default: "user") |

#### Example

\`\`\`json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "admin"
}
\`\`\`

### Response

#### Success (201 Created)

\`\`\`json
{
  "success": true,
  "data": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
\`\`\`

#### Errors

| Code | Description |
|------|-------------|
| 400 | Invalid request body |
| 401 | Unauthorized |
| 409 | Email already exists |
```

### OpenAPI/Swagger
```yaml
paths:
  /api/users:
    post:
      summary: Create a new user
      tags:
        - Users
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
```

---

## 5. Architecture Documentation

### Architecture Decision Records (ADR)
```markdown
# ADR-001: Use PostgreSQL for primary database

## Status
Accepted

## Context
We need a database for storing user data and transactions.

## Decision
Use PostgreSQL as our primary database.

## Reasons
- ACID compliance required for transactions
- Complex queries needed
- Team expertise
- Excellent ecosystem

## Alternatives Considered
- MongoDB: No ACID, less suitable for relational data
- MySQL: PostgreSQL has better JSON support

## Consequences
- Need PostgreSQL expertise
- Hosting costs slightly higher
- Migration tooling needed
```

### System Diagrams (describe in text)
```markdown
## System Architecture

### Overview

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   API GW    │────▶│   Service   │
│  (Browser)  │     │   (Nginx)   │     │   (Node)    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Database   │
                                        │ (PostgreSQL)│
                                        └─────────────┘
\`\`\`

### Components

1. **Client**: React SPA
2. **API Gateway**: Nginx with rate limiting
3. **Service**: Node.js REST API
4. **Database**: PostgreSQL 14
```

---

## 6. Changelog

### Format (Keep a Changelog)
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- New feature description

## [1.2.0] - 2024-01-15

### Added
- User authentication (#123)
- Password reset flow (#125)

### Changed
- Updated dependencies

### Fixed
- Login redirect bug (#124)

### Security
- Patched XSS vulnerability

## [1.1.0] - 2024-01-01

### Added
- Initial user management
```

### Change Categories
- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Features to be removed
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security patches

---

## 7. Writing Style

### Principles
1. **Clear**: Simple language, no jargon
2. **Concise**: Say more with less
3. **Accurate**: Technically correct
4. **Actionable**: Tell reader what to do

### Do's
- Use active voice
- Use present tense
- Use second person ("you")
- Use numbered lists for sequences
- Use bullet points for non-sequential items
- Include examples

### Don'ts
- Don't use passive voice excessively
- Don't use future tense for instructions
- Don't use first person ("I", "we")
- Don't use jargon without explanation
- Don't assume knowledge

### Examples
```markdown
# Bad
The configuration file will be created by the system when
it is initialized for the first time.

# Good
The system creates a configuration file on first run.

# Bad
We recommend that users should consider implementing caching.

# Good
Implement caching to improve performance.
```

---

## 8. Formatting

### Markdown Rules
```markdown
# Heading 1 (Page title only)
## Heading 2 (Major sections)
### Heading 3 (Subsections)
#### Heading 4 (Rarely needed)

**Bold** for emphasis
`code` for inline code
\`\`\`language
code block
\`\`\`

- Bullet list
1. Numbered list

| Table | Header |
|-------|--------|
| Cell  | Cell   |

> Blockquote for notes/warnings

[Link text](url)
![Alt text](image-url)
```

### Code Examples
- Always specify language for syntax highlighting
- Keep examples minimal but complete
- Show expected output when helpful
- Test all code examples

---

## 9. Versioning Documentation

### When to Update
- New features → Update relevant docs
- API changes → Update API docs immediately
- Breaking changes → Prominent documentation
- Bug fixes → Update if behavior documented

### Version in Docs
```markdown
> **Note**: This documentation is for v2.x.
> For v1.x documentation, see [v1 docs](./v1/).
```

---

## 10. Review Checklist

Before publishing documentation:

- [ ] Spell check passed
- [ ] Links work
- [ ] Code examples tested
- [ ] Screenshots current
- [ ] Version numbers correct
- [ ] No sensitive information
- [ ] Accessible language
- [ ] Consistent formatting

---

## 11. Tools

### Recommended
- **Markdown linting**: markdownlint
- **Spell check**: cspell
- **Link checking**: markdown-link-check
- **Doc generation**: JSDoc, TypeDoc
- **API docs**: Swagger/OpenAPI

### Configuration
```json
// .markdownlint.json
{
  "MD013": false,
  "MD033": false,
  "MD041": false
}
```
