'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import type { BettingRecommendation } from '@/types/prediction';

interface BettingRecommendationPopoverProps {
  recommendation: BettingRecommendation;
}

/**
 * Betting Recommendation Popover Component
 *
 * Displays the final decision in the table cell with a popover
 * showing the full betting recommendation summary and details.
 */
export function BettingRecommendationPopover({
  recommendation,
}: BettingRecommendationPopoverProps) {
  const [open, setOpen] = React.useState(false);

  if (!recommendation) {
    return <div className='text-xs text-muted-foreground'>—</div>;
  }

  const getDecisionVariant = (
    decision: string,
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const lowerDecision = decision.toLowerCase();
    if (lowerDecision.includes('bet') || lowerDecision.includes('yes')) {
      return 'default';
    }
    if (lowerDecision.includes('no') || lowerDecision.includes('skip')) {
      return 'destructive';
    }
    if (lowerDecision.includes('caution') || lowerDecision.includes('maybe')) {
      return 'secondary';
    }
    return 'outline';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='h-auto p-1 text-xs font-normal hover:bg-accent'
        >
          <Badge
            variant={getDecisionVariant(recommendation.final_decision)}
            className='text-xs'
          >
            {recommendation.final_decision}
          </Badge>
          <ChevronDown className='ml-1 h-3 w-3 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80' align='start' style={{ width: '20rem' }}>
        <div className='flex flex-col space-y-3 text-xs'>
          {/* Summary */}
          {recommendation.summary && (
            <div className='space-y-1'>
              <h4 className='font-semibold text-sm'>Summary</h4>
              <p className='text-muted-foreground'>{recommendation.summary}</p>
            </div>
          )}

          {/* Final Decision */}
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Final Decision:</span>
            <Badge variant={getDecisionVariant(recommendation.final_decision)}>
              {recommendation.final_decision}
            </Badge>
          </div>

          {/* Risk Score */}
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Risk Score:</span>
            <span className='font-medium'>{recommendation.risk_score}</span>
          </div>

          {/* Recommendation Confidence */}
          {recommendation.recommendation_confidence && (
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Confidence:</span>
              <span className='font-medium'>
                {recommendation.recommendation_confidence}
              </span>
            </div>
          )}

          {/* Hard Stop Triggered */}
          {recommendation.hard_stop_triggered && (
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Hard Stop:</span>
              <Badge variant='destructive'>Triggered</Badge>
            </div>
          )}

          {/* Disqualifiers */}
          {recommendation.disqualifiers &&
            recommendation.disqualifiers.length > 0 && (
              <div className='space-y-1'>
                <span className='text-muted-foreground'>Disqualifiers:</span>
                <ul className='list-disc list-inside space-y-0.5 text-muted-foreground'>
                  {recommendation.disqualifiers.map((dq, index) => (
                    <li key={index}>{dq}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Risk Factors */}
          {recommendation.risk_factors &&
            recommendation.risk_factors.length > 0 && (
              <div className='space-y-1'>
                <span className='text-muted-foreground'>Risk Factors:</span>
                <div className='space-y-1'>
                  {recommendation.risk_factors.map((factor, index) => (
                    <div
                      key={index}
                      className='flex items-start justify-between gap-2'
                    >
                      <span className='text-muted-foreground'>
                        {factor.name}
                      </span>
                      <div className='flex items-center gap-1'>
                        <span className='font-medium'>{factor.points} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
