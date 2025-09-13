# NextCRM Tech Stack Documentation

## Overview
This document provides a comprehensive overview of the technology stack used in the NextCRM application, a modern CRM and business management platform built with Next.js 15 and TypeScript.

## Version Information
- **Application Version**: 0.0.3-beta
- **Last Updated**: January 2025
- **Package Manager**: npm/pnpm (with pnpm overrides for React 19 RC)

## Core Framework Stack

### Runtime & Framework
| Technology | Version | Purpose | Notes |
|-----------|---------|---------|-------|
| **Next.js** | 15.2.4 | React framework with SSR/SSG | Latest version with App Router |
| **React** | 19.0.0-rc | UI library | Release candidate version |
| **React DOM** | 19.0.0-rc | DOM rendering | Matching React RC version |
| **TypeScript** | 5.6.3 | Type safety | Full type coverage across codebase |
| **Node.js** | 22.x | JavaScript runtime | LTS version recommended |

### Database & ORM
| Technology | Version | Purpose | Configuration |
|-----------|---------|---------|--------------|
| **Prisma** | 5.22.0 | ORM and database toolkit | Schema-first approach |
| **@prisma/client** | 5.22.0 | Database client | Auto-generated types |
| **MongoDB** | - | Document database | Primary data store |
| **@next-auth/prisma-adapter** | 1.0.7 | Auth database adapter | Session management |

## Frontend Technologies

### UI Component Libraries
| Library | Version | Purpose | Usage |
|---------|---------|---------|-------|
| **@radix-ui** | Various | Headless UI components | Base for shadcn/ui |
| **@tremor/react** | 3.18.4 | Data visualization | Charts and analytics |
| **PrimeReact** | 10.8.4 | Rich UI components | Advanced components |
| **Lucide React** | 0.456.0 | Icon library | Primary icon set |
| **React Icons** | 5.3.0 | Icon library | Additional icons |

### Styling & Design
| Technology | Version | Purpose | Configuration |
|-----------|---------|---------|--------------|
| **Tailwind CSS** | 3.4.14 | Utility-first CSS | Custom configuration |
| **tailwindcss-animate** | 1.0.7 | Animation utilities | Tailwind plugin |
| **tailwind-merge** | 2.5.4 | Class merging | Conflict resolution |
| **class-variance-authority** | 0.7.0 | Component variants | Style composition |
| **clsx** | 2.1.1 | Class name utility | Conditional classes |
| **Geist** | 1.3.1 | Font family | Typography |
| **next-themes** | 0.4.3 | Theme management | Dark/light mode |

### Form & Validation
| Library | Version | Purpose | Integration |
|---------|---------|---------|------------|
| **react-hook-form** | 7.53.2 | Form management | Primary form library |
| **@hookform/resolvers** | 3.9.1 | Validation resolvers | Schema validation |
| **zod** | 3.23.8 | Schema validation | Type-safe validation |

### Data Management & State
| Library | Version | Purpose | Scope |
|---------|---------|---------|-------|
| **swr** | 2.2.5 | Data fetching | Client-side caching |
| **zustand** | 5.0.1 | State management | Global state |
| **jotai** | 2.10.2 | Atomic state | Component state |
| **@tanstack/react-table** | 8.20.5 | Table management | Data tables |

## Backend & API Technologies

### Authentication & Security
| Technology | Version | Purpose | Configuration |
|-----------|---------|---------|--------------|
| **next-auth** | 4.24.10 | Authentication | OAuth & credentials |
| **bcrypt** | 5.1.1 | Password hashing | Security |
| **bcryptjs** | 2.4.3 | JS bcrypt | Fallback option |

### File Management & Storage
| Service | Version | Purpose | Integration |
|---------|---------|---------|------------|
| **@uploadthing/react** | 7.1.1 | File uploads | React components |
| **uploadthing** | 7.3.0 | File upload service | Backend service |
| **@aws-sdk/client-s3** | 3.689.0 | S3 client | Object storage |
| **@aws-sdk/s3-request-presigner** | 3.689.0 | S3 presigned URLs | Secure uploads |
| **sharp** | 0.33.5 | Image processing | Optimization |

### Email & Communication
| Technology | Version | Purpose | Features |
|-----------|---------|---------|----------|
| **resend** | 4.0.1-alpha.0 | Email service | Transactional emails |
| **@react-email/components** | 0.0.28 | Email components | React email templates |
| **@react-email/render** | 1.0.2 | Email rendering | HTML generation |
| **nodemailer** | 6.9.16 | Email sending | SMTP support |
| **imap** | 0.8.19 | Email receiving | IMAP protocol |
| **mailparser** | 3.7.1 | Email parsing | Message processing |

### AI & External Services
| Service | Version | Purpose | Usage |
|---------|---------|---------|-------|
| **openai** | 4.71.1 | AI integration | GPT models |
| **ai** | 3.4.33 | AI SDK | Vercel AI SDK |
| **@notionhq/client** | 2.2.15 | Notion API | Knowledge base |

