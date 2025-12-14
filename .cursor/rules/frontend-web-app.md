# Frontend Web App Development Rules

## Overview

This repository is a TypeScript monorepo containing a Next.js 16 web application
using Turborepo for build orchestration.

## Technology Stack

### Web Application (apps/web)

- **Framework**: Next.js 16 with App Router
- **React**: Version 19 with concurrent features
- **Styling**: TailwindCSS 4.x with shadcn/ui components
- **State Management**: TanStack Query v5 for server state
- **Forms**: TanStack Form with Zod validation
- **Theme**: next-themes for dark/light mode
- **Linting**: Biome for code formatting and linting

### Shared Technologies

- **Language**: TypeScript with strict mode
- **Package Manager**: Bun with workspaces
- **Build System**: Turborepo for monorepo management
- **Validation**: Zod for schema validation

## Development Commands

### Monorepo Commands

```bash
bun dev              # Start all apps
bun build            # Build all apps
bun check-types      # TypeScript check all apps
bun check            # Run Biome linting
```

### Web App Commands

```bash
bun dev:web          # Start Next.js dev server (port 3001)
bun --filter web build   # Build web app
bun --filter web start   # Start production server
```

## Code Organization Rules

### File Structure

```
apps/
├── web/
│   └── src/
│       ├── app/           # Next.js pages (App Router)
│       ├── components/    # React components
│       │   └── ui/       # shadcn/ui components
│       ├── lib/          # Utilities
│       ├── hooks/        # Custom hooks
│       └── types/        # Type definitions
packages/
├── config/               # Shared configuration
```

### Naming Conventions

- **Files/Directories**: kebab-case (`user-profile.tsx`)
- **Components/Types**: PascalCase (`UserProfile`, `ApiResponse`)
- **Variables/Functions**: camelCase (`userData`, `fetchData`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Hooks**: camelCase with "use" prefix (`useUser`)

## Component Patterns

### Web Component (Next.js + shadcn/ui)

```typescript
interface ComponentProps {
  title: string;
  onSelect?: (id: string) => void;
  variant?: 'default' | 'compact';
}

export function Component({
  title,
  onSelect,
  variant = 'default'
}: ComponentProps) {
  return (
    <Card className={cn(
      "cursor-pointer transition-colors hover:bg-accent",
      variant === 'compact' && "p-3"
    )}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
```

## State Management Patterns

### TanStack Query Usage

```typescript
// Query hook
export function useData(filters?: DataFilters) {
  return useQuery({
    queryKey: ['data', filters],
    queryFn: () => api.getData(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Mutation hook
export function useCreateData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['data'] });
    },
  });
}
```

### Form Handling with TanStack Form

```typescript
const createSchema = z.object({
  title: z.string().min(1, 'Title required'),
  description: z.string().optional(),
});

export function CreateForm() {
  const createData = useCreateData();

  const form = useForm({
    defaultValues: { title: '', description: '' },
    onSubmit: async ({ value }) => {
      const data = createSchema.parse(value);
      await createData.mutateAsync(data);
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
      {/* Form fields */}
    </form>
  );
}
```

## Styling Guidelines

### TailwindCSS (Web)

- Use semantic classes: `text-foreground`, `bg-background`, `border-border`
- Mobile-first responsive design: `sm:grid-cols-2`, `md:grid-cols-3`, `lg:grid-cols-4`
- Component variants with `class-variance-authority`
- Dark mode support with automatic theme switching

## TypeScript Standards

### Interface Definitions

```typescript
// Shared types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Component props
export interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}
```

### Custom Hooks

```typescript
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
```

## Error Handling Patterns

### Error Boundary

```typescript
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={({ error, resetErrorBoundary }) => (
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
      )}
    >
      {children}
    </ErrorBoundaryComponent>
  );
}
```

### API Error Handling

```typescript
export const api = {
  async getData(filters?: DataFilters): Promise<Data[]> {
    try {
      const response = await fetch('/api/data', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  },
};
```

## Performance Best Practices

### React Optimization

```typescript
// Memoized component
export const DataList = React.memo(function DataList({
  items,
  onSelectItem,
}: DataListProps) {
  const handleSelect = useCallback((id: string) => {
    onSelectItem(id);
  }, [onSelectItem]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((item) => (
        <DataCard
          key={item.id}
          item={item}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
});
```

## Accessibility Guidelines

### Web Accessibility

```typescript
export function SearchInput({ onSearch }: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
```

## Security Considerations

- Use environment variables for configuration
- Validate all user inputs with Zod schemas
- Sanitize data before displaying to prevent XSS
- Use HTTPS for all API communications
- Implement proper error handling without exposing sensitive data
- Use TypeScript strict mode to catch potential issues

## Code Review Checklist

- [ ] TypeScript interfaces defined for all props and data structures
- [ ] Components follow established naming conventions
- [ ] Styling uses consistent TailwindCSS classes
- [ ] Error handling implemented properly
- [ ] Loading states provided for async operations
- [ ] Accessibility attributes added where needed
- [ ] Performance optimizations applied (memo)
- [ ] Code follows established patterns in the codebase
