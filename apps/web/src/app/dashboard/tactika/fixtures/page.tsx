import { FixturesTableContent } from './ui/fixtures-table-content';

/**
 * Fixtures Page
 *
 * Displays fixtures with multi-step selection (country → league → round).
 */
export default function FixturesPage() {
  return (
    <div className='container mx-auto py-6 sm:py-8 lg:py-10'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-lg font-bold tracking-tight sm:text-xl'>
            Fixtures
          </h1>
        </div>
        <FixturesTableContent />
      </div>
    </div>
  );
}
