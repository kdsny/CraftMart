import React from 'react';

export default function WishlistPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">Wishlist</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-xl border border-craftmart-100 overflow-hidden group hover:shadow-md transition">
            <div className="aspect-w-1 aspect-h-1 bg-craftmart-100" />
            <div className="p-4">
              <div className="font-medium mb-1">Wish Product {i}</div>
              <div className="text-sm text-craftmart-600 mb-3">₱{(i*120).toFixed(2)}</div>
              <div className="flex items-center justify-between">
                <button className="text-sm px-3 py-1 rounded-lg bg-craftmart-600 text-white hover:bg-craftmart-700">Add to Cart</button>
                <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


