# NextCRM Source Tree & Architecture Documentation

## Overview
This document describes the source code organization and architectural patterns of the NextCRM application, a comprehensive business management platform built with Next.js 15 App Router architecture.

## Project Structure Overview

```
nextcrm-app/
├── actions/              # Server actions (Next.js 13+ pattern)
├── agents/               # BMad AI agent configurations
├── app/                  # Next.js App Router structure
├── components/           # Reusable React components
├── config/              # Application configuration
├── data/                # Static data and constants
├── lib/                 # Utility functions and shared logic
├── locales/             # Internationalization files
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── styles/              # Global styles
├── types/               # TypeScript type definitions
└── expansion-packs/     # Feature expansion modules

## Core Architecture Patterns

### 1. Next.js App Router Structure
The application uses Next.js 15's App Router with internationalization support:

```
app/
├── [locale]/            # Dynamic locale routing
│   ├── (auth)/         # Authentication pages group
│   ├── (routes)/       # Main application routes
│   └── layout.tsx      # Root layout with providers
├── api/                # API routes
└── fonts/              # Custom font files
```

### 2. Server Actions Pattern
Located in `/actions`, these handle server-side operations:

```
actions/
├── admin/              # Admin-specific operations
├── ai/                 # AI integrations
├── crm/                # CRM module actions
├── cron/               # Scheduled tasks
├── dashboard/          # Dashboard data fetching
├── documents/          # Document management
├── fulltext/           # Search functionality
├── github/             # GitHub integrations
├── invoice/            # Invoice processing
├── projects/           # Project management
└── system/             # System utilities
```

## Detailed Directory Structure

### `/actions` - Server Actions
Server-side functions using Next.js Server Actions pattern for data mutations and fetching.

#### Key Subdirectories:
- **`/admin`**: Administrative functions (send emails, update models)
- **`/crm`**: Complete CRM operations
  - `/account`: Account management
  - `/contracts`: Contract handling
  - `/opportunity`: Sales opportunities
  - `/tasks`: CRM-specific tasks
- **`/ai/projects`**: AI-powered project features
- **`/cron`**: Scheduled tasks (invoice processing, AI tasks)
- **`/dashboard`**: Dashboard metrics and counts
- **`/documents`**: Document retrieval and storage management
- **`/invoice`**: Invoice processing with Rossum integration
- **`/projects`**: Project management operations

### `/app` - Application Routes

#### `/app/[locale]/(routes)` - Main Application Modules
```
(routes)/
├── admin/              # System administration
│   ├── configs/       # Configuration management
│   ├── gpt-models/    # AI model settings
│   ├── modules/       # Module management
│   └── users/         # User administration
├── crm/               # CRM module
│   ├── accounts/      # Company management
│   ├── contacts/      # Contact management
│   ├── leads/         # Lead tracking
│   ├── opportunities/ # Sales pipeline
│   ├── contracts/     # Contract management
│   └── tasks/         # CRM tasks
├── projects/          # Project management
│   ├── boards/        # Kanban boards
│   ├── tasks/         # Task management
│   └── [boardId]/     # Dynamic board routes
├── invoice/           # Invoicing system
│   ├── new/          # Create invoices
│   ├── rossum/       # AI processing
│   └── [invoiceId]/  # Invoice details
├── documents/         # Document management
├── employees/         # HR management
├── reports/          # Analytics & reporting
├── secondbrain/      # Notion integration
└── profile/          # User profiles
```

#### `/app/api` - API Routes
```
api/
├── ai/               # AI endpoints
├── auth/             # Authentication (NextAuth)
├── crm/              # CRM API endpoints
├── cron/             # Scheduled task endpoints
├── documents/        # Document operations
├── emails/           # Email handling
├── invoice/          # Invoice API
├── notion/           # Notion integration
├── openai/           # OpenAI integration
├── projects/         # Project API
├── rossum/           # Rossum AI API
├── uploadthing/      # File upload API
└── user/             # User management
```

### `/components` - React Components

Organized by feature and complexity:

```
components/
├── common/           # Shared UI components
│   ├── LoadingComponent.tsx
│   ├── PageHeader.tsx
│   └── DataTable/
├── forms/            # Form components
│   ├── FormFields/
│   └── ValidationSchemas/
├── layouts/          # Layout components
│   ├── MainLayout/
│   └── AuthLayout/
├── modals/           # Modal dialogs
├── sheets/           # Drawer/sheet components
└── ui/               # Base UI components (shadcn/ui)
```

### `/lib` - Utilities and Configuration

Core utilities and shared logic:

```
lib/
├── auth/             # Authentication utilities
├── db/               # Database utilities
├── email/            # Email templates and utils
├── ai/               # AI service integrations
├── utils/            # General utilities
├── constants.ts      # Application constants
├── prisma.ts        # Prisma client singleton
└── validations.ts   # Shared validation schemas
```

### `/prisma` - Database Layer

```
prisma/
├── schema.prisma     # Database schema definition
├── seeds/           # Database seeding scripts
│   └── seed.ts     # Main seed file
└── migrations/      # Database migrations
```

### `/locales` - Internationalization

```
locales/
├── en/              # English translations
├── cs/              # Czech translations
├── de/              # German translations
└── ua/              # Ukrainian translations
```

### `/types` - TypeScript Definitions

```
types/
├── types.d.ts       # Global type definitions
├── next-auth.d.ts   # NextAuth type extensions
└── api.d.ts         # API response types
```

## Key Architectural Patterns

### 1. Server Components First
- Default to Server Components for data fetching
- Client Components only when interactivity required
- Use `"use client"` directive sparingly

### 2. Data Fetching Strategy
- Server Actions for mutations
- Direct database queries in Server Components
- SWR/React Query for client-side fetching
- Streaming and Suspense for progressive rendering

### 3. Authentication Flow
- NextAuth.js with multiple providers
- Session management via JWT
- Role-based access control (RBAC)
- Protected routes using middleware

### 4. State Management Architecture
- Server state: Server Components + Server Actions
- Client state: Zustand for global, Jotai for atomic
- Form state: React Hook Form with Zod validation
- Cache: SWR for client-side caching

### 5. File Organization Patterns
- Feature-based organization in `/app`
- Colocation of related files
- Shared components in `/components`
- Business logic in `/actions`

## Module Architecture

### CRM Module
```
crm/
├── entities/        # Core CRM entities
│   ├── Account
│   ├── Contact
│   ├── Lead
│   ├── Opportunity
│   └── Contract
├── relationships/   # Entity relationships
└── workflows/       # Business processes
```

### Project Management Module
```
projects/
├── boards/          # Kanban board logic
├── tasks/           # Task management
├── collaboration/   # Team features
└── notifications/   # Task notifications
```

### Document Management Module
```
documents/
├── storage/         # File storage (UploadThing)
├── processing/      # Document processing
├── metadata/        # Document metadata
└── linking/         # Entity relationships
```

## API Design Patterns

### RESTful Endpoints
```
/api/[module]/[entity]/[action]
Example: /api/crm/accounts/create
```

### Server Actions
```typescript
// actions/crm/get-accounts.ts
export async function getAccounts(params: GetAccountsParams) {
  // Direct database access
  // Business logic
  // Return typed data
}
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: ResponseMetadata;
}
```

## Security Architecture

### Authentication Layers
1. **NextAuth.js**: Core authentication
2. **Middleware**: Route protection
3. **Server Actions**: Server-side validation
4. **API Routes**: Token verification

### Data Protection
- Prisma ORM for SQL injection prevention
- Input validation with Zod
- Environment variable management
- CORS configuration

## Performance Optimization Patterns

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting
- Lazy loading for modals and sheets

### Caching Strategy
- Static generation where possible
- ISR for semi-dynamic content
- Client-side caching with SWR
- Database query optimization

### Image Optimization
- Next.js Image component
- Sharp for server-side processing
- Responsive image serving
- WebP format support

## Development Workflow

### File Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Server Actions: kebab-case (e.g., `get-accounts.ts`)
- API Routes: kebab-case (e.g., `create-user.ts`)

### Component Structure
```typescript
// components/feature/ComponentName.tsx
import { dependencies } from 'packages';
import { localImports } from '@/lib';

