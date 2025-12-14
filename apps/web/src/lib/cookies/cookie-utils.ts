import {
  getCookie as getCookieNext,
  setCookie as setCookieNext,
  deleteCookie as deleteCookieNext,
} from 'cookies-next';

/**
 * Cookie utility functions for SWRKit
 * Using cookies-next for SSR-safe cookie management
 */

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const value = getCookieNext(name);
  return value ? String(value) : null;
}

/**
 * Set a cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number;
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    httpOnly?: boolean;
  } = {},
): void {
  const { days, ...restOptions } = options;

  // Convert days to maxAge (seconds)
  const maxAge = days ? days * 24 * 60 * 60 : restOptions.maxAge;

  setCookieNext(name, value, {
    ...restOptions,
    maxAge,
    path: options.path || '/',
  });
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path: string = '/'): void {
  deleteCookieNext(name, { path });
}

/**
 * Get access token from cookies
 * Default cookie name is 'access_token' but can be configured
 */
export function getAccessToken(
  cookieName: string = 'access_token',
): string | null {
  return getCookie(cookieName);
}

/**
 * Get refresh token from cookies
 * Default cookie name is 'refresh_token' but can be configured
 */
export function getRefreshToken(
  cookieName: string = 'refresh_token',
): string | null {
  return getCookie(cookieName);
}
