import React, { useState } from 'react';

type Props = {
  onBack: () => void;
  onLoginSuccess: () => void;
};

// Temporary in-memory seller credentials for demo use only
const DEMO_SELLER_EMAIL = 'seller@craftmart.test';
const DEMO_SELLER_PASSWORD = 'craftmart123';

const SellerLogin: React.FC<Props> = ({ onBack, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === DEMO_SELLER_EMAIL && password === DEMO_SELLER_PASSWORD) {
      setError(null);
      onLoginSuccess();
      return;
    }
    setError('Invalid seller credentials.');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <button onClick={onBack} className="text-sm text-craftmart-700 hover:underline mb-4">&larr; Back</button>
        <h2 className="text-2xl font-bold text-center text-craftmart-900 mb-6">Seller Login</h2>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-craftmart-800">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-craftmart-500" placeholder={DEMO_SELLER_EMAIL} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-craftmart-800">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-craftmart-500" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-craftmart-700 text-white font-semibold py-2.5 rounded-md hover:bg-craftmart-800 transition-colors">Log In</button>
        </form>
        <div className="mt-6 text-xs text-gray-500">
          <p>Demo seller account:</p>
          <p>Email: <span className="font-mono">{DEMO_SELLER_EMAIL}</span></p>
          <p>Password: <span className="font-mono">{DEMO_SELLER_PASSWORD}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;


