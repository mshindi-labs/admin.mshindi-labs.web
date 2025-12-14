# Linear-Inspired Design System Rules

## Overview

This document outlines the Linear-inspired design system implementation for the
web application (Next.js + TailwindCSS).

## Design Philosophy

Linear's design system is characterized by:

- **Minimalism**: Clean, uncluttered interfaces with purposeful whitespace
- **Sophistication**: Refined color choices and typography hierarchies
- **Consistency**: Seamless experience across light and dark themes
- **Performance**: Smooth animations and transitions (200ms standard)
- **Accessibility**: Proper contrast ratios and interactive target sizes

## Color System

### Primary Palette

```css
/* Linear Blue - Primary Brand Color */
--primary: #0ea5e9;
--primary-hover: #0284c7;
--primary-active: #0369a1;
--primary-foreground: #ffffff;
```

### Gray Scale (Linear-inspired neutrals)

```css
/* Light to Dark spectrum */
--gray-50: #fafafa; /* Lightest background */
--gray-100: #f4f4f5; /* Secondary surfaces */
--gray-200: #e4e4e7; /* Borders, subtle dividers */
--gray-300: #d4d4d8; /* Placeholder text */
--gray-400: #a1a1aa; /* Tertiary text */
--gray-500: #71717a; /* Secondary text */
--gray-600: #52525b; /* Primary text (light mode) */
--gray-700: #3f3f46; /* Dark surfaces */
--gray-800: #27272a; /* Darker surfaces */
--gray-900: #18181b; /* Darkest surfaces */
--gray-950: #09090b; /* Pure dark background */
```

### Semantic Colors

```css
/* Light Theme */
:root {
  /* Text Hierarchy */
  --text-primary: #09090b;
  --text-secondary: #52525b;
  --text-tertiary: #a1a1aa;
  --text-quaternary: #d4d4d8;

  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #fafafa;
  --bg-tertiary: #f4f4f5;

  /* Status Colors */
  --success: #22c55e;
  --success-bg: #f0fdf4;
  --error: #ef4444;
  --error-bg: #fef2f2;
  --warning: #f97316;
  --warning-bg: #fffbeb;
}

/* Dark Theme */
.dark {
  /* Text Hierarchy */
  --text-primary: #ffffff;
  --text-secondary: #d4d4d8;
  --text-tertiary: #a1a1aa;
  --text-quaternary: #71717a;

  /* Backgrounds */
  --bg-primary: #09090b;
  --bg-secondary: #18181b;
  --bg-tertiary: #27272a;

  /* Status Colors (adjusted for dark mode) */
  --success: #4ade80;
  --success-bg: #052e16;
  --error: #f87171;
  --error-bg: #450a0a;
  --warning: #fb923c;
  --warning-bg: #431407;
}
```

## Typography

### Font Stack

- **Primary**: Inter Variable (supports all font weights seamlessly)
- **Fallbacks**: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  sans-serif
- **Monospace**: JetBrains Mono, Menlo, Monaco, Cascadia Code, monospace

### Type Scale

```css
/* Linear-inspired typography scale */
--text-xs: 12px; /* line-height: 16px, letter-spacing: 0.025em */
--text-sm: 14px; /* line-height: 20px, letter-spacing: 0.025em */
--text-base: 16px; /* line-height: 24px, letter-spacing: 0.015em */
--text-lg: 18px; /* line-height: 28px, letter-spacing: 0.015em */
--text-xl: 20px; /* line-height: 28px, letter-spacing: 0.01em */
--text-2xl: 24px; /* line-height: 32px, letter-spacing: 0.01em */
--text-3xl: 30px; /* line-height: 36px, letter-spacing: 0.005em */
```

### Font Weights

- **Normal**: 400 (body text)
- **Medium**: 500 (emphasized text)
- **Semibold**: 600 (headings, labels)
- **Bold**: 700 (rare, high emphasis)

## Spacing System

### 8px Base Unit System

