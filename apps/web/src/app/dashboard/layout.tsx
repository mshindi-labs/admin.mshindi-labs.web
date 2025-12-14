'use client';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { DashboardNavbar } from '@/components/navbar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <main className='flex-1'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