interface ComponentNameProps {
  // Props definition
}

export function ComponentName({ props }: ComponentNameProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Server Action Structure
```typescript
// actions/module/action-name.ts
"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function actionName(params: ActionParams) {
  // Authentication check
  // Validation
  // Business logic
  // Database operation
  // Return typed response
}
```

## Testing Structure

### Test Organization
```
__tests__/
├── unit/            # Unit tests
├── integration/     # Integration tests
└── e2e/            # End-to-end tests (Cypress)
```

### Cypress E2E Tests
```
cypress/
├── e2e/            # Test specs
├── fixtures/       # Test data
├── support/        # Helper functions
└── downloads/      # Test downloads
```

## Build & Deployment

### Build Process
1. Prisma generation: `prisma generate`
2. Database push: `prisma db push`
3. Seed database: `prisma db seed`
4. Next.js build: `next build`

### Environment Structure
- Development: Local MongoDB
- Staging: Cloud MongoDB
- Production: Managed MongoDB cluster

## Expansion Packs System

Modular feature extensions:
```
expansion-packs/
├── pack.json        # Pack configuration
├── components/      # Pack-specific components
├── actions/         # Pack-specific actions
└── api/            # Pack-specific APIs
```

## BMad Agent System

AI-powered development agents:
```
agents/
├── bmad-master.txt     # Master coordinator
├── architect.txt       # Architecture decisions
├── dev.txt            # Development tasks
├── pm.txt             # Project management
├── po.txt             # Product ownership
├── qa.txt             # Quality assurance
└── analyst.txt        # Business analysis
```

## Configuration Files

### Root Configuration
- `package.json`: Dependencies and scripts
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS setup
- `tsconfig.json`: TypeScript configuration
- `.env.local`: Environment variables

### Development Configuration
- `.eslintrc.json`: Linting rules
- `.prettierrc`: Code formatting
- `cypress.config.ts`: E2E test configuration

## Migration & Evolution Patterns

### Adding New Features
1. Create feature directory in `/app/[locale]/(routes)`
2. Add server actions in `/actions/[feature]`
3. Create API routes if needed in `/app/api/[feature]`
4. Add components in `/components/[feature]`
5. Update types in `/types`
6. Add translations in `/locales`

### Database Changes
1. Update Prisma schema
2. Generate migration
3. Update seed data if needed
4. Update related server actions
5. Update TypeScript types

### Module Integration
1. Define module in database
2. Create module routes
3. Add to navigation
4. Implement access control
5. Add module-specific actions

## Performance Metrics & Monitoring

### Key Metrics
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

### Monitoring Points
- API response times
- Database query performance
- File upload/download speeds
- AI service response times

## Known Technical Constraints

### Current Limitations
1. React 19 RC - potential breaking changes
2. MongoDB aggregations complexity
3. File size limits with UploadThing
4. Rate limits on AI services

### Technical Debt Areas
1. Some components need migration to Server Components
2. Inconsistent error handling in some modules
3. Need for comprehensive test coverage
4. Performance optimization for large datasets

---

*This document represents the current architecture of NextCRM v0.0.3-beta. It should be updated as the architecture evolves.*