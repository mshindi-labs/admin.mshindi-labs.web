# CLAUDE.md - Web App

This file provides guidance to Claude Code (claude.ai/code) when working with
the **Next.js web application** in this monorepo.

## Web App Overview

This is the **web frontend** of the admin-mshindi-labs monorepo, built with:

- **Framework**: Next.js 16 with App Router and React 19
- **Styling**: TailwindCSS 4.x with shadcn/ui component library
- **State Management**: TanStack Query v5 for server state, TanStack Form for
  forms
- **UI Components**: Radix UI primitives via shadcn/ui
- **Theme**: next-themes for dark/light mode switching
- **Build**: Turborepo integration with Bun, runs on port 3001

## Development Commands

### Web App Specific Commands

- `bun dev` - Start Next.js development server (from project root)
- `bun dev:web` - Start only web app (from project root)
- `bun --filter web dev` - Start web app (from any directory)
- `bun --filter web build` - Build web app for production
- `bun --filter web start` - Start production server

## Mobile-First Development Approach

**Always design and develop for mobile first (320px+), then progressively
enhance for larger screens.**

### Mobile-First Principles

- Start with the mobile experience as the foundation
- Use Tailwind's mobile-first breakpoint system: `sm:` (640px+), `md:` (768px+),
  `lg:` (1024px+), `xl:` (1280px+)
- Touch-friendly interfaces with adequate tap targets (min 44px)
- Consider thumb-reachable navigation zones
- Optimize for slower mobile connections and limited bandwidth

### Responsive Design Patterns

```typescript
// ✅ Mobile-first approach
<div className="
  flex flex-col space-y-4      // Mobile: vertical stack
  sm:flex-row sm:space-y-0 sm:space-x-4  // Small+: horizontal layout
  md:space-x-6               // Medium+: more spacing
">
  <h1 className="
    text-xl                   // Mobile: smaller text
    sm:text-2xl              // Small+: larger text
    md:text-3xl              // Medium+: even larger
  ">Title</h1>
</div>

// ❌ Desktop-first approach (avoid)
<div className="
  flex-row space-x-6        // Assumes desktop layout
  md:flex-col md:space-x-0  // Breaks on smaller screens
">
```

## Feature-Led Component Architecture

The web app uses a feature-led component structure for better scalability and
maintainability:

### From Web App Directory

When in `apps/web/`, you can run:

- `bun dev` - Start development server on port 3001
- `bun build` - Build for production
- `bun start` - Start production server

## File Structure

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   └── favicon.ico        # App icon
│   ├── components/            # Feature-led component organization
│   │   ├── landing/           # Landing page feature
│   │   │   ├── index.ts       # LandingPage component export
│   │   │   ├── hero-section.tsx
│   │   │   ├── action-buttons.tsx
│   │   │   ├── feature-highlight.tsx
│   │   │   └── gradient-background.tsx
│   │   ├── dashboard/         # Dashboard feature (future)
│   │   ├── header.tsx         # Global components
│   │   ├── loader.tsx         # Loading component
│   │   ├── mode-toggle.tsx    # Dark/light mode toggle
│   │   ├── providers.tsx      # App providers wrapper
│   │   ├── theme-provider.tsx # Theme context provider
│   │   └── ui/               # shadcn/ui shared components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── skeleton.tsx
│   │       └── sonner.tsx
│   ├── lib/
│   │   └── utils.ts          # Utility functions (cn helper)
│   └── index.css             # Global CSS with TailwindCSS
├── components.json           # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── package.json             # Web app dependencies
└── tsconfig.json           # TypeScript configuration
```

## Technology Stack Details

### Next.js 16 with App Router (Mobile-First)

- **Mobile-First Development**: Always start designing for mobile (320px+), then
  enhance for larger screens
- Use App Router structure in `src/app/`
- Server and Client Components as appropriate
- Proper metadata API for SEO
- Image optimization with `next/image` (ensure responsive images)
- Geist font loaded in layout with proper responsive sizing

### React 19 Features

- Concurrent features and Suspense
- Use modern React patterns
- Error boundaries for better UX
- Proper component composition

### TailwindCSS 4.x + shadcn/ui (Mobile-First)

- **Mobile-First Utility Approach**: Start with mobile styles, enhance with
  `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Component library from shadcn/ui with responsive patterns
