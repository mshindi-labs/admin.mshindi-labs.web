'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

interface MetricItem {
  label: string;
  value: number | string;
}

interface MetricsPopoverProps {
  items: MetricItem[];
  triggerLabel: string;
  emptyLabel?: string;
}

/**
 * Reusable popover component for displaying metrics/outcomes in a table
 *
 * Displays a button trigger that opens a popover with a list of metrics.
 * Useful for keeping table rows compact while still showing detailed information.
 */
export function MetricsPopover({
  items,
  triggerLabel,
  emptyLabel = '—',
}: MetricsPopoverProps) {
  const [open, setOpen] = React.useState(false);

  if (!items || items.length === 0) {
    return <div className='text-xs text-muted-foreground'>{emptyLabel}</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='h-auto p-1 text-xs font-normal hover:bg-accent'
        >
          <span className='text-muted-foreground'>{triggerLabel}</span>
          <ChevronDown className='ml-1 h-3 w-3 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-40'
        align='start'
        style={{ width: '10rem' }}
      >
        <div className='flex flex-col space-y-0.5 text-xs'>
          {items.map((item, index) => (
            <div
              key={index}
              className='flex items-center gap-4 min-w-0'
            >
              <span className='text-muted-foreground truncate min-w-0 flex-1'>
                {item.label}
              </span>
              <span className='font-medium whitespace-nowrap flex-shrink-0'>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
