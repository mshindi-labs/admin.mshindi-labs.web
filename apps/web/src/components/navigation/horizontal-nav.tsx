'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export interface NavItem {
  /** Display label for the navigation item */
  label: string;
  /** URL path for the navigation item (optional if has children) */
  href?: string;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Badge content (e.g., count, "new", etc.) */
  badge?: React.ReactNode;
  /** External link - opens in new tab */
  external?: boolean;
  /** Nested navigation items (creates a dropdown) */
  children?: NavItem[];
  /** Separator before this item in dropdown */
  separator?: boolean;
}

export interface HorizontalNavProps {
  /** Array of navigation items to display */
  items: NavItem[];
  /** Base path for active state matching (defaults to exact match) */
  basePath?: string;
  /** Additional CSS classes for the nav container */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'pills' | 'underline';
  /** Whether to show a bottom border on the container */
  showBorder?: boolean;
  /** Custom active state matcher function */
  isActiveMatch?: (href: string, pathname: string) => boolean;
  /** Gap between nav items */
  gap?: 'tight' | 'normal' | 'loose';
  /** Whether to make items full width on mobile */
  fullWidthMobile?: boolean;
}

const sizeStyles = {
  sm: {
    nav: 'text-xs',
    item: 'px-2.5 py-1.5',
    indicator: 'h-0.5',
    chevron: 'size-3',
  },
  md: {
    nav: 'text-sm',
    item: 'px-3 py-2',
    indicator: 'h-0.5',
    chevron: 'size-3.5',
  },
  lg: {
    nav: 'text-base',
    item: 'px-4 py-2.5',
    indicator: 'h-[3px]',
    chevron: 'size-4',
  },
};

const gapStyles = {
  tight: 'gap-0.5',
  normal: 'gap-1',
  loose: 'gap-2',
};

/**
 * HorizontalNav - A highly customizable, responsive horizontal navigation component
 *
 * Inspired by Vercel's navigation design with clean, minimalist aesthetics.
 * Supports multiple variants, sizes, responsive behavior, and nested items.
 *
 * @example
 * ```tsx
 * <HorizontalNav
 *   items={[
 *     { label: 'Overview', href: '/dashboard' },
 *     { label: 'Settings', href: '/dashboard/settings' },
 *     {
 *       label: 'More',
 *       children: [
 *         { label: 'API', href: '/dashboard/api' },
 *         { label: 'Docs', href: 'https://docs.example.com', external: true },
 *       ],
 *     },
 *   ]}
 *   variant="underline"
 * />
 * ```
 */