- Custom CSS variables for theming
- Mobile-first responsive design with progressive enhancement
- Dark/light mode support across all screen sizes

### Key Dependencies

- `@tanstack/react-query` - Server state management
- `@tanstack/react-form` - Form handling
- `next-themes` - Theme switching
- `class-variance-authority` - Component variants
- `clsx` + `tailwind-merge` - Conditional styling
- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `zod` - Schema validation

## Component Patterns

### Feature-Led Organization

Components are organized by feature rather than type for better scalability:

```typescript
// ✅ Feature-based structure (preferred)
components/
├── landing/           # Landing page feature
│   ├── index.ts       # Main export
│   ├── hero-section.tsx
│   ├── action-buttons.tsx
│   └── feature-highlight.tsx
├── dashboard/         # Dashboard feature
├── header.tsx         # Global components
└── ui/               # Shared UI primitives

// ❌ Type-based structure (avoid)
components/
├── buttons/
├── forms/
├── sections/
└── layouts/
```

### Feature Index Pattern

Each feature should export a main component through `index.ts`:

```typescript
// components/landing/index.ts
import { HeroSection } from "./hero-section";
import { ActionButtons } from "./action-buttons";
import { FeatureHighlight } from "./feature-highlight";
// ... other imports

interface LandingPageProps {
  className?: string;
}

export function LandingPage({ className }: LandingPageProps) {
  return (
    <div className={className}>
      {/* Compose feature components */}
      <HeroSection title="..." subtitle="..." />
      <ActionButtons primaryText="..." secondaryText="..." />
      <FeatureHighlight features={[...]} />
    </div>
  );
}
```

### Page Usage

Pages import and use entire features:

```typescript
// app/page.tsx
import { LandingPage } from "@/components/landing";

export default function Home() {
  return <LandingPage />;
}
```

### Basic Component Structure

```typescript
interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  variant?: 'default' | 'secondary';
  className?: string;
}

export function Component({
  title,
  description,
  onAction,
  variant = 'default',
  className
}: ComponentProps) {
  return (
    <div className={cn(
      // Mobile-first: flex-col on mobile, then responsive adjustments
      "flex flex-col space-y-2 p-4 sm:p-6",
      variant === 'secondary' && "bg-secondary",
      className
    )}>
      <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      )}
      {onAction && (
        <Button onClick={onAction} className="self-start w-full sm:w-auto">
          Action
        </Button>
      )}
    </div>
  );
}
```

