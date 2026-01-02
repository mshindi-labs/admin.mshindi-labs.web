'use client';

import { useMjpAnalysisDetail } from '../../hooks';
import { MjpAnalysisDetailSkeleton } from './mjp-analysis-detail-skeleton';
import { MjpAnalysisDetailError } from './mjp-analysis-detail-error';
import { QualitySummary } from './quality-summary';
import { CorrelationAnalysis } from './correlation-analysis';
import { Strategies } from './strategies';
import { Recommendation } from './recommendation';
import { PredictionsTable } from './predictions-table';
import { TopCombinations } from './top-combinations';
import { PerformanceMetrics } from './performance-metrics';

interface MjpAnalysisDetailContentProps {
  requestId: string;
}

/**
 * MJP Analysis Detail Content
 *
 * Main component that fetches and displays MJP analysis detail data.
 */
export function MjpAnalysisDetailContent({
  requestId,
}: MjpAnalysisDetailContentProps) {
  const { data, isLoading, isError, error } = useMjpAnalysisDetail(requestId);

  if (isLoading) {
    return <MjpAnalysisDetailSkeleton />;
  }

  if (isError || !data) {
    return (
      <MjpAnalysisDetailError
        error={
          error instanceof Error ? error.message : 'Failed to load analysis'
        }
      />
    );
  }

  return (
    <div className='space-y-6'>
      <QualitySummary qualitySummary={data.quality_summary} />
      <CorrelationAnalysis correlationAnalysis={data.correlation_analysis} />
      <Strategies strategies={data.strategies} />
      <Recommendation recommendation={data.recommendation} />
      <PredictionsTable predictions={data.predictions} />
      <TopCombinations topCombinations={data.top_combinations} />
      <PerformanceMetrics performance={data.performance} />
    </div>
  );
}
