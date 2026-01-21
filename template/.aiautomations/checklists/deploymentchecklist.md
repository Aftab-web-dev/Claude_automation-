# Deployment Checklist

Complete ALL items before deploying to production.

---

## 1. Pre-Deployment Verification

### Code Quality
- [ ] All tests passing
- [ ] No lint errors
- [ ] No type errors
- [ ] Code review approved
- [ ] No TODO/FIXME in production code

### Build
- [ ] Production build succeeds
- [ ] Build artifacts generated correctly
- [ ] Bundle size within limits
- [ ] No build warnings (or documented exceptions)

### Environment
- [ ] Environment variables configured
- [ ] Secrets stored securely (not in code)
- [ ] Config files updated for production
- [ ] Feature flags set correctly

---

## 2. Security Verification

### Authentication & Authorization
- [ ] Auth endpoints secured
- [ ] Session management proper
- [ ] Password policies enforced
- [ ] API keys rotated if needed

### Data Protection
- [ ] Sensitive data encrypted
- [ ] PII handling compliant
- [ ] SQL injection prevented
- [ ] XSS prevented
- [ ] CSRF protection enabled

### Infrastructure
- [ ] HTTPS enforced
- [ ] Security headers set
- [ ] CORS configured correctly
- [ ] Rate limiting enabled

---

## 3. Database

- [ ] Migrations tested
- [ ] Migrations backed up
- [ ] Rollback plan ready
- [ ] Indexes optimized
- [ ] Connection pooling configured
- [ ] Database backups verified

---

## 4. Performance

- [ ] Load testing completed
- [ ] Response times acceptable
- [ ] Memory usage within limits
- [ ] CPU usage within limits
- [ ] CDN configured (if applicable)
- [ ] Caching strategy implemented

---

## 5. Monitoring & Logging

- [ ] Error tracking configured (Sentry, etc.)
- [ ] Application logs enabled
- [ ] Health check endpoint working
- [ ] Alerting rules set up
- [ ] Metrics collection enabled
- [ ] Dashboard ready

---

## 6. Documentation

- [ ] API documentation updated
- [ ] README updated
- [ ] Changelog updated
- [ ] Deployment notes written
- [ ] Runbook updated

---

## 7. Rollback Plan

- [ ] Previous version tagged
- [ ] Rollback procedure documented
- [ ] Database rollback tested
- [ ] Rollback time estimated
- [ ] Team notified of rollback procedure

---

## 8. Communication

- [ ] Stakeholders notified
- [ ] Deployment window confirmed
- [ ] On-call team aware
- [ ] Status page ready to update
- [ ] Support team briefed

---

## 9. Post-Deployment Verification

### Immediate (within 5 minutes)
- [ ] Application accessible
- [ ] Health checks passing
- [ ] No error spikes
- [ ] Key flows working

### Short-term (within 1 hour)
- [ ] Error rates normal
- [ ] Performance metrics stable
- [ ] User reports monitored
- [ ] Logs reviewed

---

## 10. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Reviewer | | | |
| QA | | | |
| DevOps | | | |

---

## Emergency Contacts

| Role | Contact |
|------|---------|
| On-Call Engineer | |
| DevOps Lead | |
| Product Owner | |

---

## Deployment Command

```bash
# Document your deployment command here
```

## Rollback Command

```bash
# Document your rollback command here
```