### Page Component Structure

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - admin-mshindi-labs',
  description: 'Page description for SEO',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <div className="flex flex-col space-y-4 sm:space-y-6">
        <header className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Page Title</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Page description</p>
        </header>

        <main>
          {/* Page content - mobile-first responsive design */}
        </main>
      </div>
    </div>
  );
}
```

### shadcn/ui Integration

```typescript
// Use existing shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ExampleForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Title</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter text..." />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
```

## State Management Patterns

### TanStack Query Usage

```typescript
// In hooks/ or lib/
export function useData(filters?: DataFilters) {
  return useQuery({
    queryKey: ['data', filters],
    queryFn: async () => {
      const response = await fetch('/api/data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// In component
export function DataList() {
  const { data, isLoading, error } = useData();

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error.message}</div>;

  return (
    // Mobile-first grid: 1 column on mobile, 2 on sm, 3 on lg
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((item) => (
        <DataCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### Form Handling

```typescript
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

const dataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  value: z.number().min(0, 'Value must be positive'),
});

export function DataForm() {
  const form = useForm({
    defaultValues: { title: '', value: 0 },
    onSubmit: async ({ value }) => {
      const validatedData = dataSchema.parse(value);
      // Handle form submission
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="title"
        children={(field) => (
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors && (
              <p className="text-sm text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Styling Guidelines

### TailwindCSS Usage (Mobile-First)

- **Mobile-First Responsive Classes**: Start with mobile, enhance with
  breakpoints
  - Typography: `text-sm sm:text-base md:text-lg lg:text-xl`
  - Layout: `flex-col sm:flex-row`, `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
  - Spacing: `p-4 sm:p-6 md:p-8`, `space-y-2 sm:space-y-4`
  - Sizing: `w-full sm:w-auto`, `max-w-xs sm:max-w-md md:max-w-lg`
- Use semantic color classes: `text-foreground`, `bg-background`,
  `border-border`
- Interactive states: `hover:bg-accent`, `focus:ring-2`, `active:scale-95`

### Component Variants

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "shadow-md border-border/50",
        outlined: "border-2 border-border shadow-none",
      },
      size: {
        sm: "p-3",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  className?: string;
  children: React.ReactNode;
}

export function Card({ variant, size, className, children }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, size }), className)}>
      {children}
    </div>
  );
}
```

## Linear-Inspired Theme Implementation

### Advanced Dark/Light Mode (Linear Style)

Implements Linear's sophisticated theme system with `next-themes`:

```typescript
// Already implemented in theme-provider.tsx
import { ThemeProvider } from '@/components/theme-provider';

// Usage in components
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </Button>
  );
}
```

## Performance Best Practices

### Next.js Optimization

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div>Loading...</div>,
});

// Image optimization
import Image from 'next/image';

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="rounded-lg object-cover"
      priority // For above-the-fold images
    />
  );
}
```

### Component Optimization

```typescript
import { memo, useMemo, useCallback } from 'react';

export const DataCard = memo(function DataCard({
  item,
  onSelect,
}: DataCardProps) {
  const formattedValue = useMemo(
    () => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(item.value),
    [item.value]
  );

  const handleSelect = useCallback(() => {
    onSelect?.(item.id);
  }, [onSelect, item.id]);

  return (
    <Card onClick={handleSelect}>
      <CardContent>
        <h3>{item.title}</h3>
        <p>{formattedValue}</p>
      </CardContent>
    </Card>
  );
});
```

## Error Handling

### Error Boundaries

```typescript
'use client';

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-lg font-semibold text-destructive mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        {error.message}
      </p>
      <Button onClick={resetErrorBoundary} variant="outline">
        Try again
      </Button>
    </div>
  );
}

export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
```

### Loading States

```typescript
import { Skeleton } from '@/components/ui/skeleton';

export function DataListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## Testing Patterns

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { DataCard } from './data-card';

const mockItem = {
  id: '1',
  title: 'Test Item',
  value: 100,
};

describe('DataCard', () => {
  it('renders item information correctly', () => {
    render(<DataCard item={mockItem} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = jest.fn();
    render(<DataCard item={mockItem} onSelect={onSelect} />);

    const card = screen.getByRole('button');
    await userEvent.click(card);

    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

## Key Files to Understand

- `src/app/layout.tsx` - Root layout with providers and theme setup
- `src/components/providers.tsx` - App-wide providers (TanStack Query, Theme)
- `src/components/ui/` - shadcn/ui component library
- `src/lib/utils.ts` - Utility functions including `cn` helper
- `components.json` - shadcn/ui configuration
- `next.config.ts` - Next.js configuration

## Development Workflow

1. Start development server: `bun dev` (from root) or `bun dev:web`
2. Add new pages in `src/app/` following App Router conventions
3. Create components in `src/components/` with proper TypeScript interfaces
4. Use shadcn/ui components from `src/components/ui/`
5. Add custom hooks in `src/hooks/` (create directory if needed)
6. Use TanStack Query for data fetching and state management
7. Test components and functionality
8. Build and verify: `bun --filter web build`

## Important Notes

- This is a frontend-only application (no backend API routes included)
- Uses port 3001 in development to avoid conflicts
- Integrated with monorepo Turborepo build system using Bun
- Follows established shadcn/ui patterns and conventions
- Dark/light theme support is built-in
- TypeScript strict mode is enabled for better type safety
- Biome is used for linting (not ESLint)
