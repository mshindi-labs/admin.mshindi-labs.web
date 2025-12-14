import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface JustificationProps {
  text: string;
}

/**
 * Justification Component
 *
 * Displays the prediction justification text.
 */
export function Justification({ text }: JustificationProps) {
  if (!text) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <FileText className='h-4 w-4 sm:h-5 sm:w-5' />
          Justification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-sm leading-relaxed text-muted-foreground sm:text-base'>
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
