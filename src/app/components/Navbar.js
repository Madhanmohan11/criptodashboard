'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold hover:text-yellow-400 transition-colors"
          >
            Crypto Dashboard 
          </Link>

          <Link
            href="/watchlist"
            className="text-lg sm:text-xl hover:text-yellow-400 transition-colors"
          >
            ⭐ Watchlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
