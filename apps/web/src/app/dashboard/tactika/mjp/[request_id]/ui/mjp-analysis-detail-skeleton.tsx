'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

/**
 * Loading skeleton for the MJP analysis detail page
 */
export function MjpAnalysisDetailSkeleton() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-20 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-32 w-full' />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-48' />
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className='h-16 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
