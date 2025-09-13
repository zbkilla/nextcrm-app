# NextCRM API Documentation

## Overview
NextCRM provides a comprehensive RESTful API built with Next.js 15 App Router. All API endpoints are secured with NextAuth.js authentication and follow consistent patterns for request/response handling.

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

### Overview
All API endpoints require authentication using NextAuth.js with JWT strategy. The API supports multiple authentication providers:

- **Google OAuth 2.0**
- **GitHub OAuth**
- **Credentials (Email/Password)**

### Authentication Header
```http
Cookie: next-auth.session-token=<session-token>
```

### Session Validation
All protected endpoints validate the session using:
```typescript
const session = await getServerSession(authOptions);
if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
}
```

### Response Codes
- `401 Unauthorized` - Missing or invalid session
- `403 Forbidden` - Insufficient permissions

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

### Streaming Response (AI Endpoints)
AI endpoints return streaming text responses for real-time output.

## Error Handling

### Standard Error Codes
| Code | Description | Common Causes |
|------|-------------|---------------|
| 400 | Bad Request | Missing required fields, invalid data format |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Database errors, external service failures |

### Error Response Format
```json
{
  "error": "Human-readable error message",
  "status": 500
}
```

## API Endpoints

### CRM Module

#### Leads Management

##### Create Lead
```http
POST /api/crm/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "jobTitle": "CEO",
  "leadSource": "Website",
  "status": "NEW",
  "description": "Interested in enterprise plan",
  "assigned_user": "user-id-123"
}
```

**Response:**
```json
{
  "newLead": {
    "id": "lead-id-123",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "NEW",
    "createdAt": "2025-01-13T10:00:00Z"
  }
}
```

##### Update Lead
```http
PUT /api/crm/leads
Content-Type: application/json

{
  "id": "lead-id-123",
  "status": "QUALIFIED",
  "assigned_user": "user-id-456"
}
```

**Response:**
```json
{
  "updatedLead": {
    "id": "lead-id-123",
    "status": "QUALIFIED",
    "updatedAt": "2025-01-13T11:00:00Z"
  }
}
```

##### Get Lead
```http
GET /api/crm/leads/[leadId]
```

**Response:**
```json
{
  "lead": {
    "id": "lead-id-123",
    "name": "John Doe",
    "email": "john@example.com",
    "contacts": [],
    "activities": []
  }
}
```

#### Contacts Management

##### Create Contact
```http
POST /api/crm/contacts
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "accountId": "account-id-123",
  "jobTitle": "CTO",
  "assigned_user": "user-id-123"
}
```

**Response:**
```json
{
  "newContact": {
    "id": "contact-id-123",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "createdAt": "2025-01-13T10:00:00Z"
  }
}
```

##### Update Contact
```http
PUT /api/crm/contacts
Content-Type: application/json

{
  "id": "contact-id-123",
  "email": "newemail@example.com",
  "phone": "+9876543210"
}
```

#### Opportunities Management

##### Create Opportunity
```http
POST /api/crm/opportunity
Content-Type: application/json

{
  "name": "Enterprise Deal Q1",
  "accountId": "account-id-123",
  "amount": 50000,
  "closeDate": "2025-03-31",
  "salesStage": "PROPOSAL",
  "probability": 75,
  "description": "Annual enterprise license"
}
```

##### Get Opportunity
```http
GET /api/crm/opportunity/[opportunityId]
```

##### Update Opportunity
```http
PUT /api/crm/opportunity/[opportunityId]
Content-Type: application/json

{
  "salesStage": "NEGOTIATION",
  "probability": 85,
  "amount": 55000
}
```

##### Delete Opportunity
```http
DELETE /api/crm/opportunity/[opportunityId]
```

### Projects Module

#### Projects Management

