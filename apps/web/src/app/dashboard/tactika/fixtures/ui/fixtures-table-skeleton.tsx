'use client';

import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton for the fixtures table
 */
export function FixturesTableSkeleton() {
  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <Skeleton className='h-10 w-full max-w-sm' />
        <Skeleton className='h-10 w-full sm:w-32' />
      </div>
      <div className='overflow-hidden rounded-md border'>
        <div className='space-y-4 p-4'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='h-16 w-full' />
          ))}
        </div>
      </div>
    </div>
  );
}
