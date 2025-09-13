# NextCRM UX/UI Guidelines

## Introduction
This document defines the user experience and interface design standards for NextCRM. These guidelines ensure consistency, accessibility, and usability across all features and modules of the application.

## Design Philosophy

### Core Principles
1. **Clarity Over Cleverness**: Interfaces should be immediately understandable
2. **Consistency Is Key**: Same patterns everywhere reduce cognitive load
3. **Accessibility First**: Design for all users, regardless of abilities
4. **Performance Matters**: Fast, responsive interfaces enhance user experience
5. **Progressive Disclosure**: Show what's needed, when it's needed
6. **User Control**: Users should feel in control, not controlled

### Design Goals
- **Efficient Workflows**: Minimize clicks and time to complete tasks
- **Visual Hierarchy**: Guide users' attention to what matters most
- **Predictable Behavior**: Similar elements behave similarly
- **Helpful Feedback**: Clear system status and error messages
- **Responsive Design**: Seamless experience across all devices

## Design System

### Component Library
NextCRM uses **shadcn/ui** built on **Radix UI** primitives with **Tailwind CSS** styling.

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

### Design Tokens

#### Color System

##### Semantic Colors
```css
/* Light Mode */
--background: 0 0% 100%;        /* White */
--foreground: 222.2 84% 4.9%;   /* Near black */
--primary: 222.2 47.4% 11.2%;   /* Dark blue */
--secondary: 210 40% 96.1%;     /* Light gray */
--accent: 210 40% 96.1%;        /* Light gray */
--destructive: 0 84.2% 60.2%;   /* Red */
--muted: 210 40% 96.1%;         /* Light gray */
--border: 214.3 31.8% 91.4%;    /* Light border */

/* Dark Mode */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --secondary: 217.2 32.6% 17.5%;
  --accent: 217.2 32.6% 17.5%;
  --destructive: 0 62.8% 30.6%;
  --muted: 217.2 32.6% 17.5%;
  --border: 217.2 32.6% 17.5%;
}
```

##### Color Usage Guidelines
- **Primary**: Main actions, primary buttons, active states
- **Secondary**: Secondary actions, less prominent elements
- **Destructive**: Delete actions, errors, critical warnings
- **Muted**: Disabled states, subtle backgrounds, helper text
- **Border**: Dividers, input borders, card outlines

#### Typography

##### Font System
```css
/* Primary Font */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Font Sizes (Tremor Scale) */
--tremor-metric: 1.875rem;     /* 30px - KPI values */
--tremor-title: 1.125rem;      /* 18px - Section titles */
--tremor-default: 0.875rem;    /* 14px - Body text */
--tremor-label: 0.75rem;       /* 12px - Labels */
```

##### Typography Guidelines
- **Headings**: Use semantic HTML (h1-h6) with consistent hierarchy
- **Body Text**: 14px base size, 1.5 line height for readability
- **Labels**: 12px for form labels and meta information
- **Metrics**: 30px for important KPI values

#### Spacing System

##### Base Scale
```css
/* Tailwind Spacing Scale */
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
5: 1.25rem (20px)
6: 1.5rem (24px)
8: 2rem (32px)
10: 2.5rem (40px)
12: 3rem (48px)
16: 4rem (64px)
```

##### Spacing Guidelines
- **Component Padding**: `p-4` (16px) standard, `p-6` (24px) for cards
- **Section Spacing**: `space-y-4` between sections
- **Form Fields**: `space-y-2` between form elements
- **Page Padding**: `p-8 pt-6` for main content areas

#### Border Radius
```css
--radius: 0.5rem;               /* Base radius */
--radius-sm: calc(var(--radius) - 2px);
--radius-md: var(--radius);
--radius-lg: calc(var(--radius) + 2px);
```

## Component Guidelines

### Buttons

#### Button Variants
```tsx
// Primary Action
<Button variant="default">Save Changes</Button>

// Secondary Action
<Button variant="secondary">Cancel</Button>

// Destructive Action
<Button variant="destructive">Delete</Button>

// Ghost Button (no background)
<Button variant="ghost">View More</Button>

// Outline Button
<Button variant="outline">Export</Button>

// Link Style
<Button variant="link">Learn More</Button>
```

