import React from 'react';

type Props = {
  onLogout: () => void;
};

const SellerDashboard: React.FC<Props> = ({ onLogout }) => {
  return (
    <div className="min-h-[60vh] px-4 py-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-craftmart-900">Seller Dashboard</h1>
        <button onClick={onLogout} className="bg-craftmart-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-craftmart-800">Log Out</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-craftmart-900 mb-2">Quick Stats</h3>
          <ul className="text-sm text-craftmart-800 space-y-1">
            <li>Today's views: 32</li>
            <li>Orders pending: 2</li>
            <li>Messages: 1</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6 md:col-span-2">
          <h3 className="font-semibold text-craftmart-900 mb-2">Getting Started</h3>
          <p className="text-sm text-craftmart-800">This is a starter dashboard. We can add product management, orders, and analytics next.</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;


