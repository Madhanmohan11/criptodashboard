'use client';

import CoinRow from './CoinRow';

export default function CoinTable({ coins }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <table className="table-auto w-full border-separate border-spacing-y-3">
        <thead className="bg-gray-100 dark:bg-zinc-800 text-left text-sm sm:text-base">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Coin</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">24h %</th>
            <th className="px-4 py-2">Market Cap</th>
            <th className="px-4 py-2">24h Volume</th>
            <th className="px-4 py-2 text-center">Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <CoinRow key={coin.id} coin={coin} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
