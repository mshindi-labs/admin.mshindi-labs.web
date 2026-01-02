'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface MjpAnalysisDetailErrorProps {
  error: string;
}

/**
 * Error display component for MJP analysis detail
 */
export function MjpAnalysisDetailError({ error }: MjpAnalysisDetailErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          Failed to load MJP analysis detail. Please try again later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-destructive'>{error}</p>
      </CardContent>
    </Card>
  );
}
