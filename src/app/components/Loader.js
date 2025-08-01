"use client";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-40 space-y-2">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
      <span className="text-sm text-gray-400">Loading data...</span>
    </div>
  );
}
