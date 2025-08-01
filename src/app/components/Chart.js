"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/component/ui/card";

// Utility to convert timestamp-price array to recharts format
function transformChartData(prices) {
  return prices.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price: parseFloat(price.toFixed(2)),
  }));
}

export default function CoinChart({ id }) {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChart = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
        );
        const json = await res.json();
        const transformed = transformChartData(json.prices);
        setData(transformed);
      } catch (err) {
        console.error("Failed to fetch chart:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [id, days]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <CardDescription>
          {days === 1
            ? "Today"
            : `Last ${days} day${days > 1 ? "s" : ""}`} market trend
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 mb-4">
          {[1, 7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1 rounded border text-sm sm:text-base ${
                days === d
                  ? "bg-green-500 text-white border-green-500"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"
              }`}
            >
              {d}d
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(val) => val.slice(0, 5)} />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                width={80}
              />
              <Tooltip
                formatter={(value) => `$${value}`}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4ade80"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up this period <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing {days}-day price movement
        </div>
      </CardFooter>
    </Card>
  );
}
