import { MatchPredictionContent } from './ui/match-prediction-content';
import { BackButton } from './ui/back-button';

interface MatchPredictionPageProps {
  params: Promise<{ fixture_id: string }>;
}

/**
 * Match Prediction Page
 *
 * Dynamic page that displays detailed prediction data for a specific fixture.
 */
export default async function MatchPredictionPage({
  params,
}: MatchPredictionPageProps) {
  const { fixture_id } = await params;

  return (
    <div className='container mx-auto py-4 sm:py-6 lg:py-8'>
      <div className='space-y-4 sm:space-y-6'>
        <div className='space-y-2'>
          <BackButton />
          <div>
            <h1 className='text-lg font-bold tracking-tight sm:text-xl lg:text-2xl'>
              Match Prediction
            </h1>
            <p className='mt-1 text-sm text-muted-foreground sm:text-base'>
              Detailed prediction analysis for fixture {fixture_id}
            </p>
          </div>
        </div>
        <MatchPredictionContent fixtureId={fixture_id} />
      </div>
    </div>
  );
}
