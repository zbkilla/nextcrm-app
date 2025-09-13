# NextCRM External API Documentation

## Overview
NextCRM integrates with multiple external services to provide comprehensive functionality including AI capabilities, email services, file storage, OCR processing, and authentication. This document details all external API integrations, their configuration, and usage patterns.

## Table of Contents
1. [AI Services](#ai-services)
2. [Email Services](#email-services)
3. [File Storage Services](#file-storage-services)
4. [Document Processing](#document-processing)
5. [Authentication Providers](#authentication-providers)
6. [Knowledge Management](#knowledge-management)
7. [Environment Configuration](#environment-configuration)
8. [Security Best Practices](#security-best-practices)

## AI Services

### OpenAI Integration

#### Overview
OpenAI powers AI features including chat completions, content generation, and intelligent assistance throughout the application.

#### Configuration
```env
# System-wide API key (optional)
OPEN_AI_API_KEY=sk-...
OPEN_AI_ORGANIZATION_ID=org-...

# Public API key for client-side (optional)
NEXT_PUBLIC_OPENAI_API_KEY=sk-...
```

#### Authentication Methods
1. **System-wide API Key**: Configured in environment variables
2. **User-specific API Key**: Stored in `systemServices` table
3. **Fallback Chain**: User key → System key → Error

#### API Implementation
```typescript
// lib/openai.ts
import OpenAI from "openai";

export async function getOpenAIClient(userId?: string) {
  // Check for user-specific key first
  if (userId) {
    const userKey = await getUserApiKey(userId);
    if (userKey) {
      return new OpenAI({ apiKey: userKey });
    }
  }
  
  // Fall back to system key
  if (process.env.OPEN_AI_API_KEY) {
    return new OpenAI({ 
      apiKey: process.env.OPEN_AI_API_KEY,
      organization: process.env.OPEN_AI_ORGANIZATION_ID
    });
  }
  
  throw new Error("No OpenAI API key configured");
}
```

#### Available Models
- GPT-4
- GPT-4 Turbo
- GPT-3.5 Turbo
- Custom fine-tuned models (user-specific)

#### Usage Examples

##### Chat Completion
```typescript
// API endpoint: /api/openai/create-chat-completion
const response = await fetch('/api/openai/create-chat-completion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Generate a project summary.' }
    ],
    model: 'gpt-4',
    temperature: 0.7,
    max_tokens: 1000
  })
});

const stream = response.body;
// Handle streaming response
```

##### AI Task Summary
```typescript
// Automated daily task summaries
const summary = await generateTaskSummary({
  userId: 'user-123',
  tasks: todaysTasks,
  model: 'gpt-3.5-turbo'
});
```

#### Rate Limits
- **Requests per minute**: Based on OpenAI tier
- **Tokens per minute**: Based on OpenAI tier
- **Concurrent requests**: 50 (default)

## Email Services

### Resend (Primary Email Service)

#### Overview
Resend is the primary transactional email service for sending notifications, invitations, and system emails.

#### Configuration
```env
RESEND_API_KEY=re_...
```

#### Implementation
```typescript
// lib/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
  text
}: EmailOptions) {
  const { data, error } = await resend.emails.send({
    from: 'NextCRM <noreply@nextcrm.io>',
    to,
    subject,
    react, // React Email component
    text   // Plain text fallback
  });
  
  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
  
  return data;
}
```

#### Email Templates
Using React Email components:
```typescript
// emails/InviteUserEmail.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export function InviteUserEmail({
  inviteLink,
  invitedByUsername,
  invitedByEmail,
  teamName,
}) {
  return (
    <Html>
      <Head />
      <Preview>You've been invited to join {teamName}</Preview>
      <Body>
        <Container>
          <Section>
            <Text>Hi there,</Text>
            <Text>
              {invitedByUsername} ({invitedByEmail}) has invited you to join
              {teamName} on NextCRM.
            </Text>
            <Button href={inviteLink}>
              Accept Invitation
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

#### Supported Email Types
- User invitations
- Password reset
- Task assignments
- Lead notifications
- Project updates
- System alerts
- Admin broadcasts

### SMTP (Fallback Email Service)

#### Configuration
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=noreply@nextcrm.io
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

#### Implementation
```typescript
// lib/sendmail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMailFallback(options: MailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...options
    });
    return info;
  } catch (error) {
    console.error('[SMTP_ERROR]', error);
    throw error;
  }
}
```

### IMAP (Email Processing)

#### Configuration
```env
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=invoice@nextcrm.io
IMAP_PASSWORD=your-app-password
```

#### Usage: Invoice Email Processing
```typescript
// Process unread emails for invoices
import Imap from 'imap';
import { simpleParser } from 'mailparser';

const imap = new Imap({
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASSWORD,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  tls: true,
});

// Fetch unseen emails
imap.search(['UNSEEN'], (err, results) => {
  // Process each email
  results.forEach(async (uid) => {
    const email = await fetchEmail(uid);
    const attachments = await extractAttachments(email);
    
    // Process PDF invoices
    for (const attachment of attachments) {
      if (attachment.contentType === 'application/pdf') {
        await processInvoice(attachment);
      }
    }
  });
});
```

## File Storage Services

### UploadThing

#### Overview
UploadThing provides managed file uploads with automatic optimization and CDN delivery.

#### Configuration
```env
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
```

#### File Routes Configuration
```typescript
// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Image uploader for avatars
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await updateUserAvatar(metadata.userId, file.url);
    }),

  // PDF uploader for documents
  pdfUploader: f({ pdf: { maxFileSize: "16MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await createDocument({
        userId: metadata.userId,
        fileName: file.name,
        fileUrl: file.url,
        fileSize: file.size,
      });
    }),

  // General document uploader
  documentUploader: f({
    pdf: { maxFileSize: "16MB" },
    "application/msword": { maxFileSize: "16MB" },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "16MB" },
  })
    .middleware(validateUser)
    .onUploadComplete(handleDocumentUpload),
} satisfies FileRouter;
```

#### Client-Side Upload
```typescript
import { useUploadThing } from "@/lib/uploadthing";

