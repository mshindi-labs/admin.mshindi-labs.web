'use client';

import { HotPicksTableContent } from './hot-picks-table-content';
import type { TopPicksSection, TopPicksOutcome } from '@/types/top-picks';

interface HotPicksTableProps {
  /**
   * Section to display from the top picks response
   * @default 'hottest'
   */
  section?: TopPicksSection;
  /**
   * Outcome type when section is 'by_outcome'
   */
  outcome?: TopPicksOutcome;
}

/**
 * Tactika Hot Picks Table Component
 *
 * Main component that displays the hot picks data table with all features:
 * - Data fetching and state management
 * - Section selection (hottest, overall, by_outcome)
 * - Column visibility
 */
export function HotPicksTable({
  section = 'hottest',
  outcome,
}: HotPicksTableProps) {
  return <HotPicksTableContent section={section} outcome={outcome} />;
}
