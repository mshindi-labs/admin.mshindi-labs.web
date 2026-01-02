'use client';

import * as React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ShoppingCart, Trash2, X, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFixtureCart } from '../fixtures/hooks';
import { useComboPrediction } from './hooks/use-combo-prediction';

/**
 * Cart Page
 *
 * Displays all selected fixtures in the cart with options to remove items
 * or clear the entire cart.
 */
export default function CartPage() {
  const { items, removeFixture, clearCart } = useFixtureCart();
  const comboPrediction = useComboPrediction();

  const handleRemove = (id: number, homeTeam: string, awayTeam: string) => {
    removeFixture(id);
    toast.success('Fixture removed from cart', {
      description: `${homeTeam} vs ${awayTeam}`,
    });
  };

  const handleClearAll = () => {
    if (items.length === 0) return;
    clearCart();
    toast.success('Cart cleared', {
      description: 'All fixtures have been removed from the cart.',
    });
  };

  const handlePredictCombo = async () => {
    if (items.length === 0) {
      toast.error('Cart is empty', {
        description: 'Please add fixtures to the cart before predicting.',
      });
      return;
    }

    if (items.length < 13) {
      toast.error('Insufficient fixtures', {
        description: 'Please select at least 13 fixtures to predict combo.',
      });
      return;
    }

    const fixtureIds = items.map((item) => item.id);
    comboPrediction.mutate(
      { fixture_ids: fixtureIds },
      {
        onSuccess: () => {
          toast.success('Combo prediction initiated', {
            description: `Predicting ${items.length} ${
              items.length === 1 ? 'fixture' : 'fixtures'
            }`,
          });
        },
      },
    );
  };

  const canPredictCombo = items.length >= 13;

  return (
    <div className='container mx-auto py-6 sm:py-8 lg:py-10'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-lg font-bold tracking-tight sm:text-xl'>
              Fixture Cart
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              {items.length === 0
                ? 'Your cart is empty'
                : `${items.length} ${
                    items.length === 1 ? 'fixture' : 'fixtures'
                  } selected${
                    items.length > 0 && items.length < 13
                      ? ` (minimum 13 required)`
                      : ''
                  }`}
            </p>
          </div>
          {items.length > 0 && (
            <div className='flex flex-col gap-2 sm:flex-row'>
              <Button
                variant='default'
                size='sm'
                onClick={handlePredictCombo}
                disabled={comboPrediction.isPending || !canPredictCombo}
                className='w-full sm:w-auto'
                title={
                  !canPredictCombo
                    ? 'Select at least 13 fixtures to predict combo'
                    : undefined
                }
              >
                <Sparkles className='mr-2 h-4 w-4' />
                {comboPrediction.isPending ? 'Predicting...' : 'Predict Combo'}
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={handleClearAll}
                className='w-full sm:w-auto'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-12'>
              <ShoppingCart className='mb-4 h-12 w-12 text-muted-foreground' />
              <CardTitle className='mb-2'>Your cart is empty</CardTitle>
              <CardDescription className='mb-6 text-center'>
                Add fixtures from the fixtures page to create your jackpot
                combination.
              </CardDescription>
              <Button asChild variant='default'>
                <Link href='/dashboard/tactika/fixtures'>Browse Fixtures</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Fixture ID</TableHead>
                  <TableHead>Home Team</TableHead>
                  <TableHead className='w-[50px] text-center'>vs</TableHead>
                  <TableHead>Away Team</TableHead>
                  <TableHead className='w-[120px]'>Added</TableHead>
                  <TableHead className='w-[100px] text-right'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className='font-mono text-sm'>
                      <Link
                        href={`/dashboard/tactika/predictions/${item.id}`}
                        className='text-primary underline-offset-4 hover:underline'
                      >
                        {item.id}
                      </Link>
                    </TableCell>
                    <TableCell className='font-medium'>
                      {item.homeTeam}
                    </TableCell>
                    <TableCell className='text-center text-muted-foreground'>
                      vs
                    </TableCell>
                    <TableCell className='font-medium'>
                      {item.awayTeam}
                    </TableCell>
                    <TableCell className='text-sm text-muted-foreground'>
                      {new Date(item.addedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                          handleRemove(item.id, item.homeTeam, item.awayTeam)
                        }
                        className='h-8 w-8'
                        aria-label={`Remove fixture ${item.id}`}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