function UploadButton() {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload complete:", res);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
    },
  });

  return (
    <button
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
          const file = e.target.files?.[0];
          if (file) startUpload([file]);
        };
        input.click();
      }}
      disabled={isUploading}
    >
      {isUploading ? "Uploading..." : "Upload Image"}
    </button>
  );
}
```

### DigitalOcean Spaces (S3-Compatible)

#### Configuration
```env
DO_ENDPOINT=https://fra1.digitaloceanspaces.com
DO_REGION=fra1
DO_BUCKET=nextcrm-invoices
DO_ACCESS_KEY_ID=...
DO_ACCESS_KEY_SECRET=...
```

#### Implementation
```typescript
// lib/digital-ocean-s3.ts
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: process.env.DO_ENDPOINT,
  region: process.env.DO_REGION,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY_ID!,
    secretAccessKey: process.env.DO_ACCESS_KEY_SECRET!,
  },
});

// Upload file
export async function uploadToSpaces(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType: string
) {
  const command = new PutObjectCommand({
    Bucket: process.env.DO_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: "public-read", // Make publicly accessible
  });

  const response = await s3Client.send(command);
  const publicUrl = `${process.env.DO_ENDPOINT}/${process.env.DO_BUCKET}/${key}`;
  
  return { response, publicUrl };
}

// Delete file
export async function deleteFromSpaces(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.DO_BUCKET,
    Key: key,
  });

  return await s3Client.send(command);
}
```

#### Usage: Invoice Storage
```typescript
// Store invoice PDF
const invoiceKey = `invoices/${year}/${month}/INV-${invoiceNumber}.pdf`;
const { publicUrl } = await uploadToSpaces(
  invoiceKey,
  pdfBuffer,
  'application/pdf'
);

