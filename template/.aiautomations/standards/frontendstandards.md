# Frontend Standards

Standards for all frontend development work.

---

## 1. Component Structure

### File Organization
```
src/
├── components/
│   ├── common/          # Shared/reusable components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.styles.ts (or .css/.scss)
│   │   │   └── index.ts
│   │   └── ...
│   ├── features/        # Feature-specific components
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   └── ...
│   └── layout/          # Layout components
│       ├── Header/
│       ├── Footer/
│       └── Sidebar/
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── services/            # API services
├── types/               # TypeScript types
├── constants/           # Constants
└── styles/              # Global styles
```

### Component Rules
- One component per file
- Component name = file name = folder name
- Export via index.ts
- Co-locate tests and styles

---

## 2. Naming Conventions

### Files
| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `UserProfile.tsx` |
| Hook | camelCase with "use" | `useAuth.ts` |
| Utility | camelCase | `formatDate.ts` |
| Constant | UPPER_SNAKE_CASE file | `API_ENDPOINTS.ts` |
| Type/Interface | PascalCase | `UserTypes.ts` |
| Test | name.test.tsx | `Button.test.tsx` |
| Style | name.styles.ts | `Button.styles.ts` |

### Variables & Functions
```typescript
// Components - PascalCase
const UserCard = () => { };

// Functions - camelCase
const handleSubmit = () => { };
const getUserData = () => { };

// Boolean - is/has/should prefix
const isLoading = true;
const hasError = false;
const shouldRender = true;

// Event handlers - handle prefix
const handleClick = () => { };
const handleInputChange = () => { };

// Constants - UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = "...";
```

---

## 3. React/Component Patterns

### Functional Components (Preferred)
```typescript
// Good
interface UserCardProps {
  user: User;
  onSelect: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  return (
    <div onClick={() => onSelect(user.id)}>
      {user.name}
    </div>
  );
};

export default UserCard;
```

### Hooks Order
```typescript
const MyComponent = () => {
  // 1. State hooks
  const [count, setCount] = useState(0);

  // 2. Context hooks
  const { user } = useAuth();

  // 3. Custom hooks
  const { data, loading } = useFetch('/api/data');

  // 4. Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // 5. Effects
  useEffect(() => { }, []);

  // 6. Callbacks/Memos
  const handleClick = useCallback(() => { }, []);
  const computedValue = useMemo(() => { }, []);

  // 7. Event handlers
  const onSubmit = () => { };

  // 8. Render
  return <div />;
};
```

### Conditional Rendering
```typescript
// Good - Early return
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <Content data={data} />;

// Good - Ternary for simple cases
return isLoggedIn ? <Dashboard /> : <Login />;

// Good - && for presence check
return user && <UserProfile user={user} />;

// Avoid - Nested ternaries
// Bad: condition1 ? a : condition2 ? b : c
```

---

## 4. State Management

### Local State
- Use `useState` for component-specific state
- Use `useReducer` for complex state logic

### Global State
- Use Context for simple global state (theme, auth)
- Use Zustand/Redux for complex state
- Avoid prop drilling beyond 2 levels

### State Rules
```typescript
// Good - Minimal state
const [isOpen, setIsOpen] = useState(false);

// Avoid - Derived state as state
// Bad
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]); // Derived!

// Good - Compute derived values
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
);
```

---

## 5. Styling

### Preferred Approaches (in order)
1. CSS Modules
2. Tailwind CSS
3. Styled-components / Emotion
4. Plain CSS (for simple projects)

### CSS Rules
```css
/* Use semantic class names */
.user-card { }
.user-card__avatar { }
.user-card--highlighted { }

/* Avoid */
.red-text { }
.mt-20 { } /* Unless using utility framework */
```

### Responsive Design
```css
/* Mobile-first approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Standard breakpoints */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
```

---

## 6. Performance

### Optimization Rules
```typescript
// Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Use React.memo for pure components
const UserCard = React.memo(({ user }) => (
  <div>{user.name}</div>
));

// Lazy load routes/components
const Dashboard = React.lazy(() => import('./Dashboard'));
```

### Image Optimization
- Use next/image or similar
- Provide width/height to prevent layout shift
- Use appropriate formats (WebP, AVIF)
- Implement lazy loading

### Bundle Size
- Analyze bundle with webpack-bundle-analyzer
- Tree-shake imports: `import { specific } from 'lib'`
- Code-split by route
- Lazy load heavy libraries

---

## 7. Accessibility (a11y)

### Required Practices
```tsx
// Semantic HTML
<button onClick={handleClick}>Click me</button>  // Good
<div onClick={handleClick}>Click me</div>         // Bad

// Alt text for images
<img src="..." alt="Description of image" />

// Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ARIA when needed
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>

// Focus management
const inputRef = useRef();
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

### Accessibility Checklist
- [ ] Keyboard navigable
- [ ] Screen reader compatible
- [ ] Sufficient color contrast (4.5:1)
- [ ] Focus indicators visible
- [ ] Form errors announced
- [ ] Loading states announced

---

## 8. Forms

### Form Handling
```typescript
// Use form libraries for complex forms
// Recommended: React Hook Form, Formik

// Simple form example
const [email, setEmail] = useState('');
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!email) newErrors.email = 'Required';
  if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    // Submit
  }
};
```

### Validation Rules
- Validate on blur for UX
- Validate on submit for security
- Show inline errors
- Disable submit during processing

---

## 9. Error Handling

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  if (error.status === 404) {
    setError('Not found');
  } else if (error.status === 401) {
    redirectToLogin();
  } else {
    setError('Something went wrong');
    logError(error);
  }
}
```

---

## 10. Testing

### Testing Strategy
| Type | Tool | Coverage |
|------|------|----------|
| Unit | Jest | Utils, hooks |
| Component | React Testing Library | Components |
| Integration | RTL + MSW | Features |
| E2E | Playwright/Cypress | Critical flows |

### Testing Rules
```typescript
// Test behavior, not implementation
// Good
expect(screen.getByText('Welcome')).toBeInTheDocument();

// Bad
expect(component.state.isLoggedIn).toBe(true);

// Use data-testid sparingly
<button data-testid="submit-btn">Submit</button>
```

---

## 11. Security

### Frontend Security
- Sanitize user input before rendering
- Use `textContent` not `innerHTML`
- Validate on server, not just client
- Store tokens in httpOnly cookies (not localStorage)
- Implement CSP headers

### Avoid
```typescript
// Never do this
dangerouslySetInnerHTML={{ __html: userInput }}

// Never store sensitive data in localStorage
localStorage.setItem('authToken', token);
```

---

## 12. Code Quality

### Required Tools
- ESLint with React rules
- Prettier for formatting
- TypeScript strict mode
- Husky for pre-commit hooks

### ESLint Rules (Recommended)
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```
