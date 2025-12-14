import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface RiskFactorsProps {
  factors: string[];
}

/**
 * Risk Factors Component
 *
 * Displays risk factors that may affect the prediction.
 */
export function RiskFactors({ factors }: RiskFactorsProps) {
  if (!factors || factors.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <AlertTriangle className='h-4 w-4 text-yellow-600 dark:text-yellow-400 sm:h-5 sm:w-5' />
          Risk Factors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {factors.map((factor, index) => {
            if (!factor) return null;
            return (
              <li
                key={index}
                className='flex items-start gap-2 text-sm text-muted-foreground sm:text-base'
              >
                <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-600 dark:bg-yellow-400' />
                <span className='flex-1'>{factor}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