#### Button Sizes
- **Small**: `size="sm"` - Compact spaces, inline actions
- **Default**: `size="default"` - Standard actions
- **Large**: `size="lg"` - Primary CTAs, landing pages
- **Icon**: `size="icon"` - Icon-only buttons

#### Button Best Practices
1. Use descriptive action verbs ("Save Changes" not "OK")
2. Primary action on the right, cancel on the left
3. Destructive actions require confirmation
4. Disabled state when action unavailable
5. Loading state during async operations

### Forms

#### Form Layout
```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
    <FormDescription>We'll never share your email.</FormDescription>
  </div>
</form>
```

#### Form Guidelines
1. **Labels**: Always use labels, never rely on placeholder text alone
2. **Required Fields**: Mark with asterisk (*) and aria-required
3. **Help Text**: Provide context below inputs
4. **Error Messages**: Clear, actionable error text
5. **Validation**: Real-time validation where helpful
6. **Field Grouping**: Use fieldsets for related fields

#### Input States
- **Default**: Standard input appearance
- **Focus**: Clear focus ring (2px blue outline)
- **Error**: Red border with error message below
- **Disabled**: Reduced opacity, not interactive
- **Loading**: Spinner icon in input

### Tables

#### Data Table Structure
```tsx
<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  showPagination
  showColumnVisibility
  showFilters
/>
```

#### Table Guidelines
1. **Headers**: Clear, concise column names
2. **Sorting**: Sortable columns with indicators
3. **Pagination**: 10/25/50/100 items per page options
4. **Search**: Global search and column filters
5. **Actions**: Row actions on the right
6. **Empty State**: Clear message when no data
7. **Loading**: Skeleton rows while loading

### Cards

#### Card Structure
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Brief description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

#### Card Usage
- **Information Display**: Group related content
- **Stats/Metrics**: Dashboard KPIs
- **Forms**: Contain form sections
- **Lists**: Display list items with actions

### Modals & Dialogs

#### Dialog Pattern
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description or instructions
      </DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Modal Guidelines
1. **Focus Management**: Auto-focus first interactive element
2. **Escape Key**: Close on Escape press
3. **Overlay Click**: Close on backdrop click (unless form with unsaved changes)
4. **Size**: Appropriate to content, max 600px width
5. **Title**: Always include descriptive title

### Navigation

#### Navigation Patterns
1. **Top Navigation**: Global navigation and user menu
2. **Sidebar**: Module navigation and quick actions
3. **Breadcrumbs**: Show location in hierarchy
4. **Tabs**: Switch between related views
5. **Pagination**: Navigate through large datasets

#### Navigation Guidelines
- Clear active state indicators
- Consistent placement across pages
- Mobile-responsive hamburger menu
- Keyboard navigation support
- ARIA labels for screen readers

## Layout Patterns

### Page Layout Structure
```tsx
<Container
  title="Page Title"
  description="Brief description of the page purpose"
>
  <div className="space-y-4">
    {/* Page content */}
  </div>
</Container>
```

### Grid Systems

#### Responsive Grid
```tsx
// Two column on desktop, stack on mobile
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card>...</Card>
  <Card>...</Card>
</div>

// Three column with responsive breakpoints
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Dashboard Layout
```tsx
// KPI Cards Row
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <StatsCard title="Total Revenue" value="$45,231.89" />
  <StatsCard title="Subscriptions" value="+2350" />
  <StatsCard title="Sales" value="+12,234" />
  <StatsCard title="Active Now" value="+573" />
</div>

// Charts Section
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
  <Card className="col-span-4">
    <BarChart />
  </Card>
  <Card className="col-span-3">
    <RecentActivity />
  </Card>
</div>
```

## Interaction Patterns

### Loading States

#### Loading Patterns
```tsx
// Full page loading
<LoadingComponent />

// Inline loading
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>

// Skeleton loading
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

#### Loading Guidelines
1. Show loading state immediately
2. Use skeletons for content structure
3. Preserve layout to prevent shifting
4. Show progress for long operations
5. Allow cancellation when possible

### Error Handling

#### Error Display Patterns
```tsx
// Form field error
<FormMessage className="text-sm text-destructive">
  This field is required
</FormMessage>

// Alert error
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please login again.
  </AlertDescription>
</Alert>

// Toast error
toast.error("Failed to save changes. Please try again.");
```

