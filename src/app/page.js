'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CoinTable from './components/CoinTable';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  
      try {
        console.log('Using CoinGecko API Key:', API_KEY);
        const res = await axios.get(`${API_BASE}/coins/markets`, {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false,
          },
          headers: {
            ...(API_KEY && { 'x-cg-demo-api-key': API_KEY }),
          },
        });

        setCoins(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error || error?.message || 'Failed to fetch data.';
        console.error('❌ Failed to fetch coins:', errorMessage);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800">
       
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Navbar />
        </div>
      </header>

      {/* ✅ Main Section */}
      <main className="px-4 py-6 max-w-7xl mx-auto w-full">
       <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center text-[#111827]">
          🚀 Cryptocurrency Market 
        </h1>


        <div className="mb-6">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {loading ? (
          <Loader />
        ) : filteredCoins.length > 0 ? (
          <CoinTable coins={filteredCoins} />
        ) : (
          <p className="text-gray-400 text-center mt-12 text-lg">No coins matched your search.</p>
        )}
      </main>
    </div>
  );
}
