'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface HotPicksTableErrorProps {
  error: Error | unknown;
}

/**
 * Error display component for hot picks table
 */
export function HotPicksTableError({ error }: HotPicksTableErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Failed to load hot picks. Please try again later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-destructive'>
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </p>
      </CardContent>
    </Card>
  );
}
