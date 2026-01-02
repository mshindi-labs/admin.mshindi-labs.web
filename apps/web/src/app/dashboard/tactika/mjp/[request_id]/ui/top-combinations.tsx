'use client';

import * as React from 'react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { MjpTopCombination, MjpCombinationFixtureOutcome } from '@/types';

interface TopCombinationsProps {
  topCombinations?: MjpTopCombination[];
}

/**
 * Get outcome badge variant
 */
function getOutcomeVariant(
  outcome?: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!outcome) return 'outline';
  const lowerOutcome = outcome.toLowerCase();
  if (lowerOutcome.includes('home') || lowerOutcome.includes('win')) {
    return 'default';
  }
  if (lowerOutcome.includes('draw')) {
    return 'secondary';
  }
  if (lowerOutcome.includes('away')) {
    return 'destructive';
  }
  return 'outline';
}

/**
 * Fixture Outcomes Table Component
 *
 * Displays fixture outcomes in a full-width table.
 */
function FixtureOutcomesTable({
  outcomes,
}: {
  outcomes: MjpCombinationFixtureOutcome[];
}) {
  if (!outcomes || outcomes.length === 0) {
    return (
      <div className='rounded-md border p-4 text-center text-sm text-muted-foreground'>
        No fixture outcomes available
      </div>
    );
  }

  return (
    <div className='w-full overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fixture ID</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Outcome</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {outcomes.map((outcome, index) => (
            <TableRow key={index}>
              <TableCell>
                {outcome.fixture_id ? (
                  <Link
                    href={`/dashboard/tactika/predictions/${outcome.fixture_id}` as any}
                    className='font-mono text-xs text-primary underline-offset-4 hover:underline'
                  >
                    {outcome.fixture_id}
                  </Link>
                ) : (
                  <span className='font-mono text-xs text-muted-foreground'>
                    —
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className='text-sm font-medium'>
                  {outcome.fixture_label || '—'}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getOutcomeVariant(outcome.selected_outcome)} className='text-xs'>
                  {outcome.selected_outcome || '—'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className='text-sm font-medium'>
                  {outcome.outcome_probability !== undefined
                    ? `${outcome.outcome_probability}%`
                    : '—'}
                </div>
              </TableCell>
              <TableCell>
                <div className='text-xs text-muted-foreground'>
                  {outcome.outcome_confidence !== undefined
                    ? `${outcome.outcome_confidence}%`
                    : '—'}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Top Combinations Component
 *
 * Displays top combinations grouped by strategy in tabs with full-width fixture outcomes tables.
 */
export function TopCombinations({
  topCombinations,
}: TopCombinationsProps) {
  if (!topCombinations || topCombinations.length === 0) {
    return null;
  }

  // Group combinations by strategy
  const groupedByStrategy = React.useMemo(() => {
    return topCombinations.reduce(
      (acc, combination) => {
        const strategyName =
          combination.strategy_name || 'Unknown Strategy';
        if (!acc[strategyName]) {
          acc[strategyName] = [];
        }
        acc[strategyName].push(combination);
        return acc;
      },
      {} as Record<string, MjpTopCombination[]>,
    );
  }, [topCombinations]);

  const strategyNames = Object.keys(groupedByStrategy);
  const [activeTab, setActiveTab] = React.useState(
    strategyNames[0] || '',
  );

  if (strategyNames.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>Top Combinations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-5'>
            {strategyNames.map((strategyName) => (
              <TabsTrigger
                key={strategyName}
                value={strategyName}
                className='text-xs sm:text-sm'
              >
                {strategyName}
              </TabsTrigger>
            ))}
          </TabsList>
          {strategyNames.map((strategyName) => {
            const combinations = groupedByStrategy[strategyName];
            return (
              <TabsContent
                key={strategyName}
                value={strategyName}
                className='mt-6 space-y-4'
              >
                {combinations.map((combination, index) => (
                  <div key={index} className='space-y-3'>
                    <div className='flex flex-wrap items-center gap-3 rounded-lg border p-3'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs font-medium text-muted-foreground'>
                          Combination #{combination.combination_id ?? index + 1}
                        </span>
                      </div>
                      <div className='flex flex-wrap items-center gap-2'>
                        {combination.combined_probability_percentage !== null &&
                        combination.combined_probability_percentage !==
                          undefined ? (
                          <Badge variant='default' className='text-xs'>
                            Combined: {combination.combined_probability_percentage.toFixed(4)}%
                          </Badge>
                        ) : (
                          <Badge variant='outline' className='text-xs'>
                            Combined: N/A
                          </Badge>
                        )}
                        {combination.average_confidence !== undefined && (
                          <Badge variant='secondary' className='text-xs'>
                            Avg Confidence: {combination.average_confidence.toFixed(1)}%
                          </Badge>
                        )}
                        {combination.quality_tier && (
                          <Badge variant='outline' className='text-xs'>
                            Quality: {combination.quality_tier}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {combination.fixture_outcomes &&
                      combination.fixture_outcomes.length > 0 && (
                        <FixtureOutcomesTable
                          outcomes={combination.fixture_outcomes}
                        />
                      )}
                  </div>
                ))}
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
