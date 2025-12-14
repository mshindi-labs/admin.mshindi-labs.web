import { PredictionsTable } from './ui';

/**
 * Tactika Predictions Page
 *
 * Displays a data table of predictions with pagination, sorting, and filtering.
 */
export default function TactikaPredictionsPage() {
  return (
    <div className='container mx-auto py-6 sm:py-8 lg:py-10'>
      <div className='space-y-6'>
        <div>
          <h1 className='text-lg font-bold tracking-tight sm:text-xl'>
            Tactika Predictions
          </h1>
        </div>
        <PredictionsTable />
      </div>
    </div>
  );
}
