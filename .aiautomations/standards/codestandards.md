# Code Standards

These standards MUST be followed for all code written by any agent.

---

## General Principles

### 1. Readability First
- Code is read more than written
- Clear code > clever code
- Self-documenting code > comments

### 2. Simplicity
- Do one thing well
- Avoid premature optimization
- YAGNI (You Aren't Gonna Need It)

### 3. Consistency
- Follow existing patterns in the codebase
- Use consistent naming throughout
- Use consistent formatting

---

## Naming Conventions

### Variables
```
✓ Good:
  - userCount
  - isValid
  - hasPermission
  - maxRetryAttempts

✗ Bad:
  - uc
  - flag
  - data
  - temp
```

### Functions
```
✓ Good:
  - getUserById(id)
  - calculateTotalPrice(items)
  - validateEmailFormat(email)
  - sendNotificationEmail(user, message)

✗ Bad:
  - process(x)
  - doStuff()
  - handle()
  - run()
```

### Classes
```
✓ Good:
  - UserService
  - PaymentProcessor
  - EmailValidator
  - DatabaseConnection

✗ Bad:
  - Manager
  - Helper
  - Utils (as a god class)
  - Processor (too generic)
```

### Constants
```
✓ Good:
  - MAX_RETRY_ATTEMPTS = 3
  - DEFAULT_PAGE_SIZE = 20
  - API_BASE_URL = "..."

✗ Bad:
  - num = 3
  - size = 20
```

### Files
```
✓ Good:
  - user-service.ts
  - payment-processor.ts
  - email.validator.ts
  - auth.middleware.ts

✗ Bad:
  - utils.ts (god file)
  - helpers.ts
  - misc.ts
```

---

## Code Structure

### Function Length
- Maximum: 20-30 lines
- If longer, extract sub-functions
- Each function should do ONE thing

### File Length
- Maximum: 200-300 lines
- If longer, split into modules
- Group related functionality

### Nesting Depth
- Maximum: 3 levels
- Use early returns
- Extract complex conditions

```javascript
// ✗ Bad - deep nesting
function process(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // do something
      }
    }
  }
}

// ✓ Good - early returns
function process(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;

  // do something
}
```

---

## Error Handling

### Always Handle Errors
```javascript
// ✗ Bad
const data = await fetchData();

// ✓ Good
try {
  const data = await fetchData();
} catch (error) {
  logger.error('Failed to fetch data', { error });
  throw new DataFetchError('Could not retrieve data');
}
```

### Use Specific Error Types
```javascript
// ✗ Bad
throw new Error('Something went wrong');

// ✓ Good
throw new ValidationError('Email format is invalid');
throw new NotFoundError('User not found');
throw new AuthorizationError('Insufficient permissions');
```

### Provide Context
```javascript
// ✗ Bad
throw new Error('Failed');

// ✓ Good
throw new Error(`Failed to process order ${orderId}: ${reason}`);
```

---

## Comments

### When to Comment
- Complex business logic
- Non-obvious decisions
- Workarounds with reasons
- API documentation

### When NOT to Comment
- Obvious code
- What code does (code should be self-documenting)
- Commented-out code (delete it)

```javascript
// ✗ Bad comment
// Increment counter
counter++;

// ✓ Good comment
// Using exponential backoff as per RFC 7231 recommendation
const delay = Math.pow(2, attempt) * 1000;
```

---

## Formatting

### Indentation
- Use consistent indentation (2 or 4 spaces)
- Never mix tabs and spaces

### Line Length
- Maximum: 80-120 characters
- Break long lines logically

### Whitespace
- One blank line between functions
- No trailing whitespace
- Newline at end of file

### Braces
- Opening brace on same line
- Always use braces (even single-line if)

```javascript
// ✓ Good
if (condition) {
  doSomething();
}

// ✗ Bad
if (condition)
  doSomething();
```

---

## Type Safety

### Always Define Types
```typescript
// ✗ Bad
function process(data: any) { }

// ✓ Good
interface UserData {
  id: string;
  name: string;
  email: string;
}
function process(data: UserData) { }
```

### Avoid Type Assertions
```typescript
// ✗ Bad
const user = data as User;

// ✓ Good
function isUser(data: unknown): data is User {
  return typeof data === 'object' &&
         data !== null &&
         'id' in data;
}

if (isUser(data)) {
  // data is now typed as User
}
```

---

## Security

### Input Validation
- Validate ALL external input
- Sanitize before use
- Use parameterized queries

### Secrets
- NEVER hardcode secrets
- Use environment variables
- Never log sensitive data

### Dependencies
- Keep dependencies updated
- Review before adding new ones
- Use lockfiles

---

## Testing

### Test Naming
```javascript
// ✓ Good
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {});
    it('should throw ValidationError for invalid email', () => {});
    it('should throw DuplicateError for existing email', () => {});
  });
});
```

### Test Structure
- Arrange → Act → Assert
- One assertion per test (when possible)
- Test edge cases

### What to Test
- Happy path
- Error cases
- Edge cases
- Boundary conditions

---

## Git Commits

### Commit Message Format
```
<type>: <short description>

<body - optional>

<footer - optional>
```

### Types
- feat: New feature
- fix: Bug fix
- refactor: Code refactoring
- docs: Documentation
- test: Tests
- chore: Maintenance

### Examples
```
feat: add user registration endpoint

fix: prevent duplicate email registration

refactor: extract validation logic to separate module
```
