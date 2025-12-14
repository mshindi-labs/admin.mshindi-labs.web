/**
 * User Types
 *
 * Type definitions for user-related data structures.
 */

/**
 * User roles in the system
 */
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER';

/**
 * User profile response from /auth/me endpoint
 */
export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  is_locked: boolean;
  is_suspended: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Helper to get user's full name
 */
export function getUserFullName(user: User): string {
  return `${user.first_name} ${user.last_name}`;
}

/**
 * Helper to get user's initials
 */
export function getUserInitials(user: User): string {
  return `${user.first_name.charAt(0)}${user.last_name.charAt(
    0,
  )}`.toUpperCase();
}
