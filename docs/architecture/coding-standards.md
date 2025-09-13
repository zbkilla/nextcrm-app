# NextCRM Coding Standards

## Introduction
This document defines the coding standards and conventions for the NextCRM project. These standards ensure consistency, maintainability, and quality across the codebase. All contributors should follow these guidelines when writing or reviewing code.

## Table of Contents
1. [General Principles](#general-principles)
2. [File Organization](#file-organization)
3. [Naming Conventions](#naming-conventions)
4. [TypeScript Standards](#typescript-standards)
5. [React Component Standards](#react-component-standards)
6. [Server Actions & API Routes](#server-actions--api-routes)
7. [Database & Prisma Patterns](#database--prisma-patterns)
8. [Error Handling](#error-handling)
9. [Testing Standards](#testing-standards)
10. [Performance Guidelines](#performance-guidelines)
11. [Security Best Practices](#security-best-practices)

## General Principles

### Core Values
- **Consistency**: Follow existing patterns in the codebase
- **Readability**: Code should be self-documenting
- **Simplicity**: Prefer simple solutions over complex ones
- **Type Safety**: Leverage TypeScript for compile-time safety
- **Performance**: Consider performance implications
- **Security**: Never compromise on security

### Code Comments
- Avoid unnecessary comments - code should be self-explanatory
- Use comments only for complex business logic or workarounds
- Keep comments concise and up-to-date
- Use JSDoc for public APIs and utilities

## File Organization

### Project Structure
```
nextcrm-app/
├── actions/          # Server actions (domain-organized)
├── app/             # Next.js App Router
│   ├── [locale]/    # Internationalized routes
│   └── api/         # API routes
├── components/      # Shared components
├── lib/            # Utilities and configurations
├── prisma/         # Database schema
└── types/          # TypeScript definitions
```

### Module Organization
Each module should follow this structure:
```
module-name/
├── page.tsx         # Route page component
├── components/      # Module-specific components
├── actions.ts      # Server actions
└── types.ts        # Type definitions
```

### Import Order
Organize imports in this order:
1. React/Next.js imports
2. Third-party libraries
3. UI components (`@/components/ui`)
4. Local components (relative imports)
5. Actions and utilities
6. Type imports

```typescript
// Example
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Container from "./components/Container";
import { getTasks } from "@/actions/projects/get-tasks";
import type { Task } from "@/types";
```

## Naming Conventions

### Files and Directories

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase.tsx | `UserProfile.tsx` |
| Pages | page.tsx | `app/[locale]/users/page.tsx` |
| Server Actions | kebab-case.ts | `get-users.ts`, `create-account.ts` |
| API Routes | route.ts | `app/api/users/route.ts` |
| Utilities | camelCase.ts | `formatDate.ts`, `utils.ts` |
| Types | types.ts or types.d.ts | `types.ts` |
| Constants | constants.ts | `constants.ts` |

### Variables and Functions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `function UserCard() {}` |
| Functions | camelCase | `function getUserById() {}` |
| Variables | camelCase | `const userName = "John"` |
| Constants | UPPER_CASE or camelCase | `const API_URL` or `const apiUrl` |
| Boolean variables | is/has/should prefix | `isLoading`, `hasError` |
| Event handlers | handle prefix | `handleClick`, `handleSubmit` |

### Database Models
Prisma models use snake_case with module prefixes:
```prisma
model crm_Accounts {
  id        String   @id
  name      String
  createdAt DateTime @default(now())
}
```

## TypeScript Standards

### Type Definitions

#### Interface vs Type
- Use `interface` for object shapes that might be extended
- Use `type` for unions, intersections, and aliases

```typescript
// Interface for extensible objects
interface UserProps {
  id: string;
  name: string;
  email: string;
}

// Type for unions and complex types
type Status = "pending" | "active" | "inactive";
type AsyncFunction<T> = () => Promise<T>;
```

#### Props Naming
Component props should use the `Props` suffix:
```typescript
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  // Component implementation
}
```

### Type Safety Rules

#### Avoid `any` Type
Never use `any` unless absolutely necessary. Use `unknown` or specific types:
```typescript
// ❌ Bad
const processData = (data: any) => { /* ... */ };

// ✅ Good
const processData = (data: unknown) => {
  if (typeof data === 'object' && data !== null) {
    // Type guard
  }
};

// ✅ Better
const processData = (data: UserData) => { /* ... */ };
```

#### Use Type Inference
Let TypeScript infer types when obvious:
```typescript
// ❌ Unnecessary annotation
const name: string = "John";
const numbers: number[] = [1, 2, 3];

// ✅ Good
const name = "John";
const numbers = [1, 2, 3];
```

#### Zod Schema Pattern
Use Zod for runtime validation with type inference:
```typescript
import { z } from "zod";

// Define schema
export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "user"]),
});

// Infer types from schema
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
```

## React Component Standards

### Component Structure

#### Server Components (Default)
```typescript
// app/[locale]/users/page.tsx
import { getUsers } from "@/actions/users/get-users";
import Container from "@/components/ui/Container";

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <Container title="Users" description="Manage system users">
      {/* Component content */}
    </Container>
  );
}
```

#### Client Components
```typescript
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface UserFormProps {
  userId?: string;
  onSubmit: (data: FormData) => Promise<void>;
}

export function UserForm({ userId, onSubmit }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Component logic
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

### Component Best Practices

#### Use Server Components by Default
Only use Client Components when you need:
- Event handlers (onClick, onChange)
- Browser APIs (window, document)
- State management (useState, useReducer)
- Effects (useEffect)

#### Component Composition
Break down complex components into smaller, reusable pieces:
```typescript
// ❌ Bad - Monolithic component
function UserDashboard() {
  // 500 lines of code
}

// ✅ Good - Composed components
function UserDashboard() {
  return (
    <>
      <UserHeader />
      <UserStats />
      <UserActivityList />
    </>
  );
}
```

#### Props Destructuring
Always destructure props in the function signature:
```typescript
// ❌ Bad
function UserCard(props: UserCardProps) {
  return <div>{props.user.name}</div>;
}

// ✅ Good
function UserCard({ user, onEdit }: UserCardProps) {
  return <div>{user.name}</div>;
}
```

## Server Actions & API Routes

### Server Actions Pattern

```typescript
// actions/module/action-name.ts
"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { createSafeAction } from "@/lib/create-safe-action";

// Input validation schema
const InputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

type InputType = z.infer<typeof InputSchema>;
type ReturnType = { success: boolean; data?: any; error?: string };

// Handler implementation
async function handler(data: InputType): Promise<ReturnType> {
  // 1. Authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  // 2. Authorization
  const user = await prismadb.users.findUnique({
    where: { id: session.user.id },
  });
  
  if (!user || user.userStatus !== "ACTIVE") {
    return { success: false, error: "Access denied" };
  }

  try {
    // 3. Business logic
    const result = await prismadb.model.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    // 4. Return success
    return { success: true, data: result };
  } catch (error) {
    // 5. Error handling
    console.error("[ACTION_NAME_ERROR]", error);
    return { success: false, error: "Operation failed" };
  }
}

// Export safe action
export const actionName = createSafeAction(InputSchema, handler);
```

### API Routes Pattern

```typescript
// app/api/module/resource/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");

    // Database operation
    const data = await prismadb.model.findMany({
      where: { userId: session.user.id },
      skip: (page - 1) * 10,
      take: 10,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("[API_MODULE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    
    // Validation
    if (!body.name || !body.email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const result = await prismadb.model.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[API_MODULE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
```

## Database & Prisma Patterns

### Query Patterns

#### Use Proper Includes
```typescript
// ✅ Good - Explicit includes
const account = await prismadb.crm_Accounts.findUnique({
  where: { id: accountId },
  include: {
    contacts: true,
    opportunities: {
      include: {
        salesStage: true,
      },
    },
  },
});
```

#### Efficient Filtering
```typescript
// Complex OR queries for search
const results = await prismadb.crm_Contacts.findMany({
  where: {
    OR: [
      { name: { contains: searchTerm, mode: "insensitive" } },
      { email: { contains: searchTerm, mode: "insensitive" } },
      { phone: { contains: searchTerm, mode: "insensitive" } },
    ],
    AND: {
      userId: session.user.id,
      isDeleted: false,
    },
  },
  orderBy: { createdAt: "desc" },
});
```

#### Use Transactions for Related Operations
```typescript
const result = await prismadb.$transaction(async (tx) => {
  // Create account
  const account = await tx.crm_Accounts.create({
    data: accountData,
  });

  // Create related contact
  const contact = await tx.crm_Contacts.create({
    data: {
      ...contactData,
      accountId: account.id,
    },
  });

  return { account, contact };
});
```

## Error Handling

### Client-Side Error Handling
```typescript
"use client";

function MyComponent() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await submitAction(data);
      if (!result.success) {
        setError(result.error || "Operation failed");
        return;
      }
      // Handle success
    } catch (error) {
      console.error("Submission error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
}
```

### Server-Side Error Handling
```typescript
// Consistent error logging with prefixes
try {
  // Operation
} catch (error) {
  console.error("[MODULE_ACTION_ERROR]", error);
  
  // User-friendly error messages
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return { error: "This record already exists" };
    }
  }
  
  // Generic fallback
  return { error: "Operation failed. Please try again." };
}
```

### Error Boundaries
```typescript
"use client";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <h2>Something went wrong</h2>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function MyApp() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppContent />
    </ErrorBoundary>
  );
}
```

## Testing Standards

### Unit Tests
```typescript
// __tests__/utils/formatDate.test.ts
import { formatDate } from "@/lib/utils/formatDate";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-01-15");
    expect(formatDate(date)).toBe("January 15, 2024");
  });

  it("should handle null values", () => {
    expect(formatDate(null)).toBe("");
  });
});
```

### Integration Tests
```typescript
// __tests__/actions/create-user.test.ts
import { createUser } from "@/actions/users/create-user";

describe("createUser action", () => {
  it("should create a user successfully", async () => {
    const input = {
      name: "Test User",
      email: "test@example.com",
    };

    const result = await createUser(input);
    
    expect(result.success).toBe(true);
    expect(result.data).toHaveProperty("id");
    expect(result.data.email).toBe(input.email);
  });
});
```

### E2E Tests (Cypress)
```javascript
// cypress/e2e/user-management.cy.js
describe("User Management", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/users");
  });

  it("should create a new user", () => {
    cy.get("[data-testid=create-user-btn]").click();
    cy.get("[name=name]").type("New User");
    cy.get("[name=email]").type("new@example.com");
    cy.get("[type=submit]").click();
    
    cy.contains("User created successfully").should("be.visible");
  });
});
```

## Performance Guidelines

### Code Splitting
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### Image Optimization
```typescript
import Image from "next/image";

// Always use Next.js Image component
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Data Fetching
```typescript
// Parallel data fetching
const [users, projects, tasks] = await Promise.all([
  getUsers(),
  getProjects(),
  getTasks(),
]);

// Use proper caching strategies
export const revalidate = 3600; // Revalidate every hour
```

### Memoization
```typescript
"use client";

import { useMemo, useCallback } from "react";

function ExpensiveComponent({ data }) {
  // Memoize expensive computations
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  // Memoize callbacks
  const handleClick = useCallback((id: string) => {
    // Handle click
  }, []);
}
```

## Security Best Practices

### Input Validation
Always validate and sanitize user input:
```typescript
// Server-side validation with Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(["admin", "user"]),
});
```

### Authentication & Authorization
```typescript
// Always check authentication
const session = await getServerSession(authOptions);
if (!session) {
  throw new Error("Unauthorized");
}

// Verify user permissions
if (session.user.role !== "admin") {
  throw new Error("Insufficient permissions");
}
```

### Sensitive Data Handling
```typescript
// Never log sensitive data
console.log("[USER_LOGIN]", { email: user.email }); // ✅ OK
console.log("[USER_LOGIN]", { password }); // ❌ Never

// Use environment variables
const apiKey = process.env.API_KEY; // ✅ Good
const apiKey = "sk-1234..."; // ❌ Never hardcode
```

### SQL Injection Prevention
```typescript
// Always use Prisma's parameterized queries
const user = await prismadb.users.findUnique({
  where: { email: userEmail }, // ✅ Safe
});

// Never use raw SQL with user input
const query = `SELECT * FROM users WHERE email = '${userEmail}'`; // ❌ Vulnerable
```

### CORS Configuration
```typescript
// Configure CORS properly in API routes
const headers = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
```

## Git Commit Standards

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
feat(crm): add contact import functionality
fix(auth): resolve session timeout issue
docs(api): update API documentation
refactor(utils): optimize date formatting function
```

## Code Review Checklist

Before submitting code for review, ensure:

- [ ] Code follows naming conventions
- [ ] TypeScript types are properly defined (no `any`)
- [ ] Components use appropriate patterns (Server/Client)
- [ ] Error handling is implemented
- [ ] Security best practices are followed
- [ ] Performance considerations are addressed
- [ ] Code is properly formatted
- [ ] Tests are written for new functionality
- [ ] Documentation is updated if needed

## Continuous Improvement

These standards are living guidelines that should evolve with the project. Team members are encouraged to:

1. Suggest improvements through pull requests
2. Discuss patterns in code reviews
3. Document new patterns as they emerge
4. Regularly review and update these standards

---

*Last Updated: January 2025 | Version: 1.0.0 | NextCRM v0.0.3-beta*