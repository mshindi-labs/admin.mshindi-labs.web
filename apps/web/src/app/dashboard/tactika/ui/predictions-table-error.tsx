'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PredictionsTableErrorProps {
  error: Error | unknown;
}

/**
 * Error display component for predictions table
 */
export function PredictionsTableError({ error }: PredictionsTableErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Failed to load predictions. Please try again later.
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
