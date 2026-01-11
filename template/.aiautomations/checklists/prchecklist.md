# Pull Request / Feature Complete Checklist

Before marking a feature/PR as complete, verify ALL items.

---

## 1. Code Complete

### All Tasks Done
- [ ] All planned tasks completed
- [ ] All subtasks completed
- [ ] No TODO comments left in code
- [ ] No FIXME comments left in code

### Quality Gates Passed
- [ ] `npm run lint` - No errors
- [ ] `npm run typecheck` - No errors
- [ ] `npm run test` - All tests pass
- [ ] `npm run build` - Build succeeds

---

## 2. Testing Complete

### Automated Tests
- [ ] Unit tests written for new code
- [ ] Integration tests written (if needed)
- [ ] E2E tests written (if needed)
- [ ] Test coverage meets minimum (80%)

### Manual Testing
- [ ] Happy path tested
- [ ] Edge cases tested
- [ ] Error scenarios tested
- [ ] Different browsers tested (if frontend)
- [ ] Different screen sizes tested (if frontend)
- [ ] API tested with different inputs (if backend)

### Regression Testing
- [ ] Existing features still work
- [ ] No new bugs introduced
- [ ] Performance not degraded

---

## 3. Security Review

### Code Security
- [ ] Input validation on all endpoints
- [ ] Output properly escaped
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] No hardcoded secrets

### Auth & Access
- [ ] Authentication properly implemented
- [ ] Authorization properly implemented
- [ ] Sensitive routes protected
- [ ] Rate limiting in place (if applicable)

### Data Security
- [ ] Sensitive data encrypted
- [ ] PII properly handled
- [ ] Logs don't contain secrets
- [ ] Error messages don't leak info

---

## 4. Documentation Complete

### Code Documentation
- [ ] Public APIs documented
- [ ] Complex functions documented
- [ ] Types/interfaces documented
- [ ] README updated (if needed)

### API Documentation
- [ ] OpenAPI/Swagger updated
- [ ] Request/response examples
- [ ] Error codes documented
- [ ] Authentication documented

### User Documentation
- [ ] User guide updated (if needed)
- [ ] Release notes prepared
- [ ] Migration guide (if breaking changes)

---

## 5. Database Changes

### Schema Changes
- [ ] Migrations created
- [ ] Migrations are reversible
- [ ] Migrations tested
- [ ] Data backfill planned (if needed)

### Performance
- [ ] Indexes added for new queries
- [ ] Query performance tested
- [ ] No N+1 queries

---

## 6. Deployment Ready

### Configuration
- [ ] Environment variables documented
- [ ] Config changes documented
- [ ] Feature flags set (if applicable)

### Infrastructure
- [ ] No infrastructure changes needed
- [ ] OR infrastructure changes documented
- [ ] OR infrastructure changes deployed

### Rollback Plan
- [ ] Rollback procedure documented
- [ ] Database rollback tested
- [ ] Feature can be disabled if needed

---

## 7. Communication

### Team Communication
- [ ] PR description is clear
- [ ] Breaking changes highlighted
- [ ] Reviewers assigned
- [ ] Stakeholders notified

### PR Description Template
```markdown
## Summary
[Brief description of changes]

## Changes
- [Change 1]
- [Change 2]

## Testing Done
- [Test 1]
- [Test 2]

## Screenshots (if UI changes)
[Screenshots]

## Breaking Changes
[None / List of breaking changes]

## Deployment Notes
[None / Special deployment instructions]

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Security reviewed
```

---

## 8. Session Updated

### Session Files
- [ ] `.session/state.md` reflects completion
- [ ] `.session/log.md` has completion entry
- [ ] `.session/next.md` updated with next steps

### Completion Log Format
```markdown
## [Date] - Feature Complete: [Feature Name]

### Completed Items
- [List of completed items]

### Files Changed
- [List of files]

### Testing Summary
- Unit Tests: X passed
- Integration Tests: X passed
- Manual Testing: Completed

### Known Issues
- [None / List of known issues]

### Next Steps
- [What comes next]
```

---

## 9. Final Review

### Self-Review
- [ ] I have reviewed my own code
- [ ] I would approve this if reviewing
- [ ] Code is clean and maintainable
- [ ] No shortcuts taken

### Peer Review
- [ ] Code reviewed by at least 1 other person
- [ ] Review comments addressed
- [ ] Reviewer approved

---

## Quick Reference

### Must Pass Before Merge:
1. All quality gates (lint, types, tests, build)
2. Security review complete
3. Documentation updated
4. Tests comprehensive
5. Code reviewed and approved

### Red Flags - DO NOT Merge:
- Any test fails
- Build fails
- Security issues found
- Missing documentation
- No code review
- Session not updated

---

## Sign-Off

```
Feature: ___________
Date: ___________
Author: ___________

Quality Gates:
- [ ] Lint: Pass
- [ ] Types: Pass
- [ ] Tests: Pass
- [ ] Build: Pass

Reviews:
- [ ] Self-review: Complete
- [ ] Peer review: Approved by ___________

Final Checks:
- [ ] Security reviewed
- [ ] Documentation complete
- [ ] Session updated

[ ] FEATURE COMPLETE - READY TO MERGE
```