##### Create Project
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Website Redesign",
  "description": "Complete redesign of company website",
  "visibility": "PUBLIC",
  "startDate": "2025-01-01",
  "endDate": "2025-06-30"
}
```

**Response:**
```json
{
  "newBoard": {
    "id": "project-id-123",
    "title": "Website Redesign",
    "sections": [
      {
        "id": "section-1",
        "title": "To Do",
        "position": 0
      },
      {
        "id": "section-2",
        "title": "In Progress",
        "position": 1
      },
      {
        "id": "section-3",
        "title": "Done",
        "position": 2
      }
    ]
  }
}
```

##### Update Project
```http
PUT /api/projects
Content-Type: application/json

{
  "id": "project-id-123",
  "title": "Website Redesign v2",
  "endDate": "2025-07-31"
}
```

##### Watch/Unwatch Project
```http
POST /api/projects/[projectId]/watch
POST /api/projects/[projectId]/unwatch
```

#### Tasks Management

##### Create Task
```http
POST /api/projects/tasks/create-task
Content-Type: application/json

{
  "title": "Design homepage mockup",
  "description": "Create initial design concepts",
  "boardId": "project-id-123",
  "sectionId": "section-1",
  "priority": "HIGH",
  "dueDate": "2025-01-20",
  "assigned_user": "user-id-123"
}
```

##### Update Task
```http
PUT /api/projects/tasks/update-task/[taskId]
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "IN_PROGRESS",
  "priority": "URGENT"
}
```

##### Delete Task
```http
DELETE /api/projects/tasks
Content-Type: application/json

{
  "id": "task-id-123"
}
```

**Note:** Deleting a task also removes all associated comments and reorders remaining tasks.

##### Update Task Position (Kanban)
```http
PUT /api/projects/tasks
Content-Type: application/json

{
  "id": "task-id-123",
  "sectionId": "section-2",
  "position": 3
}
```

##### Mark Task as Done
```http
PUT /api/projects/tasks/mark-task-as-done/[taskId]
```

##### Add Comment to Task
```http
POST /api/projects/tasks/addCommentToTask/[taskId]
Content-Type: application/json

{
  "comment": "This looks great! Minor adjustments needed."
}
```

#### Sections Management

##### Create Section
```http
POST /api/projects/sections/[boardId]
Content-Type: application/json

{
  "title": "Review",
  "position": 3
}
```

##### Update Section Title
```http
PUT /api/projects/sections/update-title/[sectionId]
Content-Type: application/json

{
  "title": "Quality Assurance"
}
```

##### Delete Section
```http
DELETE /api/projects/sections/delete-section/[sectionId]
```

### User Management

#### Get All Users
```http
GET /api/user
```

**Response:**
```json
{
  "users": [
    {
      "id": "user-1",
      "name": "Admin User",
      "email": "admin@example.com",
      "userRole": "ADMIN",
      "userStatus": "ACTIVE"
    },
    {
      "id": "user-2",
      "name": "John Doe",
      "email": "john@example.com",
      "userRole": "USER",
      "userStatus": "ACTIVE"
    }
  ]
}
```

#### Create User (Registration)
```http
POST /api/user
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "language": "en"
}
```

**Response:**
```json
{
  "newUser": {
    "id": "user-id-123",
    "name": "New User",
    "email": "newuser@example.com",
    "userRole": "USER",
    "userStatus": "PENDING"
  }
}
```

**Note:** The first registered user automatically becomes an admin.

#### Invite User
```http
POST /api/user/inviteuser
Content-Type: application/json

{
  "email": "invite@example.com",
  "role": "USER"
}
```

### Document Management

#### Upload Document
```http
POST /api/upload
Content-Type: multipart/form-data

