'use client';

import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PredictionSortField, SortOrder } from '@/types';

interface PredictionsTableSortProps {
  sortField?: PredictionSortField;
  sortOrder?: SortOrder;
  onSortChange: (field: PredictionSortField, order: SortOrder) => void;
}

/**
 * Sort field labels mapping
 */
const SORT_FIELD_LABELS: Record<PredictionSortField, string> = {
  [PredictionSortField.RECOMMENDED_PROBABILITY]: 'Recommended Probability',
  [PredictionSortField.CONFIDENCE_OVERALL]: 'Confidence Overall',
  [PredictionSortField.CREATED_AT]: 'Created At',
  [PredictionSortField.FIXTURE_DATE]: 'Fixture Date',
  [PredictionSortField.HOME_TEAM_NAME]: 'Home Team',
  [PredictionSortField.AWAY_TEAM_NAME]: 'Away Team',
  [PredictionSortField.LEAGUE_ID]: 'League ID',
  [PredictionSortField.SEASON]: 'Season',
  [PredictionSortField.RANKED_OUTCOME_PROBABILITY]:
    'Ranked Outcome Probability',
  [PredictionSortField.RANKED_OUTCOME_CONFIDENCE]: 'Ranked Outcome Confidence',
  [PredictionSortField.BETTING_RECOMMENDATION]: 'Betting Recommendation',
};

/**
 * Sort selector component for predictions table
 */
export function PredictionsTableSort({
  sortField,
  sortOrder = SortOrder.DESC,
  onSortChange,
}: PredictionsTableSortProps) {
  const handleFieldChange = (field: string) => {
    onSortChange(field as PredictionSortField, sortOrder);
  };

  const handleOrderChange = (order: string) => {
    if (sortField) {
      onSortChange(sortField, order as SortOrder);
    }
  };

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3'>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium whitespace-nowrap'>Sort by:</span>
        <Select value={sortField ?? ''} onValueChange={handleFieldChange}>
          <SelectTrigger className='h-9 w-[200px]'>
            <SelectValue placeholder='Select field...' />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_FIELD_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sortField && (
        <div className='flex items-center gap-2'>
          <Select value={sortOrder} onValueChange={handleOrderChange}>
            <SelectTrigger className='h-9 w-[120px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SortOrder.ASC}>
                <div className='flex items-center gap-2'>
                  <ArrowUpDown className='h-3 w-3' />
                  Ascending
                </div>
              </SelectItem>
              <SelectItem value={SortOrder.DESC}>
                <div className='flex items-center gap-2'>
                  <ArrowUpDown className='h-3 w-3 rotate-180' />
                  Descending
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
