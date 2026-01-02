'use client';

import * as React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQueryClient, queryKeys } from '@/lib/tanstack';

/**
 * Predictions Refresh Button
 *
 * Button that refreshes the predictions data by invalidating
 * all predictions queries.
 */
export function PredictionsRefreshButton() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refetch all predictions queries to force API call
      // Using the base key to match all predictions queries regardless of filters
      await queryClient.refetchQueries({
        queryKey: [...queryKeys.tactika.analytics.all(), 'predictions'],
        exact: false, // Match all predictions queries regardless of filters
      });
    } finally {
      // Reset refreshing state after a short delay for visual feedback
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={handleRefresh}
      disabled={isRefreshing}
      className='gap-2'
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      <span className='hidden sm:inline'>Refresh</span>
    </Button>
  );
}
