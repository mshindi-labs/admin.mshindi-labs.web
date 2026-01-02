'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { useFixtureCart } from '../hooks';

/**
 * Cart icon component with badge showing item count
 *
 * Displays a shopping cart icon with a badge showing the number of items
 * in the cart. Links to the cart page.
 */
export function CartIcon() {
  const { count } = useFixtureCart();

  return (
    <Link
      href='/dashboard/tactika/cart'
      className='relative inline-flex items-center justify-center'
      aria-label={`View cart (${count} ${count === 1 ? 'item' : 'items'})`}
    >
      <ShoppingCart className='h-5 w-5 sm:h-6 sm:w-6 text-foreground' />
      {count > 0 && (
        <Badge
          variant='destructive'
          className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs font-semibold'
        >
          {count > 99 ? '99+' : count}
        </Badge>
      )}
    </Link>
  );
}
