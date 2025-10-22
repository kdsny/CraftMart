import React from 'react';

export default function CartPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">My Cart</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-xl border border-craftmart-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Items</h2>
            <label className="inline-flex items-center space-x-2 text-sm"><input type="checkbox" /> <span>Select all</span></label>
          </div>
          <div className="space-y-4">
            {[1,2].map((i)=> (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-craftmart-100 hover:bg-craftmart-50">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="mr-2" />
                  <div className="w-16 h-16 bg-craftmart-100 rounded-lg" />
                  <div>
                    <div className="font-medium">Sample Product {i}</div>
                    <div className="text-xs text-craftmart-600">Seller Name</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold">₱{(i*99).toFixed(2)}</div>
                    <div className="text-xs text-craftmart-600">Qty 1</div>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded-xl border border-craftmart-100 p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₱198.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>₱50.00</span></div>
            <div className="flex justify-between"><span>Discount</span><span>- ₱0.00</span></div>
            <div className="flex justify-between font-semibold border-t pt-2"><span>Total</span><span>₱248.00</span></div>
          </div>
          <button className="mt-4 w-full bg-craftmart-600 text-white py-2 rounded-lg hover:bg-craftmart-700">Proceed to Checkout</button>
        </aside>
      </div>
    </div>
  );
}


