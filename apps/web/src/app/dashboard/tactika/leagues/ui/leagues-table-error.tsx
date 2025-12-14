'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface LeaguesTableErrorProps {
  error: Error | unknown;
}

/**
 * Error display component for leagues table
 */
export function LeaguesTableError({ error }: LeaguesTableErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Failed to load leagues. Please try again later.
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
