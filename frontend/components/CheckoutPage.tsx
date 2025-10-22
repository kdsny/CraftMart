import React from 'react';

export default function CheckoutPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">Checkout</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white rounded-xl border border-craftmart-100 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Full Name" className="px-3 py-2 border border-craftmart-200 rounded-lg" />
              <input placeholder="Phone" className="px-3 py-2 border border-craftmart-200 rounded-lg" />
              <input placeholder="Street Address" className="md:col-span-2 px-3 py-2 border border-craftmart-200 rounded-lg" />
              <input placeholder="City" className="px-3 py-2 border border-craftmart-200 rounded-lg" />
              <input placeholder="Postal Code" className="px-3 py-2 border border-craftmart-200 rounded-lg" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Payment</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2"><input type="radio" name="pay" defaultChecked /> <span>Cash on Delivery</span></label>
              <label className="flex items-center space-x-2"><input type="radio" name="pay" /> <span>Credit/Debit Card</span></label>
            </div>
          </div>
        </section>
        <aside className="bg-white rounded-xl border border-craftmart-100 p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Items</span><span>₱198.00</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>₱50.00</span></div>
            <div className="flex justify-between font-semibold border-t pt-2"><span>Total</span><span>₱248.00</span></div>
          </div>
          <button className="mt-4 w-full bg-craftmart-600 text-white py-2 rounded-lg hover:bg-craftmart-700">Place Order</button>
        </aside>
      </div>
    </div>
  );
}


