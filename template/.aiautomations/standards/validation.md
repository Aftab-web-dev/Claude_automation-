# Validation Rules

Standards for validating input, output, and ensuring code quality.

---

## Input Validation

### Principle: Never Trust Input
All external input MUST be validated:
- User input (forms, query params)
- API request bodies
- URL parameters
- File uploads
- Environment variables
- External API responses

---

## Validation Rules by Type

### Strings

| Rule | Description | Example |
|------|-------------|---------|
| Required | Must not be empty | `""` → Error |
| Min Length | Minimum characters | `minLength(3)` |
| Max Length | Maximum characters | `maxLength(255)` |
| Pattern | Regex match | `pattern(/^[a-z]+$/)` |
| Trim | Remove whitespace | `"  hi  "` → `"hi"` |
| Lowercase | Convert to lowercase | `"Hi"` → `"hi"` |

### Numbers

| Rule | Description | Example |
|------|-------------|---------|
| Required | Must be provided | `undefined` → Error |
| Min | Minimum value | `min(0)` |
| Max | Maximum value | `max(100)` |
| Integer | Must be integer | `3.5` → Error |
| Positive | Must be > 0 | `-1` → Error |

### Email
```
- Must match email regex
- Must be lowercase
- Max length 255
- Domain validation (optional)
```

### Password
```
- Min 8 characters
- Max 128 characters
- At least 1 uppercase (optional)
- At least 1 lowercase (optional)
- At least 1 number (optional)
- At least 1 special character (optional)
- Not in common passwords list
```

### URL
```
- Valid URL format
- HTTPS only (for production)
- Max length 2048
- Allowed domains (whitelist)
```

### Date/Time
```
- Valid ISO 8601 format
- Not in the past (if required)
- Not too far in future
- Timezone handling
```

### UUID
```
- Valid UUID v4 format
- Lowercase
```

### Arrays
```
- Min items
- Max items
- Unique items
- Item validation
```

### Objects
```
- Required fields
- No extra fields (strict mode)
- Nested validation
```

---

## Common Validations

### User Registration
```javascript
{
  email: {
    required: true,
    email: true,
    maxLength: 255,
    unique: 'users.email'
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/
  },
  name: {
    required: true,
    minLength: 1,
    maxLength: 100,
    trim: true
  }
}
```

### Pagination
```javascript
{
  page: {
    optional: true,
    integer: true,
    min: 1,
    default: 1
  },
  limit: {
    optional: true,
    integer: true,
    min: 1,
    max: 100,
    default: 20
  }
}
```

### ID Parameter
```javascript
{
  id: {
    required: true,
    uuid: true  // or: integer: true, min: 1
  }
}
```

---

## Sanitization

### Always Sanitize
- HTML entities (prevent XSS)
- SQL parameters (prevent injection)
- Shell commands (prevent injection)
- File paths (prevent traversal)

### Sanitization Functions
```javascript
// HTML
sanitizeHtml(input) → escaped HTML entities

// SQL
useParameterizedQueries() → never concatenate

// Shell
escapeShellArg(input) → escaped argument

// Path
validatePath(input) → prevent ../
```

---

## Error Messages

### Good Error Messages
```javascript
{
  "field": "email",
  "code": "INVALID_FORMAT",
  "message": "Please enter a valid email address"
}

{
  "field": "password",
  "code": "TOO_SHORT",
  "message": "Password must be at least 8 characters"
}
```

### Bad Error Messages
```javascript
// Too vague
{ "message": "Invalid input" }

// Exposes internals
{ "message": "SQL Error: column 'email' not found" }

// Too technical
{ "message": "Regex pattern '^[a-z]+$' did not match" }
```

---

## Pre-Code Validation Checklist

Before writing ANY code, verify:

### Requirements
- [ ] Requirements are clear and documented
- [ ] Edge cases are identified
- [ ] Acceptance criteria exist
- [ ] Dependencies are available

### Design
- [ ] Architecture fits the requirement
- [ ] Data model is correct
- [ ] API contracts are defined
- [ ] Security considerations addressed

### Environment
- [ ] Development environment is set up
- [ ] Required credentials/keys available
- [ ] Database is accessible
- [ ] External services are available

---

## Post-Code Validation Checklist

After writing code, verify:

### Functionality
- [ ] Code compiles/runs without errors
- [ ] Feature works as specified
- [ ] Edge cases are handled
- [ ] Error handling is proper

### Quality
- [ ] Code follows style guidelines
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] No console warnings

### Security
- [ ] Input is validated
- [ ] Output is sanitized
- [ ] No hardcoded secrets
- [ ] SQL injection prevented
- [ ] XSS prevented

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases tested

---

## Build Validation

Before considering code complete:

### Build Checks
```bash
# Must pass:
npm run lint        # No linting errors
npm run typecheck   # No type errors
npm run test        # All tests pass
npm run build       # Build succeeds
```

### Minimum Coverage
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

---

## Runtime Validation

### Request Validation
```javascript
// Validate at the edge
app.post('/users', validate(createUserSchema), handler);

// Schema validation with Zod/Yup/Joi
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100)
});
```

### Response Validation (Development)
```javascript
// Validate responses in development
if (process.env.NODE_ENV === 'development') {
  validateResponse(response, responseSchema);
}
```

### Environment Validation
```javascript
// Validate env vars at startup
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'API_KEY'
];

requiredEnvVars.forEach(name => {
  if (!process.env[name]) {
    throw new Error(`Missing required env var: ${name}`);
  }
});
```
