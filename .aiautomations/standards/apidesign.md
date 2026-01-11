# API Design Guidelines

Standards for designing consistent, secure, and developer-friendly APIs.

---

## REST API Principles

### 1. Use Nouns, Not Verbs
```
✓ Good:
  GET    /users
  POST   /users
  GET    /users/{id}
  PUT    /users/{id}
  DELETE /users/{id}

✗ Bad:
  GET    /getUsers
  POST   /createUser
  GET    /getUserById
```

### 2. Use Plural Nouns
```
✓ Good:
  /users
  /products
  /orders

✗ Bad:
  /user
  /product
  /order
```

### 3. Use HTTP Methods Correctly

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Read resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Replace resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Remove resource | Yes | No |

---

## URL Structure

### Hierarchy
```
/users/{userId}/orders/{orderId}/items/{itemId}
```

### Query Parameters for Filtering
```
GET /users?status=active&role=admin
GET /products?category=electronics&minPrice=100
```

### Query Parameters for Pagination
```
GET /users?page=1&limit=20
GET /users?offset=0&limit=20
GET /users?cursor=abc123&limit=20
```

### Query Parameters for Sorting
```
GET /users?sort=createdAt&order=desc
GET /users?sort=-createdAt,+name
```

### Query Parameters for Field Selection
```
GET /users?fields=id,name,email
```

---

## Request/Response Format

### Request Headers
```
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
X-Request-ID: <uuid>
```

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### List Response
```json
{
  "success": true,
  "data": [
    { "id": "1", "name": "Item 1" },
    { "id": "2", "name": "Item 2" }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

---

## HTTP Status Codes

### Success Codes

| Code | When to Use |
|------|-------------|
| 200 OK | Successful GET, PUT, PATCH, DELETE |
| 201 Created | Successful POST that creates resource |
| 204 No Content | Successful DELETE with no response body |

### Client Error Codes

| Code | When to Use |
|------|-------------|
| 400 Bad Request | Invalid syntax, validation error |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Authenticated but not authorized |
| 404 Not Found | Resource doesn't exist |
| 409 Conflict | Resource conflict (duplicate, etc.) |
| 422 Unprocessable | Valid syntax but semantic error |
| 429 Too Many Requests | Rate limit exceeded |

### Server Error Codes

| Code | When to Use |
|------|-------------|
| 500 Internal Server Error | Unexpected server error |
| 502 Bad Gateway | Upstream service error |
| 503 Service Unavailable | Server temporarily unavailable |
| 504 Gateway Timeout | Upstream timeout |

---

## Error Codes

### Standard Error Codes
```
VALIDATION_ERROR      - Input validation failed
AUTHENTICATION_ERROR  - Auth required or invalid
AUTHORIZATION_ERROR   - Permission denied
NOT_FOUND            - Resource not found
CONFLICT             - Resource conflict
RATE_LIMIT_EXCEEDED  - Too many requests
INTERNAL_ERROR       - Server error
SERVICE_UNAVAILABLE  - Temporary unavailable
```

---

## Versioning

### URL Path Versioning (Preferred)
```
https://api.example.com/v1/users
https://api.example.com/v2/users
```

### Header Versioning
```
Accept: application/vnd.example.v1+json
```

### Rules
- Never break existing versions
- Deprecate with notice period
- Document changes between versions

---

## Authentication

### JWT Token
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### API Key
```
X-API-Key: your-api-key
```

### OAuth2
```
Authorization: Bearer <access_token>
```

---

## Rate Limiting

### Response Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000
```

### 429 Response
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

---

## Pagination

### Offset-Based (Simple)
```
GET /users?page=2&limit=20

Response:
{
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Cursor-Based (For Large Data)
```
GET /users?cursor=abc123&limit=20

Response:
{
  "data": [...],
  "meta": {
    "nextCursor": "xyz789",
    "hasMore": true
  }
}
```

---

## Validation

### Input Validation Rules
- Validate all inputs
- Return specific error messages
- Validate types, ranges, formats
- Sanitize before use

### Common Validations
```
email     → Valid email format
password  → Min 8 chars, complexity rules
phone     → Valid phone format
url       → Valid URL format
uuid      → Valid UUID format
date      → Valid ISO 8601 date
```

---

## Security

### Required Headers
```
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

### CORS Configuration
```
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Input Sanitization
- Escape HTML entities
- Validate content types
- Limit request size
- Timeout long requests

---

## Documentation

### Required Documentation
- OpenAPI/Swagger specification
- Authentication guide
- Error code reference
- Rate limit details
- Changelog

### Example OpenAPI
```yaml
openapi: 3.0.0
info:
  title: API Name
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: Success
```
