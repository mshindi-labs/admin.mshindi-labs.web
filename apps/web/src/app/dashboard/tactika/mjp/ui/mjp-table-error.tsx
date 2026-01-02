'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface MjpTableErrorProps {
  error: Error | unknown;
}

/**
 * Error display component for MJP analysis table
 */
export function MjpTableError({ error }: MjpTableErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Failed to load MJP analysis data. Please try again later.
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
