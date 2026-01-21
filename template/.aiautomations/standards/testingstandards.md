# Testing Standards

Standards for all testing activities.

---

## 1. Testing Philosophy

### Core Principles
1. **Test behavior, not implementation**
2. **Tests are documentation**
3. **Fast tests run often**
4. **Flaky tests are worse than no tests**
5. **100% coverage is not the goal; confidence is**

### Testing Pyramid
```
        /\
       /  \      E2E (few)
      /----\     - Critical user journeys
     /      \    - Smoke tests
    /--------\   Integration (some)
   /          \  - API tests
  /            \ - Component integration
 /--------------\  Unit (many)
                   - Functions
                   - Components
                   - Hooks
```

---

## 2. Test Organization

### File Structure
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx      # Co-located
│       └── Button.stories.tsx   # Optional: Storybook
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts
└── __tests__/                   # Integration tests
    └── auth.integration.test.ts

tests/                           # E2E tests
├── e2e/
│   └── login.spec.ts
└── fixtures/
    └── users.json
```

### Naming Conventions
```typescript
// Test files
Button.test.tsx           // Unit tests
Button.spec.tsx           // Alternative
auth.integration.test.ts  // Integration tests
login.e2e.test.ts         // E2E tests

// Test descriptions - describe what, not how
describe('UserService', () => {
  describe('createUser', () => {
    it('creates a user with valid data', () => {});
    it('throws error when email is invalid', () => {});
    it('hashes password before storing', () => {});
  });
});
```

---

## 3. Unit Testing

### What to Test
- Pure functions
- Utility functions
- Custom hooks
- Component rendering
- Component interactions

### What NOT to Unit Test
- Implementation details
- Third-party libraries
- Framework internals
- Trivial code (getters/setters)

### Unit Test Structure (AAA Pattern)
```typescript
it('calculates total with tax', () => {
  // Arrange
  const items = [{ price: 100 }, { price: 200 }];
  const taxRate = 0.1;

  // Act
  const result = calculateTotal(items, taxRate);

  // Assert
  expect(result).toBe(330);
});
```

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

describe('LoginForm', () => {
  it('submits with email and password', async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    // Find elements by accessible roles/text
    await userEvent.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i),
      'password123'
    );
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('shows error when email is invalid', async () => {
    render(<LoginForm onSubmit={jest.fn()} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'invalid');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

---

## 4. Integration Testing

### What to Test
- API endpoints
- Database operations
- Multiple components together
- Service interactions

### API Testing
```typescript
import request from 'supertest';
import app from '../app';

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test' })
      .expect(201);

    expect(response.body).toMatchObject({
      email: 'test@example.com',
      name: 'Test'
    });
  });

  it('returns 400 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'invalid', name: 'Test' })
      .expect(400);

    expect(response.body.error).toContain('email');
  });
});
```

### Database Testing
```typescript
describe('UserRepository', () => {
  beforeEach(async () => {
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(async () => {
    await db.migrate.rollback();
  });

  it('finds user by email', async () => {
    const user = await userRepository.findByEmail('test@example.com');
    expect(user).toBeDefined();
    expect(user.name).toBe('Test User');
  });
});
```

---

## 5. E2E Testing

### What to Test
- Critical user journeys
- Authentication flows
- Checkout/payment flows
- Core business features

### E2E Test Example (Playwright)
```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('user can login with valid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error')).toContainText('Invalid credentials');
  });
});
```

---

## 6. Mocking

### When to Mock
- External APIs
- Databases (in unit tests)
- Time/dates
- Random values
- Network requests

### Mocking Examples
```typescript
// Mock function
const mockFn = jest.fn();
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue('async value');

// Mock module
jest.mock('../services/api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'Test' })
}));

// Mock API (MSW)
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'Test' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Mocking Anti-Patterns
```typescript
// Don't mock what you don't own excessively
// Don't mock implementation details
// Don't mock everything - some integration is good

// Bad - Testing implementation
expect(mockFn).toHaveBeenCalledTimes(3);

// Good - Testing behavior
expect(screen.getByText('Success')).toBeInTheDocument();
```

---

## 7. Test Data

### Factories
```typescript
// Use factories for consistent test data
const createUser = (overrides = {}) => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  createdAt: new Date(),
  ...overrides
});

// Usage
const user = createUser({ name: 'Specific Name' });
```

### Fixtures
```typescript
// fixtures/users.json
{
  "validUser": {
    "email": "test@example.com",
    "password": "ValidPass123!"
  },
  "invalidUser": {
    "email": "invalid",
    "password": "short"
  }
}
```

---

## 8. Assertions

### Good Assertions
```typescript
// Specific
expect(result).toBe(42);
expect(result).toEqual({ id: 1, name: 'Test' });
expect(result).toContain('expected');

// Readable
expect(user.isActive).toBe(true);
expect(errors).toHaveLength(0);

// Error messages
expect(result, 'User should be active after verification').toBe(true);
```

### Avoid
```typescript
// Too vague
expect(result).toBeTruthy();
expect(result).toBeDefined();

// Testing implementation
expect(component.state.count).toBe(1);
```

---

## 9. Coverage

### Coverage Targets
| Type | Target | Critical |
|------|--------|----------|
| Statements | 80% | 90% |
| Branches | 75% | 85% |
| Functions | 80% | 90% |
| Lines | 80% | 90% |

### Coverage Rules
- Coverage is a metric, not a goal
- High coverage doesn't mean good tests
- Focus on critical paths first
- Don't test trivial code for coverage

### Exclude from Coverage
```javascript
// jest.config.js
coveragePathIgnorePatterns: [
  '/node_modules/',
  '/__tests__/',
  '/types/',
  '.stories.tsx',
  '.d.ts'
]
```

---

## 10. CI/CD Integration

### Test Pipeline
```yaml
# Run on every PR
test:
  - npm run test:unit      # Fast, always
  - npm run test:integration  # Medium
  - npm run test:e2e       # On main/release only

# Coverage gate
coverage:
  - npm run test:coverage
  - upload to codecov
  - fail if below threshold
```

### Performance
- Unit tests: < 10ms each
- Integration tests: < 1s each
- E2E tests: < 30s each
- Total CI: < 10 minutes

---

## 11. Debugging Tests

### Common Issues
```typescript
// Issue: Test passes alone, fails in suite
// Solution: Check for shared state, add isolation

beforeEach(() => {
  jest.clearAllMocks();
  cleanup(); // React Testing Library
});

// Issue: Async test timeout
// Solution: Increase timeout or fix actual issue
it('long async test', async () => {
  // ...
}, 10000); // 10 second timeout

// Issue: Flaky test
// Solution: Don't rely on timing
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

---

## 12. Test Checklist

Before merging:
- [ ] All tests pass locally
- [ ] New code has tests
- [ ] No skipped tests without reason
- [ ] No console.logs in tests
- [ ] Tests are readable as documentation
- [ ] No flaky tests introduced
- [ ] Coverage maintained or improved
