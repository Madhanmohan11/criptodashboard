'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import Loader from '../../components/Loader';

export default function CoinDetail() {
  const params = useParams();
  const id = params?.id;

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error("Error fetching coin data:", err);
        setCoin(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCoin();
  }, [id]);

  if (loading) return <Loader />;
  if (!coin) return <p className="text-center text-red-500 mt-10">Coin not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-gray-800 dark:text-white">
       
<div className="mb-6">
  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
    {coin.name} <span className="font-normal text-gray-50">({coin.symbol})</span>
  </h1>
</div>

      {/* Coin Info Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700">
          <tbody className="text-sm sm:text-base">
            <InfoRow label="Current Price" value={`$${coin.market_data.current_price.usd.toLocaleString()}`} />
            <InfoRow label="Market Cap" value={`$${coin.market_data.market_cap.usd.toLocaleString()}`} />
            <InfoRow label="24h Volume" value={`$${coin.market_data.total_volume.usd.toLocaleString()}`} />
            <InfoRow label="Rank" value={`#${coin.market_cap_rank}`} />
            <InfoRow label="Circulating Supply" value={coin.market_data.circulating_supply.toLocaleString()} />
            <InfoRow label="Max Supply" value={coin.market_data.max_supply ? coin.market_data.max_supply.toLocaleString() : 'N/A'} />
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="mt-10 bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-white">Price Chart</h2>
        <Chart id={id} />
      </div>
    </div>
  );
}

// Table row for each info
function InfoRow({ label, value }) {
  return (
    <tr className="border-b border-gray-200 dark:border-zinc-700">
      <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400 w-1/2">{label}</td>
      <td className="px-4 py-3">{value}</td>
    </tr>
  );
}
