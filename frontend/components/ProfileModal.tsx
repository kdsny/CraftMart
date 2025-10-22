import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileModal({ isOpen, onClose }: Props) {
  const { user, setUser } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const apiBase = useMemo(() => {
    if (window.location.port === '3000') {
      return 'http://localhost/craftmart_projct/admin/api/';
    }
    const parts = window.location.pathname.split('/').filter(Boolean);
    const root = parts.length ? `/${parts[0]}` : '';
    return `${root}/admin/api/`;
  }, []);

  if (!isOpen || !user) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(null); setInfo(null); setPending(true);
    const form = e.currentTarget as any;
    const fd = new FormData(form);
    fd.append('id', String(user.id));
    fd.append('user_type', user.user_type);
    try {
      const res = await fetch(`${apiBase}update-user.php`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, first_name: form.first_name.value, last_name: form.last_name.value, email: user.email, user_type: user.user_type });
        setInfo('Profile updated successfully');
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch {
      setError('Network error');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6 border-b border-craftmart-100 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-craftmart-900">My Profile</h4>
          <button onClick={onClose} className="text-craftmart-600 hover:text-craftmart-800">✕</button>
        </div>
        <div className="p-6">
          {error && <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">{error}</div>}
          {info && <div className="mb-4 px-4 py-3 rounded-lg border border-green-200 bg-green-50 text-sm text-green-700">{info}</div>}
          <form onSubmit={onSubmit} className="space-y-5" encType="multipart/form-data">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-craftmart-600 text-white flex items-center justify-center text-xl">{user.first_name?.charAt(0) || 'U'}</div>
              </div>
              <div>
                <div className="text-craftmart-900 text-lg font-semibold">{user.first_name} {user.last_name}</div>
                <div className="text-xs text-craftmart-600">{user.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">First Name</label>
                <input name="first_name" defaultValue={user.first_name} required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">Last Name</label>
                <input name="last_name" defaultValue={user.last_name} required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-craftmart-700 mb-2">Email</label>
              <input value={user.email} readOnly className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-craftmart-700 mb-2">Phone</label>
              <input name="phone" className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-craftmart-200 text-craftmart-700">Close</button>
              <button disabled={pending} className="px-4 py-2 rounded-lg bg-craftmart-600 text-white hover:bg-craftmart-700">{pending ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


