import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Mshindi Labs',
  description: 'Sign in to access Mshindi Labs',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-6'>
        {/* Logo/Brand */}
        <div className='text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
            Mshindi Labs
          </h1>
          <p className='mt-2 text-sm text-secondary-foreground'>
            Sign in to access your account
          </p>
        </div>

        {/* Main content */}
        {children}
      </div>
    </div>
  );
}
