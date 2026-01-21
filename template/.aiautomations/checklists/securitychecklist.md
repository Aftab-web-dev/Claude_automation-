# Security Checklist

Complete security review before any production release.

---

## 1. Authentication

- [ ] Strong password requirements enforced
- [ ] Password hashing using bcrypt/argon2 (not MD5/SHA1)
- [ ] Account lockout after failed attempts
- [ ] Multi-factor authentication available
- [ ] Session timeout implemented
- [ ] Secure session token generation
- [ ] Session invalidation on logout
- [ ] "Remember me" functionality secure

---

## 2. Authorization

- [ ] Role-based access control (RBAC) implemented
- [ ] Principle of least privilege applied
- [ ] Resource ownership verified before access
- [ ] Admin functions properly protected
- [ ] API endpoints authorization checked
- [ ] No horizontal privilege escalation possible
- [ ] No vertical privilege escalation possible

---

## 3. Input Validation

- [ ] All user input validated server-side
- [ ] Input length limits enforced
- [ ] Input type validation (numbers, emails, etc.)
- [ ] File upload restrictions (type, size)
- [ ] Filename sanitization
- [ ] No direct use of user input in queries/commands

---

## 4. Injection Prevention

### SQL Injection
- [ ] Parameterized queries used
- [ ] ORM used correctly
- [ ] No raw SQL with user input
- [ ] Database user has minimal permissions

### XSS (Cross-Site Scripting)
- [ ] Output encoding implemented
- [ ] Content Security Policy (CSP) headers set
- [ ] HttpOnly flag on session cookies
- [ ] User content sanitized before display

### Command Injection
- [ ] No shell commands with user input
- [ ] If needed, input strictly validated
- [ ] Allowlist approach for commands

### Other Injections
- [ ] LDAP injection prevented
- [ ] XML injection prevented
- [ ] Template injection prevented

---

## 5. Data Protection

### In Transit
- [ ] HTTPS enforced everywhere
- [ ] TLS 1.2+ only
- [ ] HSTS header enabled
- [ ] Certificate valid and not expiring soon

### At Rest
- [ ] Sensitive data encrypted
- [ ] Encryption keys managed securely
- [ ] Database encryption enabled
- [ ] Backups encrypted

### PII/Sensitive Data
- [ ] PII identified and documented
- [ ] Data minimization applied
- [ ] Retention policy defined
- [ ] Deletion mechanism exists

---

## 6. API Security

- [ ] API authentication required
- [ ] API rate limiting enabled
- [ ] API versioning implemented
- [ ] No sensitive data in URLs
- [ ] Proper HTTP methods used
- [ ] CORS configured restrictively
- [ ] API responses don't leak info

---

## 7. Error Handling

- [ ] Generic error messages to users
- [ ] Detailed errors only in logs
- [ ] No stack traces in production
- [ ] Error pages don't reveal tech stack
- [ ] Failed operations logged

---

## 8. Logging & Monitoring

- [ ] Security events logged
- [ ] Authentication attempts logged
- [ ] Authorization failures logged
- [ ] No sensitive data in logs
- [ ] Log tampering prevented
- [ ] Alerting on suspicious activity

---

## 9. Dependencies

- [ ] Dependencies up to date
- [ ] No known vulnerabilities (npm audit, etc.)
- [ ] Unused dependencies removed
- [ ] Lock file committed
- [ ] Dependency sources trusted

---

## 10. Infrastructure

- [ ] Firewall rules minimal
- [ ] Unnecessary ports closed
- [ ] Admin interfaces not public
- [ ] Default credentials changed
- [ ] Security patches applied
- [ ] Secrets not in code/repos

---

## 11. Security Headers

- [ ] Content-Security-Policy
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY/SAMEORIGIN
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy
- [ ] Permissions-Policy

---

## 12. File Security

- [ ] File uploads scanned for malware
- [ ] Uploaded files stored outside webroot
- [ ] File permissions restrictive
- [ ] Directory listing disabled
- [ ] Sensitive files not accessible

---

## 13. Session Management

- [ ] Session IDs regenerated after login
- [ ] Sessions invalidated on password change
- [ ] Concurrent session limits (if needed)
- [ ] Session data validated

---

## 14. CSRF Protection

- [ ] CSRF tokens on state-changing requests
- [ ] SameSite cookie attribute set
- [ ] Origin/Referer validation

---

## 15. Business Logic

- [ ] Rate limiting on sensitive operations
- [ ] Transaction integrity verified
- [ ] Race conditions prevented
- [ ] Negative values handled
- [ ] Boundary conditions tested

---

## Severity Classification

| Finding | Severity | Must Fix Before |
|---------|----------|-----------------|
| SQLi, RCE, Auth Bypass | CRITICAL | Immediately |
| XSS, CSRF, Info Leak | HIGH | Release |
| Missing headers, weak config | MEDIUM | Next sprint |
| Best practice gaps | LOW | Backlog |

---

## Sign-Off

| Role | Name | Date | Findings |
|------|------|------|----------|
| Security Reviewer | | | |
| Developer | | | |

---

## Tools to Run

```bash
# Dependency audit
npm audit
pip-audit
cargo audit

# Static analysis
semgrep --config auto .
bandit -r . (Python)

# Secret scanning
gitleaks detect
trufflehog git file://. --since-commit HEAD~10
```