#### Error Guidelines
1. **Be Specific**: Tell users what went wrong
2. **Be Helpful**: Provide actionable next steps
3. **Be Human**: Use friendly, non-technical language
4. **Be Visible**: Ensure errors are noticeable
5. **Be Recoverable**: Allow users to retry or undo

### Empty States

#### Empty State Pattern
```tsx
<div className="flex flex-col items-center justify-center py-12">
  <FileX className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold">No documents found</h3>
  <p className="text-sm text-muted-foreground mb-4">
    Get started by uploading your first document
  </p>
  <Button>
    <Upload className="mr-2 h-4 w-4" />
    Upload Document
  </Button>
</div>
```

### Notifications

#### Toast Notifications
```tsx
// Success
toast.success("Changes saved successfully!");

// Error
toast.error("Failed to delete item");

// Info
toast.info("New update available");

// Custom with action
toast("Meeting reminder", {
  description: "Team standup in 5 minutes",
  action: {
    label: "Join",
    onClick: () => joinMeeting()
  }
});
```

#### Notification Guidelines
1. **Brief Messages**: Keep under 50 characters
2. **Auto-dismiss**: 4 seconds for success, persist for errors
3. **Non-blocking**: Don't cover important content
4. **Actionable**: Include action buttons when relevant
5. **Grouped**: Stack multiple notifications

## Accessibility Guidelines

### WCAG 2.1 Compliance

#### Level AA Requirements
1. **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
2. **Keyboard Navigation**: All interactive elements keyboard accessible
3. **Focus Indicators**: Visible focus rings
4. **Screen Reader Support**: Proper ARIA labels and roles
5. **Error Identification**: Clear error messages linked to fields

### Keyboard Navigation

#### Navigation Patterns
- **Tab**: Navigate forward through interactive elements
- **Shift+Tab**: Navigate backward
- **Enter**: Activate buttons and links
- **Space**: Toggle checkboxes, activate buttons
- **Arrow Keys**: Navigate menus, select options
- **Escape**: Close modals, cancel operations

### ARIA Implementation

#### Common ARIA Patterns
```tsx
// Accessible button with loading
<Button
  aria-label="Save document"
  aria-busy={isLoading}
  aria-disabled={isDisabled}
>
  {isLoading ? "Saving..." : "Save"}
</Button>

// Accessible form field
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    aria-describedby="email-error"
    aria-invalid={!!error}
    aria-required="true"
  />
  {error && (
    <span id="email-error" role="alert">
      {error}
    </span>
  )}
</div>
```

### Screen Reader Support

#### Best Practices
1. Use semantic HTML elements
2. Provide alternative text for images
3. Use headings to create document structure
4. Label all form inputs
5. Announce dynamic content changes
6. Provide skip navigation links

## Responsive Design

### Breakpoint System
```css
/* Tailwind Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Mobile-First Approach
```tsx
// Start with mobile, enhance for larger screens
<div className="
  p-4           // Mobile padding
  sm:p-6        // Small screen padding
  md:p-8        // Medium screen padding
  lg:flex       // Large screen flex layout
  lg:space-x-4  // Large screen spacing
">
```

### Responsive Patterns

#### Navigation
- **Mobile**: Hamburger menu with slide-out drawer
- **Tablet**: Condensed navigation bar
- **Desktop**: Full navigation with all options visible

#### Forms
- **Mobile**: Single column, full width inputs
- **Tablet**: Two column layout for related fields
- **Desktop**: Multi-column with inline labels option

#### Tables
- **Mobile**: Card view or horizontal scroll
- **Tablet**: Essential columns with actions menu
- **Desktop**: All columns with inline actions

## Animation & Transitions

### Animation Principles
1. **Purposeful**: Animations should enhance UX, not distract
2. **Fast**: 200-300ms for most transitions
3. **Smooth**: Use easing functions for natural motion
4. **Consistent**: Similar elements animate similarly
5. **Accessible**: Respect prefers-reduced-motion

### Common Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale */
@keyframes scale {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
```

### Transition Timing
- **Instant**: 0ms - Page navigation
- **Fast**: 150ms - Hover states, small transitions
- **Normal**: 250ms - Most animations
- **Slow**: 350ms - Complex animations, modals
- **Very Slow**: 500ms - Page transitions, large content changes

