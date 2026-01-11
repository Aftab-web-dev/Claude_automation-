# Before Code Checklist

STOP! Before writing ANY code, verify ALL items in this checklist.

---

## 1. Requirements Verification

### Understanding
- [ ] I fully understand WHAT needs to be built
- [ ] I know WHY this feature is needed
- [ ] I know WHO will use this feature
- [ ] I understand the ACCEPTANCE CRITERIA

### Documentation
- [ ] Requirements are documented in `/docs/planning.md`
- [ ] User stories or tickets are clear
- [ ] Edge cases are identified
- [ ] Out-of-scope items are defined

### Clarification
- [ ] All ambiguities have been resolved
- [ ] Stakeholders have approved the approach
- [ ] No assumptions were made without verification

---

## 2. Design Verification

### Architecture
- [ ] I know WHERE this code will live
- [ ] I know HOW it integrates with existing code
- [ ] I have reviewed related existing code
- [ ] Design follows project architecture patterns

### Data Model
- [ ] Data structures are defined
- [ ] Database schema changes are planned
- [ ] Relationships are clear
- [ ] Indexes are considered

### API Design (if applicable)
- [ ] Endpoints are defined
- [ ] Request/response formats are clear
- [ ] Error responses are planned
- [ ] Authentication requirements are known

---

## 3. Technical Verification

### Environment
- [ ] Development environment is working
- [ ] All dependencies are available
- [ ] Database is accessible and migrated
- [ ] External services are available or mocked

### Dependencies
- [ ] Required packages are installed
- [ ] Package versions are compatible
- [ ] No security vulnerabilities in dependencies
- [ ] Licenses are acceptable

### Testing Strategy
- [ ] I know WHAT to test
- [ ] I know HOW to test it
- [ ] Test data is available
- [ ] Testing tools are configured

---

## 4. Security Verification

### Input/Output
- [ ] Input validation approach is planned
- [ ] Output sanitization approach is planned
- [ ] File upload handling is secure (if applicable)

### Authentication/Authorization
- [ ] Auth requirements are clear
- [ ] Permission model is defined
- [ ] Sensitive data handling is planned

### Secrets
- [ ] No secrets will be hardcoded
- [ ] Environment variables are documented
- [ ] Secure credential storage is available

---

## 5. Session Verification

### State Check
- [ ] I have read `.session/state.md`
- [ ] I have read `.session/log.md`
- [ ] I have read `.session/next.md`
- [ ] I know the CURRENT project status

### Continuation
- [ ] I am NOT repeating completed work
- [ ] I am starting from the correct point
- [ ] Previous work is intact

---

## 6. Risk Assessment

### Identified Risks
- [ ] Technical risks are identified
- [ ] Mitigation strategies exist
- [ ] Fallback plans are ready

### Impact Analysis
- [ ] I know what could break
- [ ] Rollback plan exists
- [ ] Critical paths are protected

---

## 7. Final Confirmation

### Ready to Code When:
- [ ] ALL above items are checked
- [ ] No blockers exist
- [ ] Execution plan is clear
- [ ] First step is identified

---

## Quick Reference

### Must Have Before Starting:
1. Clear requirements
2. Approved design
3. Working environment
4. Security plan
5. Testing strategy
6. Current session state

### Red Flags - STOP If:
- Requirements are unclear
- Design is not approved
- Environment is broken
- Security is not considered
- No way to test

---

## Sign-Off

```
Date: ___________
Task: ___________

I confirm all checklist items are complete:

[ ] READY TO START CODING
```
