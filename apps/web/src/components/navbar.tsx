'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

export function DashboardNavbar() {
  return (
    <header className='sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      <div className='flex flex-1 items-center justify-between'>
        <div className='flex items-center gap-2'>
          {/* You can add breadcrumbs or page title here */}
        </div>
        <div className='flex items-center gap-2'>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
