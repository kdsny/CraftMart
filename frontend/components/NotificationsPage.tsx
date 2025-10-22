import React from 'react';

export default function NotificationsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">Notifications</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>
      <div className="space-y-3">
        {[1,2,3].map(i => (
          <div key={i} className="p-4 rounded-lg border border-craftmart-100 bg-white flex items-start space-x-3">
            <div className="w-2 h-2 bg-craftmart-600 rounded-full mt-2" />
            <div>
              <div className="text-sm text-craftmart-900">New update regarding order #{1000+i}</div>
              <div className="text-xs text-craftmart-600">2h ago</div>
            </div>
            <button className="ml-auto text-xs text-craftmart-600 hover:text-craftmart-800">Mark as read</button>
          </div>
        ))}
      </div>
    </div>
  );
}


