'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const { user, signOut, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      {isLoading ? (
        <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
      ) : (
        <div className="relative">
          {user ? (
            <>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  <span className="truncate max-w-[150px]">{user.email}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <Link 
                    href="/auth/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <ul className="flex space-x-4">
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
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}