import { MjpTable } from './ui';

/**
 * MJP Analysis Page
 *
 * Displays a data table of Mega Jackpot analysis records with pagination and filtering.
 */
export default function MJPPage() {
  return (
    <div className='container mx-auto py-6 sm:py-8 lg:py-10'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-lg font-bold tracking-tight sm:text-xl'>
            Mega Jackpot Analysis
          </h1>
        </div>
        <MjpTable />
      </div>
    </div>
  );
}
