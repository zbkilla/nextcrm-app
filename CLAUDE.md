# NextCRM AI Context

## Project Overview
**NextCRM** - Enterprise CRM & Business Management Platform
- **Version**: 0.0.3-beta
- **Stack**: Next.js 15, React 19 RC, TypeScript, MongoDB, Prisma
- **Architecture**: App Router, Server Components first, Server Actions for mutations
- **Auth**: NextAuth.js (Google, GitHub, Credentials)
- **UI**: shadcn/ui (Radix + Tailwind), Tremor for charts

## Critical Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build (runs prisma generate/push/seed)
npm run lint         # ESLint check
npx prisma studio    # Database GUI
```

## Directory Structure
```
app/
├── [locale]/                # i18n wrapper (en/cs/de/ua)
│   ├── (routes)/           # Main app routes
│   │   ├── crm/           # CRM module (accounts/contacts/leads/opportunities)
│   │   ├── projects/      # Project management (boards/tasks)
│   │   ├── invoice/       # Invoicing with Rossum OCR
│   │   ├── documents/     # Document management
│   │   └── admin/         # System administration
│   └── api/               # API routes
actions/                    # Server actions (organized by module)
components/
├── ui/                    # shadcn/ui components
└── forms/                 # Form components
lib/                       # Utilities, configs
prisma/                    # Schema, migrations, seeds
docs/architecture/         # Technical documentation
```

## Key Technologies
- **Frontend**: Next.js 15, React 19 RC, TypeScript 5.6
- **Database**: MongoDB + Prisma ORM 5.22
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **State**: Zustand (global), Jotai (atomic), SWR (cache)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend + React Email
- **Files**: UploadThing + DigitalOcean Spaces
- **AI**: OpenAI API (user/system keys)
- **OCR**: Rossum for invoice processing

## Core Patterns

### Server Components (Default)
```tsx
// app/[locale]/(routes)/module/page.tsx
export default async function Page() {
  const data = await getData(); // Direct DB call
  return <ClientComponent data={data} />;
}
```

### Server Actions
```tsx
// actions/module/action-name.ts
"use server";
export async function actionName(input: Input) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  
  // Validate → Execute → Return typed response
  return { success: true, data };
}
```

### Client Components
```tsx
"use client"; // Only when needed for interactivity
import { useState } from "react";
```

### API Routes
```tsx
// app/api/module/route.ts
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse("Unauthorized", { status: 401 });
  
  const body = await req.json();
  // Process...
  return NextResponse.json(result);
}
```

## Database Schema Patterns
```prisma
model crm_Accounts {
  id          String @id @default(uuid())
  name        String
  createdBy   String // User ID reference
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
**Naming**: `module_Entity` format (crm_Accounts, projects_Tasks)

## UI Component Usage
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

// Utility for className merging
import { cn } from "@/lib/utils";
```

## Environment Variables
```env
DATABASE_URL=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...

# OAuth
GOOGLE_ID=...
GOOGLE_SECRET=...

# Services
RESEND_API_KEY=...
UPLOADTHING_SECRET=...
OPEN_AI_API_KEY=...
ROSSUM_API_URL=...
```

## Common Tasks

### Add New Module
1. Create route: `app/[locale]/(routes)/module/page.tsx`
2. Add actions: `actions/module/*.ts`
3. Create API: `app/api/module/route.ts`
4. Add types: `types/module.d.ts`
5. Update navigation

### Create Server Action
```tsx
// actions/module/create-item.ts
"use server";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateItemSchema } from "./schema";

async function handler(data: InputType) {
  // Implementation
}

export const createItem = createSafeAction(CreateItemSchema, handler);
```

### Add UI Component
```bash
npx shadcn-ui@latest add [component-name]
```

## Testing
```bash
# E2E Tests
npx cypress open

# Type checking
npx tsc --noEmit
```

## Key Files
- `lib/auth.ts` - NextAuth configuration
- `lib/prisma.ts` - Prisma client singleton
- `lib/utils.ts` - Common utilities (cn function)
- `components/ui/` - All UI components
- `actions/` - Server-side business logic
- `middleware.ts` - Auth & i18n middleware

## Module Structure
- **CRM**: Accounts, Contacts, Leads, Opportunities, Contracts
- **Projects**: Boards (Kanban), Tasks, Sections, Comments
- **Documents**: Upload, storage, linking to entities
- **Invoices**: CRUD, OCR processing via Rossum
- **Admin**: Users, modules, system config

## Coding Standards
- **Components**: PascalCase (`UserProfile.tsx`)
- **Actions**: kebab-case (`get-users.ts`)
- **Props**: Interface with `Props` suffix
- **Async**: Server Components for data, Client for interaction
- **Errors**: Try-catch with `[MODULE_ERROR]` logging
- **Auth**: Always check session in actions/API routes

## State Management
- **Server State**: Server Components + Server Actions
- **Client State**: Zustand (global), useState (local)
- **Forms**: React Hook Form + Zod
- **Cache**: SWR for client-side fetching

## Performance
- Server Components by default
- Dynamic imports for heavy components
- Image optimization with next/image
- Streaming with Suspense boundaries

## Deployment
```bash
# Build process
prisma generate
prisma db push  
prisma db seed
next build
```

## Git Workflow
```bash
git add .
git commit -m "type(scope): message"
git push origin main
```

## External Services
- **OpenAI**: Chat completions, configurable models
- **Resend**: Transactional emails
- **UploadThing**: File uploads
- **Rossum**: Invoice OCR
- **DigitalOcean Spaces**: S3-compatible storage

## Important Notes
- React 19 RC - may have breaking changes
- MongoDB with Prisma - no traditional migrations
- i18n enabled - all routes under [locale]
- Dark mode support via next-themes
- BMad framework integrated for AI development

## Quick Wins
- Use Server Components unless you need `useState`, `onClick`, etc.
- Server Actions for all mutations (better than API routes)
- Always use `cn()` for conditional classes
- Check session first in all protected operations
- Use `DataTable` component for all tables
- Follow existing patterns in codebase

---
*For detailed documentation see `/docs/architecture/`*