file: <binary>
userId: user-id-123
module: "CRM"
recordId: "contact-id-123"
```

**Response:**
```json
{
  "document": {
    "id": "doc-id-123",
    "fileName": "contract.pdf",
    "fileSize": 2048000,
    "mimeType": "application/pdf",
    "url": "https://storage.example.com/documents/doc-id-123.pdf"
  }
}
```

#### Get Document
```http
GET /api/documents/[documentId]
```

#### Delete Document
```http
DELETE /api/documents/[documentId]
```

**Note:** This removes the document from both the database and cloud storage.

### Invoice Management

#### Get Invoice
```http
GET /api/invoice/[invoiceId]
```

**Response:**
```json
{
  "invoice": {
    "id": "invoice-id-123",
    "invoiceNumber": "INV-2025-001",
    "partnerId": "partner-id-123",
    "amount": 5000,
    "currency": "USD",
    "status": "PENDING",
    "items": [
      {
        "description": "Consulting Services",
        "quantity": 10,
        "unitPrice": 500,
        "total": 5000
      }
    ]
  }
}
```

#### Delete Invoice
```http
DELETE /api/invoice/[invoiceId]
```

### AI & Automation

#### OpenAI Completion (Streaming)
```http
POST /api/openai/completion
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "Generate a project summary for Q1 2025"
    }
  ],
  "model": "gpt-4",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Response:** Streaming text response

#### Full-Text Search
```http
POST /api/fulltext-search
Content-Type: application/json

{
  "query": "website redesign",
  "modules": ["projects", "tasks", "documents"],
  "limit": 20
}
```

**Response:**
```json
{
  "data": [
    {
      "type": "project",
      "id": "project-id-123",
      "title": "Website Redesign",
      "description": "Complete redesign of company website",
      "score": 0.95
    },
    {
      "type": "task",
      "id": "task-id-456",
      "title": "Homepage redesign mockup",
      "projectId": "project-id-123",
      "score": 0.87
    }
  ]
}
```

### Email Management

#### Send Email
```http
POST /api/emails/send
Content-Type: application/json

{
  "to": ["recipient@example.com"],
  "subject": "Project Update",
  "template": "project-notification",
  "data": {
    "projectName": "Website Redesign",
    "status": "On Track",
    "completionPercentage": 45
  }
}
```

### External Integrations

#### Rossum OCR Processing
```http
POST /api/rossum/upload
Content-Type: multipart/form-data

file: <binary>
queueId: "queue-id-123"
```

**Response:**
```json
{
  "annotationId": "annotation-id-123",
  "status": "processing",
  "extractedData": null
}
```

#### Get Rossum Results
```http
GET /api/rossum/annotation/[annotationId]
```

**Response:**
```json
{
  "status": "completed",
  "extractedData": {
    "invoiceNumber": "INV-2025-001",
    "vendor": "Acme Corp",
    "amount": 5000,
    "dueDate": "2025-02-15",
    "lineItems": [...]
  }
}
```

## Webhooks

### Available Webhooks

#### Task Assignment
Triggered when a task is assigned to a user.
```json
{
  "event": "task.assigned",
  "data": {
    "taskId": "task-id-123",
    "assignedTo": "user-id-456",
    "assignedBy": "user-id-789",
    "timestamp": "2025-01-13T10:00:00Z"
  }
}
```

#### Lead Status Change
Triggered when a lead status changes.
```json
{
  "event": "lead.status_changed",
  "data": {
    "leadId": "lead-id-123",
    "oldStatus": "NEW",
    "newStatus": "QUALIFIED",
    "changedBy": "user-id-456",
    "timestamp": "2025-01-13T10:00:00Z"
  }
}
```

## Rate Limiting

### Default Limits
- **Standard endpoints**: 100 requests per minute
- **Search endpoints**: 20 requests per minute
- **AI endpoints**: 10 requests per minute
- **File upload**: 10 requests per minute, max 50MB per file

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705145600
```

## Pagination

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `sort` - Sort field (e.g., "createdAt")
- `order` - Sort order ("asc" or "desc")

### Example Request
```http
GET /api/projects/tasks?page=2&limit=20&sort=createdAt&order=desc
```

### Paginated Response
```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
```

## Filtering & Searching

### Filter Parameters
Use query parameters for filtering:
```http
GET /api/crm/leads?status=QUALIFIED&assignedUser=user-id-123
```

### Search Query
For text search across fields:
```http
GET /api/crm/contacts?search=john&fields=name,email,phone
```

## Batch Operations

### Batch Delete
```http
DELETE /api/projects/tasks/batch
Content-Type: application/json

