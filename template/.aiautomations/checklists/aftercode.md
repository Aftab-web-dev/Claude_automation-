# After Code Checklist

STOP! Before marking any task complete, verify ALL items.

---

## 1. Code Quality

### Functionality
- [ ] Code compiles without errors
- [ ] Code runs without runtime errors
- [ ] Feature works as specified
- [ ] All acceptance criteria met

### Style
- [ ] Code follows naming conventions
- [ ] Code follows formatting standards
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npm run typecheck`

### Structure
- [ ] Functions are small and focused
- [ ] No excessive nesting
- [ ] No duplicate code
- [ ] Proper separation of concerns

### Readability
- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] No magic numbers/strings
- [ ] Clear variable/function names

---

## 2. Error Handling

### Coverage
- [ ] All error cases are handled
- [ ] Errors are logged appropriately
- [ ] User-friendly error messages
- [ ] No silent failures

### Specific Checks
- [ ] Null/undefined handled
- [ ] Network failures handled
- [ ] Invalid input handled
- [ ] Timeout scenarios handled

---

## 3. Security

### Input Validation
- [ ] ALL inputs are validated
- [ ] Validation is on server-side
- [ ] Proper error messages (not too detailed)

### Injection Prevention
- [ ] SQL injection prevented (parameterized queries)
- [ ] XSS prevented (output escaped)
- [ ] Command injection prevented
- [ ] Path traversal prevented

### Authentication/Authorization
- [ ] Auth checks are in place
- [ ] Permission checks are in place
- [ ] Sensitive routes are protected

### Data Protection
- [ ] No secrets in code
- [ ] Sensitive data not logged
- [ ] Proper encryption used

---

## 4. Testing

### Test Coverage
- [ ] Unit tests written
- [ ] Unit tests pass: `npm run test`
- [ ] Integration tests pass (if applicable)
- [ ] Edge cases tested

### Manual Testing
- [ ] Happy path tested manually
- [ ] Error paths tested manually
- [ ] Browser/client tested (if applicable)

### Test Quality
- [ ] Tests are meaningful (not just coverage)
- [ ] Tests are maintainable
- [ ] No flaky tests

---

## 5. Performance

### Efficiency
- [ ] No obvious performance issues
- [ ] No N+1 queries
- [ ] Proper pagination implemented
- [ ] Large data sets handled

### Resources
- [ ] Memory leaks addressed
- [ ] Connections properly closed
- [ ] Files properly closed
- [ ] Cleanup in place

---

## 6. Documentation

### Code Documentation
- [ ] Public APIs documented
- [ ] Complex logic explained
- [ ] Type definitions complete

### External Documentation
- [ ] README updated (if needed)
- [ ] API docs updated (if needed)
- [ ] Changelog updated (if needed)

---

## 7. Build Verification

### Commands Must Pass
```bash
npm run lint        # ✓ No errors
npm run typecheck   # ✓ No errors
npm run test        # ✓ All pass
npm run build       # ✓ Success
```

### Build Output
- [ ] Build succeeds
- [ ] No new warnings introduced
- [ ] Bundle size acceptable

---

## 8. Session Update

### State Management
- [ ] `.session/state.md` updated
- [ ] `.session/log.md` updated
- [ ] `.session/next.md` updated

### Log Entry Format
```markdown
## [Date]

### Completed
- [What was done]

### Files Changed
- [List of files]

### Decisions Made
- [Any decisions]

### Notes
- [Any important notes]
```

---

## 9. Final Verification

### Checklist Complete When:
- [ ] ALL code quality items checked
- [ ] ALL security items checked
- [ ] ALL tests pass
- [ ] Build succeeds
- [ ] Session updated
- [ ] Feature works end-to-end

---

## Quick Commands

```bash
# Run all checks
npm run lint && npm run typecheck && npm run test && npm run build

# If all pass, code is ready
```

---

## Red Flags - DO NOT Mark Complete If:

- Any test fails
- Build fails
- Linting errors exist
- Type errors exist
- Security checks skipped
- Manual testing skipped
- Session not updated

---

## Sign-Off

```
Date: ___________
Task: ___________
Files Changed: ___________

Verification Results:
- Lint: [ ] Pass [ ] Fail
- Types: [ ] Pass [ ] Fail
- Tests: [ ] Pass [ ] Fail
- Build: [ ] Pass [ ] Fail

[ ] ALL CHECKS PASSED - TASK COMPLETE
```