export function HorizontalNav({
  items,
  basePath,
  className,
  size = 'md',
  variant = 'underline',
  showBorder = true,
  isActiveMatch,
  gap = 'normal',
  fullWidthMobile = false,
}: HorizontalNavProps) {
  const pathname = usePathname();

  const isActive = React.useCallback(
    (href: string | undefined): boolean => {
      if (!href) return false;

      if (isActiveMatch) {
        return isActiveMatch(href, pathname);
      }

      // If basePath is provided, check if pathname starts with href
      if (basePath) {
        // Exact match for the base path itself
        if (href === basePath) {
          return pathname === basePath || pathname === `${basePath}/`;
        }
        // For sub-paths, check if pathname starts with href
        return pathname.startsWith(href);
      }

      // Default: exact match
      return pathname === href;
    },
    [basePath, isActiveMatch, pathname],
  );

  // Check if any child is active (for dropdown parent highlighting)
  const hasActiveChild = React.useCallback(
    (item: NavItem): boolean => {
      if (!item.children) return false;
      return item.children.some(
        (child) => isActive(child.href) || hasActiveChild(child),
      );
    },
    [isActive],
  );

  const styles = sizeStyles[size];

  return (
    <nav
      className={cn(
        'relative w-full overflow-x-auto overflow-y-hidden ',
        showBorder && 'border-b border-border',
        className,
      )}
      role='navigation'
      aria-label='Horizontal navigation'
    >
      <div className='-mb-px flex min-w-max py-2'>
        <ul
          className={cn(
            'flex items-center',
            gapStyles[gap],
            styles.nav,
            fullWidthMobile && 'w-full sm:w-auto',
          )}
          role='list'
        >
          {items.map((item, index) => (
            <NavItemComponent
              key={item.href || `nav-item-${index}`}
              item={item}
              isActive={isActive(item.href) || hasActiveChild(item)}
              isExactActive={isActive(item.href)}
              size={size}
              variant={variant}
              fullWidthMobile={fullWidthMobile}
              checkIsActive={isActive}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

interface NavItemComponentProps {
  item: NavItem;
  isActive: boolean;
  isExactActive: boolean;
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'pills' | 'underline';
  fullWidthMobile?: boolean;
  checkIsActive: (href: string | undefined) => boolean;
}

function NavItemComponent({
  item,
  isActive,
  isExactActive,
  size,
  variant,
  fullWidthMobile,
  checkIsActive,
}: NavItemComponentProps) {
  const styles = sizeStyles[size];
  const hasChildren = item.children && item.children.length > 0;

  const baseItemStyles = cn(
    'relative flex items-center gap-1.5 font-medium transition-colors duration-200',
    styles.item,
    fullWidthMobile && 'flex-1 justify-center sm:flex-initial',
  );

  const variantStyles = {
    default: cn(
      'rounded-md',
      isActive
        ? 'bg-secondary text-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
    ),
    pills: cn(
      'rounded-full',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
    ),
    underline: cn(
      isActive
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground',
    ),
  };

  const itemClasses = cn(
    baseItemStyles,
    variantStyles[variant],
    item.disabled && 'pointer-events-none opacity-50',
  );

  // If item has children, render as dropdown
  if (hasChildren) {
    return (
      <li className={cn(fullWidthMobile && 'flex-1 sm:flex-initial')}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className={cn(itemClasses, 'cursor-pointer')}
              disabled={item.disabled}
            >
              {item.icon && <span className='shrink-0'>{item.icon}</span>}
              <span>{item.label}</span>
              {item.badge && (
                <span className='ml-1.5 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary'>
                  {item.badge}
                </span>
              )}
              <ChevronDownIcon
                className={cn(
                  styles.chevron,
                  'ml-0.5 opacity-50 transition-transform duration-200',
                )}
                aria-hidden='true'
              />
              {/* Underline indicator for underline variant */}
              {variant === 'underline' && isActive && (
                <span
                  className={cn(
                    'absolute inset-x-0 -bottom-px bg-foreground',
                    styles.indicator,
                  )}
                  aria-hidden='true'
                />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='min-w-[180px]'>
            {item.children?.map((child, index) => (
              <React.Fragment key={child.href || `dropdown-item-${index}`}>
                {child.separator && index > 0 && <DropdownMenuSeparator />}
                <DropdownNavItem
                  item={child}
                  isActive={checkIsActive(child.href)}
                />
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    );
  }

  // Regular nav item (no children)
  const linkProps = item.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <li className={cn(fullWidthMobile && 'flex-1 sm:flex-initial')}>
      <Link
        href={(item.disabled ? '#' : item.href ?? '#') as Route}
        className={itemClasses}
        aria-current={isExactActive ? 'page' : undefined}
        aria-disabled={item.disabled}
        {...linkProps}
      >
        {item.icon && <span className='shrink-0'>{item.icon}</span>}
        <span>{item.label}</span>
        {item.badge && (
          <span className='ml-1.5 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary'>
            {item.badge}
          </span>
        )}
        {item.external && (
          <svg
            className='size-3 opacity-50'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        )}
        {/* Underline indicator for underline variant */}
        {variant === 'underline' && isExactActive && (
          <span
            className={cn(
              'absolute inset-x-0 -bottom-px bg-foreground',
              styles.indicator,
            )}
            aria-hidden='true'
          />
        )}
      </Link>
    </li>
  );
}

interface DropdownNavItemProps {
  item: NavItem;
  isActive: boolean;
}

function DropdownNavItem({ item, isActive }: DropdownNavItemProps) {
  const linkProps = item.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <DropdownMenuItem
      asChild
      disabled={item.disabled}
      className={cn(
        'cursor-pointer',
        isActive && 'bg-accent text-accent-foreground',
      )}
    >
      <Link
        href={(item.disabled ? '#' : item.href ?? '#') as Route}
        {...linkProps}
      >
        {item.icon && <span className='shrink-0'>{item.icon}</span>}
        <span className='flex-1'>{item.label}</span>
        {item.badge && (
          <span className='ml-2 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary'>
            {item.badge}
          </span>
        )}
        {item.external && (
          <svg
            className='size-3 opacity-50'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        )}
      </Link>
    </DropdownMenuItem>
  );
}

export default HorizontalNav;
