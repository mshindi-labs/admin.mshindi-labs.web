'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Back Button Component
 *
 * Button that navigates back to the previous page.
 */
export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => router.back()}
      className='-ml-2 text-muted-foreground hover:text-foreground'
    >
      <ArrowLeft className='mr-2 h-4 w-4' />
      Back
    </Button>
  );
}
