import React from 'react';

export default function SettingsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">Settings</h1>
        <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </button>
      </div>
      <div className="bg-white rounded-xl border border-craftmart-100 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Preferences</h2>
          <label className="flex items-center space-x-2 text-sm"><input type="checkbox" defaultChecked /> <span>Email notifications</span></label>
          <label className="flex items-center space-x-2 text-sm mt-2"><input type="checkbox" /> <span>SMS notifications</span></label>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">Privacy</h2>
          <button className="px-4 py-2 rounded-lg border border-craftmart-200 text-craftmart-700 hover:bg-craftmart-50">Download my data</button>
        </div>
      </div>
    </div>
  );
}


