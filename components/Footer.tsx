
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Pacifico, serif' }}>
              CineBook
            </h3>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for movie ticket booking. Experience cinema like never before.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <i className="ri-facebook-fill text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <i className="ri-twitter-fill text-lg"></i>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <i className="ri-instagram-fill text-lg"></i>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Movies</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/movies" className="hover:text-white transition-colors">Now Showing</Link></li>
              <li><Link href="/movies" className="hover:text-white transition-colors">Coming Soon</Link></li>
              <li><Link href="/movies" className="hover:text-white transition-colors">Top Rated</Link></li>
              <li><Link href="/movies" className="hover:text-white transition-colors">Genres</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/theaters" className="hover:text-white transition-colors">Find Theaters</Link></li>
              <li><Link href="/bookings" className="hover:text-white transition-colors">My Bookings</Link></li>
              <li><Link href="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link href="/offers" className="hover:text-white transition-colors">Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CineBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