## Dark Mode

### Implementation
```tsx
// Theme provider setup
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
  <App />
</ThemeProvider>

// Theme toggle component
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="icon">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={() => setTheme("light")}>
      Light
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => setTheme("dark")}>
      Dark
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => setTheme("system")}>
      System
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dark Mode Guidelines
1. **Contrast**: Maintain readable contrast ratios
2. **Depth**: Use elevation with subtle shadows
3. **Colors**: Slightly desaturated colors in dark mode
4. **Consistency**: All components must support both themes
5. **System Preference**: Respect user's OS preference

## Performance Guidelines

### Optimization Strategies
1. **Code Splitting**: Dynamic imports for large components
2. **Image Optimization**: Use Next.js Image component
3. **Font Loading**: Optimize with next/font
4. **Bundle Size**: Tree-shake unused code
5. **Caching**: Implement proper cache strategies

### Performance Metrics
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **TTI**: < 3.8s (Time to Interactive)

## Icon Guidelines

### Icon Libraries
- **Primary**: Lucide React (consistent, modern icons)
- **Secondary**: Radix Icons (UI-specific icons)
- **Custom**: SVG icons in `/components/icons.tsx`

### Icon Sizes
```tsx
// Small (16px)
<Icon className="h-4 w-4" />

// Medium (20px) - Default
<Icon className="h-5 w-5" />

// Large (24px)
<Icon className="h-6 w-6" />

// Extra Large (32px)
<Icon className="h-8 w-8" />
```

### Icon Usage
1. **Consistency**: Use same icon for same action everywhere
2. **Context**: Include text labels for clarity
3. **Color**: Use currentColor for theme compatibility
4. **Accessibility**: Add aria-labels for icon-only buttons

## Data Visualization

### Chart Guidelines (Tremor)
1. **Chart Types**: Choose appropriate visualization for data
2. **Colors**: Use consistent color palette
3. **Labels**: Clear axis labels and legends
4. **Tooltips**: Interactive tooltips with details
5. **Responsive**: Charts adapt to container size

### Dashboard Best Practices
1. **Hierarchy**: Most important metrics at top
2. **Grouping**: Related metrics together
3. **Time Periods**: Clear date range selectors
4. **Refresh**: Auto-refresh with manual option
5. **Export**: Allow data export functionality

## Component Creation Guidelines

### New Component Checklist
- [ ] TypeScript interfaces defined
- [ ] Forwards refs when appropriate
- [ ] Supports all theme modes
- [ ] Keyboard navigation works
- [ ] ARIA attributes included
- [ ] Loading and error states handled
- [ ] Responsive on all breakpoints
- [ ] Animation respects reduced motion
- [ ] Documented with examples
- [ ] Unit tests written

### Component Template
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary"
  size?: "sm" | "md" | "lg"
}

const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, variant = "default", size = "md", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "base-styles",
        className
      )}
      {...props}
    />
  )
})

ComponentName.displayName = "ComponentName"

export { ComponentName }
```

## Testing UX/UI

### Visual Testing
1. **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
2. **Device Testing**: Test on actual devices, not just responsive mode
3. **Theme Testing**: Verify both light and dark modes
4. **Accessibility Testing**: Use screen readers and keyboard only
5. **Performance Testing**: Lighthouse audits

### User Testing Guidelines
1. **Task-based Testing**: Real user scenarios
2. **Think Aloud**: Users verbalize their process
3. **Recording**: Screen and audio recording
4. **Metrics**: Task completion rate, time, errors
5. **Iteration**: Continuous improvement based on feedback

## Migration & Updates

### Updating Components
1. **Deprecation Notices**: Announce before removing
2. **Migration Guides**: Provide clear upgrade paths
3. **Backward Compatibility**: Maintain when possible
4. **Changelog**: Document all changes
5. **Version Control**: Semantic versioning

## Resources

### Design Tools
- **Figma**: Design mockups and prototypes
- **Storybook**: Component documentation
- **Chromatic**: Visual regression testing

### Development Tools
- **shadcn/ui CLI**: Component installation
- **Tailwind CSS IntelliSense**: VS Code extension
- **React Developer Tools**: Browser extension

### References
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Last Updated: January 2025 | Version: 1.0.0 | NextCRM v0.0.3-beta*