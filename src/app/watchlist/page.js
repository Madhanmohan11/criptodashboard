'use client';

import { useEffect, useState } from 'react';
import CoinTable from '../components/CoinTable';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem('watchlist');
        const watchlist = stored ? JSON.parse(stored) : [];

        if (!Array.isArray(watchlist) || watchlist.length === 0) {
          setCoins([]);
          setLoading(false);
          return;
        }

        const ids = watchlist.join(',');
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

        const res = await fetch(url, {
          headers: {
            ...(API_KEY && { 'x-cg-demo-api-key': API_KEY }),
          },
        });

        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);

        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('❌ Failed to load watchlist coins:', error.message);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <>
      <Navbar />
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">⭐ Your Watchlist</h1>
        {loading ? (
          <Loader />
        ) : coins.length > 0 ? (
          <CoinTable coins={coins} />
        ) : (
          <p className="text-gray-400 text-center mt-8">Your watchlist is empty.</p>
        )}
      </main>
    </>
  );
}
