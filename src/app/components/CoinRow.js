'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CoinRow({ coin, index }) {
  const [watchlist, setWatchlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(stored);
  }, []);

  const toggleWatchlist = (e) => {
    e.stopPropagation();
    let updated = [...watchlist];
    if (updated.includes(coin.id)) {
      updated = updated.filter((id) => id !== coin.id);
    } else {
      updated.push(coin.id);
    }
    localStorage.setItem('watchlist', JSON.stringify(updated));
    setWatchlist(updated);
  };

  const isStarred = watchlist.includes(coin.id);

  const {
    name,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap,
    total_volume,
    symbol,
  } = coin;

  const isPositive = price_change_percentage_24h >= 0;

  return (
    <tr className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm sm:text-base rounded-lg shadow overflow-hidden">
      <td className="py-3 px-8 sm:px-8 lg:px-6">{index}</td>

      <td className="py-3 px-2 sm:px-4 lg:px-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push(`/coin/${coin.id}`)}
        >
          <Image
            src={image}
            alt={name}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="font-medium text-sm sm:text-base">
            {name}
            <span className="ml-1 text-gray-500 font-normal text-xs uppercase">
              ({symbol})
            </span>
          </span>
        </div>
      </td>

      <td className="py-3 px-2 sm:px-4 lg:px-6">
        ${current_price.toLocaleString()}
      </td>

      <td
        className={`py-3 px-2 sm:px-4 lg:px-6 font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {price_change_percentage_24h?.toFixed(2)}%
      </td>

      <td className="py-3 px-2 sm:px-4 lg:px-6">
        ${market_cap.toLocaleString()}
      </td>

      <td className="py-3 px-2 sm:px-4 lg:px-6">
        ${total_volume.toLocaleString()}
      </td>

      <td className="py-3 px-8 sm:px-4 lg:px-6 text-center text-xl">
        <button
          onClick={toggleWatchlist}
          aria-label="Toggle Watchlist"
          className="focus:outline-none"
        >
          {isStarred ? '★' : '☆'}
        </button>
      </td>
    </tr>
  );
}
