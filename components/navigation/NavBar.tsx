'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav>
      <ul className="flex space-x-4">
        {user ? (
          <>
            <li>
              <span className="text-gray-600 dark:text-gray-300">
                {user.email}
              </span>
            </li>
            <li>
              <button 
                onClick={() => signOut()}
                className="text-blue-600 hover:underline"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}