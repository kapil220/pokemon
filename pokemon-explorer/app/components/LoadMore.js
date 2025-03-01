
'use client';

export default function LoadMore({ onLoadMore, isLoading }) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Load More Pokemon'}
      </button>
    </div>
  );
}