import React from 'react';

export default function MessagingPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">Messages</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="bg-white rounded-xl border border-craftmart-100 p-4">
          <input placeholder="Search" className="w-full mb-3 px-3 py-2 border border-craftmart-200 rounded-lg" />
          <div className="space-y-2">
            {[1,2,3].map(i => (
              <div key={i} className="p-3 rounded-lg border border-craftmart-100 hover:bg-craftmart-50 cursor-pointer">
                <div className="font-medium">Seller {i}</div>
                <div className="text-xs text-craftmart-600">Last message preview...</div>
              </div>
            ))}
          </div>
        </aside>
        <section className="md:col-span-2 bg-white rounded-xl border border-craftmart-100 p-6 flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-3">
            <div className="self-start bg-craftmart-50 rounded-lg px-3 py-2 text-sm">Hello! Is this available?</div>
            <div className="self-end bg-craftmart-600 text-white rounded-lg px-3 py-2 text-sm w-fit ml-auto">Yes, it is 😊</div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <input placeholder="Type a message" className="flex-1 px-3 py-2 border border-craftmart-200 rounded-lg" />
            <button className="px-4 py-2 rounded-lg bg-craftmart-600 text-white hover:bg-craftmart-700">Send</button>
          </div>
        </section>
      </div>
    </div>
  );
}


