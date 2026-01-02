import { MjpAnalysisDetailContent } from './ui/mjp-analysis-detail-content';
import { BackButton } from './ui/back-button';

interface MjpAnalysisDetailPageProps {
  params: Promise<{ request_id: string }>;
}

/**
 * MJP Analysis Detail Page
 *
 * Dynamic page that displays detailed MJP analysis data for a specific request.
 */
export default async function MjpAnalysisDetailPage({
  params,
}: MjpAnalysisDetailPageProps) {
  const { request_id } = await params;

  return (
    <div className='container mx-auto py-4 sm:py-6 lg:py-8'>
      <div className='space-y-4 sm:space-y-6'>
        <div className='space-y-2'>
          <BackButton />
          <div>
            <h1 className='text-lg font-bold tracking-tight sm:text-xl lg:text-2xl'>
              MJP Analysis Detail
            </h1>
            <p className='mt-1 text-sm text-muted-foreground sm:text-base'>
              Detailed analysis for request {request_id}
            </p>
          </div>
        </div>
        <MjpAnalysisDetailContent requestId={request_id} />
      </div>
    </div>
  );
}
