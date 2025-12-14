import { LeaguesTable } from './ui';

/**
 * Leagues Page
 *
 * Displays a data table of leagues with pagination and filtering.
 */
export default function LeaguesPage() {
  return (
    <div className='container mx-auto py-6 sm:py-8 lg:py-10'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-lg font-bold tracking-tight sm:text-xl'>
            Leagues
          </h1>
        </div>
        <LeaguesTable />
      </div>
    </div>
  );
}
