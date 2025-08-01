"use client";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef } from "react";

export default function SearchBar({ query, setQuery }) {
  const inputRef = useRef(null);

  // Debounced input handler
  const debouncedChangeHandler = useCallback(
    debounce((value) => setQuery(value), 300),
    []
  );

  // Ensure defaultValue stays in sync
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = query;
    }
  }, [query]);

  return (
    <div className="p-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="🔍 Search for a coin..."
        defaultValue={query}
        onChange={(e) => debouncedChangeHandler(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />
    </div>
  );
}
