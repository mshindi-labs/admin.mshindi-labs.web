import { HorizontalNav, type NavItem } from '@/components/navigation';
import { FixtureCartProvider } from './fixtures/hooks';

const tactikaNavItems: NavItem[] = [
  {
    label: 'Predictions',
    href: '/dashboard/tactika/predictions',
  },
  {
    label: 'Hot Picks',
    href: '/dashboard/tactika/hot-picks',
  },
  {
    label: 'Leagues',
    href: '/dashboard/tactika/leagues',
  },
  {
    label: 'MJP',
    href: '/dashboard/tactika/mjp',
  },
  {
    label: 'Fixtures',
    href: '/dashboard/tactika/fixtures',
  },
];

interface TactikaLayoutProps {
  children: React.ReactNode;
}

/**
 * Tactika Section Layout
 *
 * Provides horizontal navigation for all Tactika-related pages.
 */
export default function TactikaLayout({ children }: TactikaLayoutProps) {
  return (
    <FixtureCartProvider>
      <div className='flex flex-col'>
        {/* Tactika Navigation */}
        <div className='sticky top-14 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <HorizontalNav
              items={tactikaNavItems}
              basePath='/dashboard/tactika'
              variant='underline'
              size='md'
              gap='loose'
            />
          </div>
        </div>

        {/* Page Content */}
        <main className='flex-1'>{children}</main>
      </div>
    </FixtureCartProvider>
  );
}