```css
/* Consistent spacing scale */
--space-1: 4px; /* 0.25rem */
--space-2: 8px; /* 0.5rem - Base unit */
--space-3: 12px; /* 0.75rem */
--space-4: 16px; /* 1rem - Common padding */
--space-6: 24px; /* 1.5rem - Section spacing */
--space-8: 32px; /* 2rem - Large spacing */
--space-12: 48px; /* 3rem - Component separation */
--space-16: 64px; /* 4rem - Layout spacing */
```

## Interactive Design Patterns

### Button States (Linear Style)

```css
/* Primary Button */
.btn-primary {
  background: var(--primary);
  color: var(--primary-foreground);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: var(--primary-active);
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-hover);
}
```

### Card Components (Linear Style)

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: var(--space-4);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.card-elevated {
  background: var(--bg-elevated);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## Component Patterns

### Web (Next.js + TailwindCSS)

```tsx
// Linear-inspired card component
export function LinearCard({
  children,
  variant = 'default',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // Base styles
        'bg-background border border-border rounded-md p-4',
        'shadow-sm transition-all duration-200',
        // Hover state
        'hover:shadow-md hover:-translate-y-0.5',
        // Variants
        variant === 'elevated' && 'shadow-md bg-card',
        variant === 'outlined' && 'border-2 shadow-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Linear-inspired button
export function LinearButton({
  children,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-200 focus:outline-none focus:ring-2',
        'focus:ring-primary focus:ring-offset-2 disabled:opacity-50',
        // Sizes
        size === 'sm' && 'h-8 px-3 text-sm',
        size === 'default' && 'h-9 px-4 text-sm',
        size === 'lg' && 'h-10 px-6 text-base',
        // Variants
        variant === 'primary' &&
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
        variant === 'secondary' &&
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Status and Feedback Patterns

### Loading States

```tsx
// Linear-inspired skeleton loader
export function LinearSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-tertiary', className)}
      {...props}
    />
  );
}

// Linear-inspired loading spinner
export function LinearSpinner({ size = 'default', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-border border-t-primary',
        size === 'sm' && 'h-4 w-4',
        size === 'default' && 'h-6 w-6',
        size === 'lg' && 'h-8 w-8',
        className,
      )}
    />
  );
}
```

### Status Messages

```tsx
// Linear-inspired status badge
export function LinearBadge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-secondary text-secondary-foreground',
        variant === 'success' &&
          'bg-success/10 text-success border border-success/20',
        variant === 'error' && 'bg-error/10 text-error border border-error/20',
        variant === 'warning' &&
          'bg-warning/10 text-warning border border-warning/20',
        className,
      )}
    >
      {children}
    </span>
  );
}
```

## Animation Guidelines

### Transitions

- **Duration**: 200ms for most interactions
- **Easing**: `ease` or `cubic-bezier(0.4, 0, 0.2, 1)`
- **Properties**: Focus on `opacity`, `transform`, `background-color`

### Micro-interactions

```css
/* Hover lift effect */
.hover-lift:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

/* Button press effect */
.press-effect:active {
  transform: scale(0.98);
}

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.2s ease-out;
}
```

## Accessibility Considerations

### Color Contrast

- Text on background: Minimum 4.5:1 ratio
- Interactive elements: Minimum 3:1 ratio
- Status colors meet WCAG AA standards

### Touch Targets

- Minimum 44px × 44px for all interactive elements
- Adequate spacing between touch targets (8px minimum)

### Focus Indicators

- Visible focus rings with 2px width
- High contrast colors for focus states
- Keyboard navigation support

## Implementation Checklist

### Web App

- [ ] Linear color palette implemented in CSS custom properties
- [ ] Inter Variable font loaded and configured
- [ ] Theme switching with next-themes
- [ ] shadcn/ui components customized with Linear styles
- [ ] Proper focus indicators and accessibility
- [ ] Smooth transitions between theme modes

### Cross-Platform

- [ ] Consistent semantic color naming
- [ ] Shared constants for colors and spacing
- [ ] Typography scale consistency
- [ ] Interactive state patterns
- [ ] Status and feedback components
- [ ] Loading states and skeletons
