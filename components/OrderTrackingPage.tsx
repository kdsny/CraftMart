import React from 'react';

export default function OrderTrackingPage({ onBack }: { onBack: () => void }) {
  const steps = ['Order Placed','Processing','Shipped','Out for Delivery','Delivered'];
  const current = 2;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">Order Tracking</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>
      <div className="bg-white rounded-xl border border-craftmart-100 p-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${i<=current?'bg-craftmart-600 text-white':'bg-craftmart-100 text-craftmart-600'}`}>{i+1}</div>
              {i<steps.length-1 && <div className={`h-1 flex-1 mx-2 rounded ${i<current?'bg-craftmart-600':'bg-craftmart-100'}`}></div>}
              <span className="ml-2 text-sm text-craftmart-800 hidden sm:block">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm text-craftmart-700">Tracking #: CM-2025-00123</div>
      </div>
    </div>
  );
}


