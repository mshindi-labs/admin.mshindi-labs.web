// page redirects to predictions page
import { redirect } from 'next/navigation';

/**
 * Tactika Page
 *
 * Redirects to the predictions page.
 */
export default function TactikaPage() {
  return redirect('/dashboard/tactika/predictions');
}
