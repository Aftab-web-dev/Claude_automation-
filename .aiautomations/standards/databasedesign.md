# Database Design Guidelines

Standards for designing robust, scalable, and maintainable databases.

---

## General Principles

### 1. Normalize First, Denormalize When Needed
- Start with 3NF (Third Normal Form)
- Denormalize only for proven performance needs
- Document denormalization decisions

### 2. Plan for Scale
- Consider read/write ratios
- Plan for data growth
- Design for horizontal scaling if needed

### 3. Data Integrity First
- Use constraints
- Use transactions
- Validate at database level

---

## Naming Conventions

### Tables
```
✓ Good:
  users
  orders
  order_items
  user_profiles

✗ Bad:
  tbl_user
  User
  ORDERS
  order-items
```

### Columns
```
✓ Good:
  id
  user_id
  created_at
  updated_at
  is_active
  email_address

✗ Bad:
  ID
  userId
  createdAt
  isactive
  emailAddress
```

### Foreign Keys
```
✓ Good:
  user_id     (references users.id)
  order_id    (references orders.id)
  category_id (references categories.id)

Pattern: {referenced_table_singular}_id
```

### Indexes
```
✓ Good:
  idx_users_email
  idx_orders_user_id
  idx_orders_created_at
  uniq_users_email

Pattern: idx_{table}_{columns}
```

### Constraints
```
✓ Good:
  pk_users                    (primary key)
  fk_orders_user_id          (foreign key)
  uniq_users_email           (unique)
  chk_orders_total_positive  (check)
```

---

## Data Types

### Use Appropriate Types

| Data | Type | Notes |
|------|------|-------|
| ID | UUID or BIGINT | UUID for distributed, BIGINT for single DB |
| Email | VARCHAR(255) | With lowercase constraint |
| URL | VARCHAR(2048) | Maximum URL length |
| Name | VARCHAR(100) | Reasonable limit |
| Description | TEXT | For long text |
| Money | DECIMAL(19,4) | Never use FLOAT |
| Timestamp | TIMESTAMPTZ | Always with timezone |
| Boolean | BOOLEAN | Never use INT for bools |
| JSON | JSONB | PostgreSQL, for flexible data |

### Avoid
- TEXT for everything
- FLOAT for money
- VARCHAR(MAX) without limits
- Storing JSON as TEXT

---

## Standard Columns

### Every Table Should Have
```sql
CREATE TABLE example (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- ... other columns ...
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Optional Standard Columns
```sql
deleted_at TIMESTAMPTZ,     -- Soft delete
created_by UUID,            -- Audit trail
updated_by UUID,            -- Audit trail
version INT DEFAULT 1       -- Optimistic locking
```

---

## Relationships

### One-to-Many
```sql
-- One user has many orders
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    -- ...
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
```

### Many-to-Many
```sql
-- Users can have many roles, roles can have many users
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id),
    role_id UUID NOT NULL REFERENCES roles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id)
);
```

### One-to-One
```sql
-- Each user has one profile
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    bio TEXT,
    avatar_url VARCHAR(2048),
    -- ...
);
```

---

## Indexing Strategy

### When to Index
- Primary keys (automatic)
- Foreign keys (always)
- Columns in WHERE clauses
- Columns in ORDER BY
- Columns in JOIN conditions

### Index Types

| Type | Use Case |
|------|----------|
| B-Tree | Default, general purpose |
| Hash | Exact equality only |
| GIN | Full-text search, JSONB |
| GiST | Geometric, range queries |

### Composite Indexes
```sql
-- Order matters! Most selective first
CREATE INDEX idx_orders_user_status
ON orders(user_id, status);

-- Supports:
-- WHERE user_id = ?
-- WHERE user_id = ? AND status = ?
-- Does NOT support:
-- WHERE status = ?
```

### Partial Indexes
```sql
-- Only index active users
CREATE INDEX idx_users_email_active
ON users(email)
WHERE is_active = true;
```

---

## Constraints

### Primary Key
```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

### Foreign Key
```sql
user_id UUID NOT NULL REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
```

### Unique
```sql
email VARCHAR(255) UNIQUE
-- or
CONSTRAINT uniq_users_email UNIQUE (email)
```

### Check
```sql
CONSTRAINT chk_price_positive CHECK (price > 0)
CONSTRAINT chk_status_valid CHECK (status IN ('pending', 'active', 'completed'))
```

### Not Null
```sql
email VARCHAR(255) NOT NULL
```

---

## Query Patterns

### Pagination
```sql
-- Offset-based (simple, not for large data)
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;

-- Cursor-based (efficient for large data)
SELECT * FROM users
WHERE created_at < '2024-01-01'
ORDER BY created_at DESC
LIMIT 20;
```

### Soft Delete
```sql
-- Soft delete
UPDATE users SET deleted_at = NOW() WHERE id = ?;

-- Query active only
SELECT * FROM users WHERE deleted_at IS NULL;

-- Consider a view
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;
```

### Upsert
```sql
-- PostgreSQL
INSERT INTO users (id, email, name)
VALUES (?, ?, ?)
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;
```

---

## Performance Guidelines

### Do
- Index foreign keys
- Use EXPLAIN ANALYZE
- Limit result sets
- Use connection pooling
- Use prepared statements

### Don't
- SELECT * in production
- N+1 queries
- Cartesian joins
- Functions in WHERE on indexed columns
- Over-index (indexes slow writes)

### Query Optimization Checklist
- [ ] Only select needed columns
- [ ] Use appropriate indexes
- [ ] Avoid subqueries when JOINs work
- [ ] Use LIMIT for pagination
- [ ] Check query plan with EXPLAIN

---

## Migration Guidelines

### Rules
1. Never delete columns/tables without deprecation period
2. Always make migrations reversible
3. Never run long migrations during peak hours
4. Always backup before migrations
5. Test migrations on production-like data

### Safe Migration Pattern
```sql
-- Step 1: Add new column (nullable)
ALTER TABLE users ADD COLUMN new_email VARCHAR(255);

-- Step 2: Backfill data
UPDATE users SET new_email = email WHERE new_email IS NULL;

-- Step 3: Add constraints
ALTER TABLE users ALTER COLUMN new_email SET NOT NULL;

-- Step 4: Remove old column (later release)
ALTER TABLE users DROP COLUMN email;
```

---

## Backup Strategy

### Requirements
- Daily full backups
- Point-in-time recovery capability
- Test restores regularly
- Offsite backup storage
- Encrypted backups

### Retention
- Daily backups: 7 days
- Weekly backups: 4 weeks
- Monthly backups: 12 months