// Save URL to database
await prisma.invoice.update({
  where: { id: invoiceId },
  data: { pdfUrl: publicUrl }
});
```

## Document Processing

### Rossum (AI-Powered OCR)

#### Overview
Rossum provides intelligent document processing with OCR and data extraction capabilities, primarily used for invoice processing.

#### Configuration
```env
ROSSUM_API_URL=https://api.elis.rossum.ai/v1
ROSSUM_QUEUE_ID=...
ROSSUM_USER=your-email@example.com
ROSSUM_PASS=your-password
```

#### Authentication Flow
```typescript
// lib/get-rossum-token.ts
export async function getRossumToken() {
  const response = await fetch(`${process.env.ROSSUM_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.ROSSUM_USER,
      password: process.env.ROSSUM_PASS,
    }),
  });

  const { key } = await response.json();
  return key;
}
```

#### Document Upload & Processing
```typescript
// Upload document for processing
export async function uploadToRossum(file: File) {
  const token = await getRossumToken();
  const formData = new FormData();
  formData.append('content', file);
  formData.append('queue', process.env.ROSSUM_QUEUE_ID!);

  const response = await fetch(`${process.env.ROSSUM_API_URL}/documents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const annotation = await response.json();
  return annotation;
}

// Get processed results
export async function getRossumResults(annotationId: string) {
  const token = await getRossumToken();
  
  const response = await fetch(
    `${process.env.ROSSUM_API_URL}/annotations/${annotationId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  
  // Extract invoice data
  return {
    invoiceNumber: data.content.invoice_id,
    vendor: data.content.vendor_name,
    amount: data.content.amount_total,
    currency: data.content.currency,
    dueDate: data.content.date_due,
    lineItems: data.content.line_items,
  };
}
```

#### Webhook Integration
```typescript
// Handle Rossum webhook for processing completion
export async function POST(request: Request) {
  const { event, annotation } = await request.json();
  
  if (event === 'annotation.content.export') {
    // Document processing complete
    const invoiceData = extractInvoiceData(annotation);
    
    // Save to database
    await prisma.invoice.create({
      data: {
        ...invoiceData,
        rossumAnnotationId: annotation.id,
        status: 'PROCESSED',
      },
    });
    
    // Notify user
    await sendNotification(annotation.document.user_id, {
      type: 'INVOICE_PROCESSED',
      invoiceId: annotation.id,
    });
  }
  
  return NextResponse.json({ received: true });
}
```

## Authentication Providers

### Google OAuth 2.0

#### Configuration
```env
GOOGLE_ID=...apps.googleusercontent.com
GOOGLE_SECRET=GOCSPX-...
```

#### NextAuth.js Configuration
```typescript
// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Auto-create user on first sign-in
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! }
      });
      
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image,
            provider: 'google',
          }
        });
      }
      
      return true;
    }
  }
};
```

### GitHub OAuth

#### Configuration
```env
GITHUB_ID=...
GITHUB_SECRET=...
```

#### NextAuth.js Configuration
```typescript
import GitHubProvider from "next-auth/providers/github";

GitHubProvider({
  clientId: process.env.GITHUB_ID!,
  clientSecret: process.env.GITHUB_SECRET!,
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
    };
  },
})
```

### Credentials Provider

#### Implementation
```typescript
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Invalid credentials");
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email }
    });

    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };
  }
})
```

## Knowledge Management

### Notion API Integration

#### Overview
Allows users to connect their personal Notion workspaces as a "second brain" knowledge base.

#### User Configuration
Users provide their own Notion API keys and database IDs:

```typescript
// User settings interface
interface NotionConnection {
  userId: string;
  apiKey: string; // Encrypted in database
  databaseId: string;
  isActive: boolean;
}
```

#### Implementation
```typescript
// lib/notion.ts
import { Client } from "@notionhq/client";

export async function getUserNotionClient(userId: string) {
  const connection = await prisma.secondBrain_notions.findFirst({
    where: { userId, isActive: true }
  });

  if (!connection) {
    throw new Error("No active Notion connection");
  }

  // Decrypt API key
  const apiKey = decrypt(connection.apiKey);
  
  return new Client({
    auth: apiKey,
  });
}

// Fetch Notion database items
export async function getNotionItems(userId: string, filters?: any) {
  const notion = await getUserNotionClient(userId);
  const connection = await getNotionConnection(userId);

  const response = await notion.databases.query({
    database_id: connection.databaseId,
    filter: filters,
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });

  return response.results;
}

// Create Notion page
export async function createNotionPage(
  userId: string,
  properties: any
) {
  const notion = await getUserNotionClient(userId);
  const connection = await getNotionConnection(userId);

  const response = await notion.pages.create({
    parent: { database_id: connection.databaseId },
    properties,
  });

  return response;
}
```

#### Usage Example
```typescript
// Sync CRM contacts to Notion
async function syncContactsToNotion(userId: string) {
  const contacts = await prisma.crm_Contacts.findMany({
    where: { userId }
  });

  for (const contact of contacts) {
    await createNotionPage(userId, {
      Name: {
        title: [{ text: { content: contact.name } }]
      },
      Email: {
        email: contact.email
      },
      Company: {
        rich_text: [{ text: { content: contact.company || "" } }]
      },
      Tags: {
        multi_select: [{ name: "CRM" }, { name: "Contact" }]
      }
    });
  }
}
```

## Environment Configuration

### Required Environment Variables

```env
# Database
DATABASE_URL=mongodb+srv://...

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
JWT_SECRET=...

# OAuth Providers
GOOGLE_ID=...
GOOGLE_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...

# OpenAI
OPEN_AI_API_KEY=sk-...
OPEN_AI_ORGANIZATION_ID=org-...

# Email Services
RESEND_API_KEY=re_...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_FROM=noreply@nextcrm.io
EMAIL_USERNAME=...
EMAIL_PASSWORD=...

# IMAP (Invoice Processing)
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=...
IMAP_PASSWORD=...

# File Storage
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...
DO_ENDPOINT=https://fra1.digitaloceanspaces.com
DO_REGION=fra1
DO_BUCKET=nextcrm-invoices
DO_ACCESS_KEY_ID=...
DO_ACCESS_KEY_SECRET=...

# Rossum OCR
ROSSUM_API_URL=https://api.elis.rossum.ai/v1
ROSSUM_QUEUE_ID=...
ROSSUM_USER=...
ROSSUM_PASS=...
```

### Environment-Specific Configuration

#### Development (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
# Use test/sandbox API keys
RESEND_API_KEY=re_test_...
```

#### Staging (.env.staging)
```env
NEXTAUTH_URL=https://staging.nextcrm.io
# Use staging API keys
```

#### Production (.env.production)
```env
NEXTAUTH_URL=https://app.nextcrm.io
# Use production API keys
```

## Security Best Practices

### API Key Management

#### 1. Environment Variables
- Never commit `.env.local` files
- Use `.env.example` for documentation
- Rotate keys regularly
- Use different keys per environment

#### 2. Database Storage
For user-specific API keys:
```typescript
// Encrypt before storing
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
const iv = crypto.randomBytes(16);

export function encryptApiKey(apiKey: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptApiKey(encryptedKey: string): string {
  const parts = encryptedKey.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

#### 3. API Key Validation
```typescript
// Validate API keys before use
export async function validateApiKey(
  service: string,
  apiKey: string
): Promise<boolean> {
  try {
    switch (service) {
      case 'openai':
        const openai = new OpenAI({ apiKey });
        await openai.models.list();
        return true;
        
      case 'resend':
        const resend = new Resend(apiKey);
        await resend.apiKeys.list();
        return true;
        
      default:
        return false;
    }
  } catch (error) {
    console.error(`Invalid ${service} API key:`, error);
    return false;
  }
}
```

### Rate Limiting

#### Implementation
```typescript
import { RateLimiter } from 'limiter';

// Create rate limiters per service
const limiters = {
  openai: new RateLimiter({ tokensPerInterval: 100, interval: 'minute' }),
  resend: new RateLimiter({ tokensPerInterval: 100, interval: 'second' }),
  rossum: new RateLimiter({ tokensPerInterval: 10, interval: 'second' }),
};

export async function rateLimitedRequest(
  service: string,
  requestFn: () => Promise<any>
) {
  const limiter = limiters[service];
  if (!limiter) {
    return requestFn();
  }

  await limiter.removeTokens(1);
  return requestFn();
}
```

### Error Handling

#### Graceful Degradation
```typescript
export async function sendNotification(options: NotificationOptions) {
  try {
    // Try primary service (Resend)
    return await sendViaResend(options);
  } catch (error) {
    console.error('[RESEND_ERROR]', error);
    
    try {
      // Fall back to SMTP
      return await sendViaSMTP(options);
    } catch (smtpError) {
      console.error('[SMTP_ERROR]', smtpError);
      
      // Queue for retry
      await queueNotification(options);
      throw new Error('All email services failed');
    }
  }
}
```

### Webhook Security

#### Signature Verification
```typescript
// Verify webhook signatures
import crypto from 'crypto';

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// In webhook handler
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-webhook-signature');
  
  if (!verifyWebhookSignature(body, signature!, process.env.WEBHOOK_SECRET!)) {
    return new NextResponse('Invalid signature', { status: 401 });
  }
  
  // Process webhook
  const data = JSON.parse(body);
  // ...
}
```

## Monitoring & Logging

### Service Health Checks

```typescript
// Health check endpoint
export async function GET() {
  const health = {
    status: 'healthy',
    services: {},
    timestamp: new Date().toISOString(),
  };

  // Check OpenAI
  try {
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
    await openai.models.list();
    health.services.openai = 'operational';
  } catch {
    health.services.openai = 'degraded';
    health.status = 'degraded';
  }

  // Check Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.apiKeys.list();
    health.services.resend = 'operational';
  } catch {
    health.services.resend = 'degraded';
    health.status = 'degraded';
  }

  // Check Database
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'operational';
  } catch {
    health.services.database = 'down';
    health.status = 'unhealthy';
  }

  return NextResponse.json(health);
}
```

### Error Tracking

```typescript
// Centralized error logging
export function logExternalApiError(
  service: string,
  error: any,
  context?: any
) {
  const errorLog = {
    timestamp: new Date().toISOString(),
    service,
    error: {
      message: error.message,
      code: error.code,
      status: error.status,
    },
    context,
  };

  // Log to console (development)
  console.error(`[${service.toUpperCase()}_ERROR]`, errorLog);

  // Send to monitoring service (production)
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry, DataDog, etc.
    captureException(error, {
      tags: { service },
      extra: context,
    });
  }

  // Store in database for analysis
  prisma.apiErrorLog.create({
    data: errorLog,
  });
}
```

## Testing External APIs

### Mock Services

```typescript
// __mocks__/external-services.ts
export const mockOpenAI = {
  chat: {
    completions: {
      create: jest.fn().mockResolvedValue({
        choices: [{
          message: { content: 'Mocked response' }
        }]
      })
    }
  }
};

export const mockResend = {
  emails: {
    send: jest.fn().mockResolvedValue({
      data: { id: 'email-123' }
    })
  }
};
```

### Integration Tests

```typescript
// __tests__/api/external-services.test.ts
describe('External Service Integration', () => {
  it('should handle OpenAI API failure gracefully', async () => {
    // Mock API failure
    mockOpenAI.chat.completions.create.mockRejectedValue(
      new Error('API rate limit exceeded')
    );

    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Test' })
    });

    expect(response.status).toBe(503);
    const data = await response.json();
    expect(data.error).toContain('temporarily unavailable');
  });

  it('should fall back to SMTP when Resend fails', async () => {
    mockResend.emails.send.mockRejectedValue(
      new Error('Service unavailable')
    );

    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      text: 'Test email'
    });

    expect(result.provider).toBe('smtp');
    expect(result.success).toBe(true);
  });
});
```

## Migration Guides

### Switching Email Providers

From Resend to SendGrid:
```typescript
// 1. Update environment variables
SENDGRID_API_KEY=SG...

// 2. Update email service
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// 3. Update send function
export async function sendEmail(options) {
  const msg = {
    to: options.to,
    from: 'noreply@nextcrm.io',
    subject: options.subject,
    text: options.text,
    html: options.html,
  };
  
  return await sgMail.send(msg);
}
```

### Migrating Storage Providers

From DigitalOcean to AWS S3:
```typescript
// 1. Update configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// 2. Migration script
async function migrateFiles() {
  const files = await prisma.document.findMany();
  
  for (const file of files) {
    // Download from DO
    const data = await downloadFromDO(file.key);
    
    // Upload to S3
    const newUrl = await uploadToS3(file.key, data);
    
    // Update database
    await prisma.document.update({
      where: { id: file.id },
      data: { url: newUrl }
    });
  }
}
```

---

*Last Updated: January 2025 | NextCRM v0.0.3-beta*

✓ **External API Documentation Complete**