## Utility Libraries

### Date & Time
| Library | Version | Purpose |
|---------|---------|---------|
| **date-fns** | 4.1.0 | Date utilities |
| **dayjs** | 1.11.13 | Date manipulation |
| **moment** | 2.30.1 | Legacy date handling |
| **react-day-picker** | 8.10.1 | Date picker component |

### Data Processing
| Library | Version | Purpose |
|---------|---------|---------|
| **axios** | 1.7.7 | HTTP client |
| **xmlbuilder2** | 3.1.1 | XML generation |
| **entities** | 5.0.0 | HTML entity encoding |

### UI Utilities
| Library | Version | Purpose |
|---------|---------|---------|
| **react-beautiful-dnd** | 13.1.1 | Drag and drop |
| **react-dropzone** | 14.3.5 | File drop zone |
| **react-resizable-panels** | 2.1.6 | Resizable panels |
| **cmdk** | 1.0.4 | Command menu |
| **react-hot-toast** | 2.4.1 | Toast notifications |
| **sonner** | 1.7.0 | Toast notifications |
| **react-doc-viewer** | 0.1.14 | Document viewer |
| **react-youtube** | 10.1.0 | YouTube embed |

## Development Tools

### Build & Development
| Tool | Version | Purpose | Command |
|------|---------|---------|---------|
| **eslint** | 9.14.0 | Code linting | `npm run lint` |
| **eslint-config-next** | 15.0.3 | Next.js ESLint config | - |
| **postcss** | 8.4.49 | CSS processing | - |
| **autoprefixer** | 10.4.20 | CSS vendor prefixes | - |

### Testing
| Tool | Version | Purpose | Configuration |
|------|---------|---------|--------------|
| **cypress** | 13.15.2 | E2E testing | `/cypress` directory |
| **ts-node** | 10.9.2 | TypeScript execution | Seed scripts |

### Type Definitions
| Package | Version | Purpose |
|---------|---------|---------|
| **@types/node** | 22.9.0 | Node.js types |
| **@types/react** | 19.0.0-rc.1 | React types (RC) |
| **@types/react-dom** | 19.0.0-rc.1 | React DOM types (RC) |
| Various @types/* | - | Library type definitions |

## Scripts & Commands

### Development Scripts
```json
{
  "dev": "next dev",
  "build": "prisma generate && prisma db push && prisma db seed && next build",
  "start": "next start",
  "lint": "next lint"
}
```

### Prisma Configuration
```json
{
  "seed": "ts-node ./prisma/seeds/seed.ts"
}
```

## Environment Requirements

### Minimum Requirements
- Node.js 18.x or higher (22.x recommended)
- npm 8.x or pnpm 8.x
- MongoDB instance (local or cloud)

### Recommended Development Setup
- VS Code with TypeScript and Tailwind CSS extensions
- MongoDB Compass for database management
- Postman or similar for API testing

## Package Manager Configuration

### PNPM Overrides
The project uses specific React 19 RC versions with pnpm overrides:
```json
{
  "overrides": {
    "@types/react": "npm:types-react@19.0.0-rc.1",
    "@types/react-dom": "npm:types-react-dom@19.0.0-rc.1"
  }
}
```

## Security Considerations

### Authentication
- JWT-based authentication via NextAuth.js
- Support for OAuth providers (Google, GitHub)
- Credentials-based authentication with bcrypt hashing

### API Security
- Server-side API routes protection
- Environment variable management for secrets
- Prisma ORM for SQL injection prevention

## Performance Optimizations

### Frontend
- Next.js App Router for improved performance
- React 19 RC with concurrent features
- SWR for client-side caching
- Image optimization with Sharp

### Backend
- Prisma query optimization
- MongoDB indexing strategies
- Edge runtime support where applicable

## Known Dependencies & Constraints

### Critical Dependencies
1. **React 19 RC**: Using release candidate - may have breaking changes
2. **Next.js 15**: Latest version - ensure compatibility with all libraries
3. **Prisma + MongoDB**: Schema changes require migration strategy
4. **UploadThing**: External service dependency for file uploads
5. **Resend**: External email service dependency

### Version Locks
- React and React DOM must use matching RC versions
- Prisma and @prisma/client must have matching versions
- TypeScript types must match React RC version

## Migration Notes

### From Previous Versions
- Next.js 14 → 15: App Router improvements, breaking changes in middleware
- React 18 → 19 RC: New concurrent features, potential API changes
- Check all @radix-ui components for compatibility

### Future Considerations
- Monitor React 19 for stable release
- Plan migration strategy for production deployment
- Consider implementing Turborepo for monorepo structure

---

*This document is maintained as part of the NextCRM project documentation. For updates or corrections, please submit a pull request.*