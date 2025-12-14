'use client';

import * as React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HotPicksTableContent } from './hot-picks-table-content';
import type { TopPicksOutcome } from '@/types/top-picks';

/**
 * Tab configuration
 */
const TAB_CONFIG: Array<{
  value: string;
  label: string;
  section: 'hottest' | 'overall' | 'by_outcome';
  outcome?: TopPicksOutcome;
}> = [
  {
    value: 'hottest',
    label: 'Hottest',
    section: 'hottest',
  },
  {
    value: 'overall',
    label: 'Overall',
    section: 'overall',
  },
  {
    value: 'home_win',
    label: 'Home Win',
    section: 'by_outcome',
    outcome: 'home_win',
  },
  {
    value: 'draw',
    label: 'Draw',
    section: 'by_outcome',
    outcome: 'draw',
  },
  {
    value: 'away_win',
    label: 'Away Win',
    section: 'by_outcome',
    outcome: 'away_win',
  },
  {
    value: 'btts_yes',
    label: 'BTTS Yes',
    section: 'by_outcome',
    outcome: 'btts_yes',
  },
  {
    value: 'over_2_5',
    label: 'Over 2.5',
    section: 'by_outcome',
    outcome: 'over_2_5',
  },
];

/**
 * Hot picks tabs component
 *
 * Displays tabs for different sections of top picks data.
 */
export function HotPicksTabs() {
  const [activeTab, setActiveTab] = React.useState('hottest');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <TabsList className='grid w-full grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-7'>
        {TAB_CONFIG.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='text-xs sm:text-sm'
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_CONFIG.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='mt-6'>
          <HotPicksTableContent section={tab.section} outcome={tab.outcome} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
