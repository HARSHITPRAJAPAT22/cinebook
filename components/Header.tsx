'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/me', {
        method : 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cinebook_token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-red-600" style={{ fontFamily: 'Pacifico, serif' }}>
            CineBook
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/movies" className="text-gray-700 hover:text-red-600 transition-colors">
              Movies
            </Link>
            <Link href="/theaters" className="text-gray-700 hover:text-red-600 transition-colors">
              Theaters
            </Link>
            <Link href="/bookings" className="text-gray-700 hover:text-red-600 transition-colors">
              My Bookings
            </Link>
            {!user ? (
              <Link href="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
                Sign In
              </Link>
            ) : (
              <Link href="/profile" className="ml-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-red-600">
                  {user.picture ? (
                    <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-red-600 font-bold text-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
              </Link>
            )}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-menu-line text-xl"></i>
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 space-y-2">
            <Link href="/movies" className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors">
              Movies
            </Link>
            <Link href="/theaters" className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors">
              Theaters
            </Link>
            <Link href="/bookings" className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors">
              My Bookings
            </Link>
            {!user ? (
              <Link href="/login" className="block px-3 py-2 text-red-600 font-medium">
                Sign In
              </Link>
            ) : (
              <Link href="/profile" className="block px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-red-600">
                  {user.picture ? (
                    <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-red-600 font-bold text-base">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}