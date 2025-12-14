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
          <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            Tactika Predictions
          </h1>
          <p className='text-muted-foreground mt-2 text-sm sm:text-base'>
            View and manage football match predictions with detailed analytics
            and confidence scores.
          </p>
        </div>

        <PredictionsTable />
      </div>
    </div>
  );
}
