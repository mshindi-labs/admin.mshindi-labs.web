'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FixturesTableErrorProps {
  error: Error | unknown;
}

/**
 * Error display component for fixtures table
 */
export function FixturesTableError({ error }: FixturesTableErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Failed to load fixtures. Please try again later.
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
