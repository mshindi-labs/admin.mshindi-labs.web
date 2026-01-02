'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useFixtureCart } from '../hooks';

interface AddToCartButtonProps {
  /** Fixture ID */
  id: number;
  /** Home team name */
  homeTeam: string;
  /** Away team name */
  awayTeam: string;
}

/**
 * Add to cart button component
 *
 * Allows users to add or remove fixtures from the cart.
 * Shows different states based on whether the fixture is already in the cart.
 */
export function AddToCartButton({
  id,
  homeTeam,
  awayTeam,
}: AddToCartButtonProps) {
  const { addFixture, removeFixture, isInCart } = useFixtureCart();
  const inCart = isInCart(id);

  const handleClick = () => {
    if (inCart) {
      removeFixture(id);
      toast.success('Fixture removed from cart', {
        description: `${homeTeam} vs ${awayTeam}`,
      });
    } else {
      addFixture(id, homeTeam, awayTeam);
      toast.success('Fixture added to cart', {
        description: `${homeTeam} vs ${awayTeam}`,
      });
    }
  };

  return (
    <Button
      variant={inCart ? 'secondary' : 'default'}
      size='sm'
      onClick={handleClick}
      className='w-full sm:w-auto'
    >
      {inCart ? 'Remove' : 'Add to Cart'}
    </Button>
  );
}