{
  "ids": ["task-1", "task-2", "task-3"]
}
```

### Batch Update
```http
PUT /api/projects/tasks/batch
Content-Type: application/json

{
  "ids": ["task-1", "task-2"],
  "update": {
    "status": "COMPLETED",
    "completedAt": "2025-01-13T10:00:00Z"
  }
}
```

## File Uploads

### Supported Formats
- Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- Images: JPG, JPEG, PNG, GIF, SVG, WEBP
- Archives: ZIP, RAR, 7Z
- Text: TXT, CSV, JSON, XML

### Upload Limits
- Maximum file size: 50MB
- Maximum files per request: 10
- Total storage quota per user: 5GB

### Multipart Upload Example
```javascript
const formData = new FormData();
formData.append('file', fileBlob, 'document.pdf');
formData.append('metadata', JSON.stringify({
  module: 'CRM',
  recordId: 'contact-123',
  tags: ['contract', 'important']
}));

fetch('/api/upload', {
  method: 'POST',
  body: formData,
  credentials: 'include'
});
```

## Testing

### Test Environment
```
Base URL: http://localhost:3000/api
Test Credentials: test@example.com / TestPassword123
```

### Postman Collection
Import the Postman collection from `/docs/api/nextcrm.postman_collection.json`

### cURL Examples

#### Authentication
```bash
# Get session token
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPassword123"}'
```

#### Create Lead
```bash
curl -X POST http://localhost:3000/api/crm/leads \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "name": "Test Lead",
    "email": "lead@example.com",
    "status": "NEW"
  }'
```

## SDK Examples

### JavaScript/TypeScript
```typescript
class NextCRMClient {
  constructor(private baseURL: string, private sessionToken: string) {}

  async createLead(data: CreateLeadData) {
    const response = await fetch(`${this.baseURL}/crm/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `next-auth.session-token=${this.sessionToken}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
}

// Usage
const client = new NextCRMClient('http://localhost:3000/api', 'session-token');
const lead = await client.createLead({
  name: 'John Doe',
  email: 'john@example.com',
  status: 'NEW'
});
```

### Python
```python
import requests

class NextCRMClient:
    def __init__(self, base_url, session_token):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.cookies.set('next-auth.session-token', session_token)
    
    def create_lead(self, data):
        response = self.session.post(
            f"{self.base_url}/crm/leads",
            json=data
        )
        response.raise_for_status()
        return response.json()

# Usage
client = NextCRMClient('http://localhost:3000/api', 'session-token')
lead = client.create_lead({
    'name': 'John Doe',
    'email': 'john@example.com',
    'status': 'NEW'
})
```

## Migration & Versioning

### API Versioning
Currently, the API is at version 1 (implicit). Future versions will use:
```
/api/v2/endpoint
```

### Deprecation Policy
- Deprecated endpoints will be marked with `X-Deprecated: true` header
- Minimum 3-month notice before removal
- Migration guides provided for breaking changes

## Support & Resources

### Documentation
- API Documentation: `/docs/api/`
- OpenAPI Spec: `/docs/api/openapi.yaml`
- Postman Collection: `/docs/api/postman.json`

### Error Reporting
For API issues, include:
- Request method and endpoint
- Request headers (excluding auth tokens)
- Request body (sanitized)
- Response status and body
- Timestamp

### Contact
- GitHub Issues: [github.com/yourorg/nextcrm/issues](https://github.com/yourorg/nextcrm/issues)
- API Support: api-support@nextcrm.io

---

*Last Updated: January 2025 | API Version: 1.0 | NextCRM v0.0.3-beta*

✓ **API Documentation Complete**