import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth(async (req) => {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Define protected routes that require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard');
  const isAuthRoute = pathname.startsWith('/auth');

  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const response = NextResponse.next();

  // Set access_token and refresh_token as separate HTTP-only cookies
  if (session?.accessToken && session?.refreshToken) {
    const isProduction = process.env.NODE_ENV === 'production';

    // Set access token cookie (expires in 30 days, matching JWT expiry)
    response.cookies.set('access_token', session.accessToken, {
      // httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Set refresh token cookie (expires in 1 year, matching JWT expiry)
    response.cookies.set('refresh_token', session.refreshToken, {
      // httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  } else {
    // Clear cookies if no session
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
  }

  return response;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
