import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface MatchPredictionErrorProps {
  error: string;
}

/**
 * Match Prediction Error
 *
 * Error state component for match prediction page.
 */
export function MatchPredictionError({ error }: MatchPredictionErrorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-destructive'>
          <AlertCircle className='h-5 w-5' />
          Error Loading Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>{error}</p>
      </CardContent>
    </Card>
  );
}
