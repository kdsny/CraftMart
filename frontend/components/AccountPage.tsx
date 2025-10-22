import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Tab = 'dashboard' | 'orders' | 'wishlist' | 'profile';

export default function AccountPage({ onBack }: { onBack: () => void }) {
  const { user, setUser, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const apiBase = useMemo(() => {
    if (window.location.port === '3000') return 'http://localhost/craftmart_projct/admin/api/';
    const parts = window.location.pathname.split('/').filter(Boolean);
    const root = parts.length ? `/${parts[0]}` : '';
    return `${root}/admin/api/`;
  }, []);

  if (!user) return null;

  const normalizeImageUrl = (src?: string | null) => {
    if (!src) return null;
    if (/^https?:\/\//i.test(src) || src.startsWith('/')) return src;
    const parts = window.location.pathname.split('/').filter(Boolean);
    const root = parts.length ? `/${parts[0]}` : '';
    return `${root}/${src}`.replace(/\\+/g, '/');
  };

  // Scroll to top when opening page and whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  const submitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setPending(true); setMsg(null);
    const form = e.currentTarget as any;
    const fd = new FormData(form);
    fd.delete('username');
    fd.append('id', String(user.id));
    fd.append('user_type', user.user_type);

    // Map username -> first_name / last_name
    const usernameRaw: string = form.username?.value?.toString() || '';
    const partsName = usernameRaw.trim().split(/\s+/);
    const firstName = partsName.shift() || '';
    const lastName = partsName.join(' ');
    fd.delete('first_name');
    fd.delete('last_name');
    fd.append('first_name', firstName);
    fd.append('last_name', lastName);
    // Only include password fields if user intends to change password
    const currentPassword = form.current_password?.value?.trim();
    const newPassword = form.new_password?.value?.trim();
    const confirmPassword = form.confirm_password?.value?.trim();
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
        setPending(false);
        setMsg('Please provide current password and matching new passwords.');
        return;
      }
      fd.append('current_password', currentPassword);
      fd.append('new_password', newPassword);
    }
    try {
      const res = await fetch(`${apiBase}update-user.php`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        const newImg = (data.user && data.user.profile_image) ? String(data.user.profile_image) : undefined;
        const normalized = normalizeImageUrl(newImg || user.profile_image || undefined) || undefined;
        const cacheBusted = normalized ? `${normalized}${normalized.includes('?') ? '&' : '?'}t=${Date.now()}` : undefined;
        setUser({
          ...user,
          first_name: firstName || user.first_name,
          last_name: lastName || user.last_name,
          email: form.email?.value || user.email,
          profile_image: cacheBusted ?? user.profile_image ?? null
        });
        setPreviewSrc(null);
        setShowToast('Profile updated successfully');
        setTimeout(() => { setShowToast(null); setTab('dashboard'); }, 1200);
      } else {
        setMsg(data.message || 'Failed to update profile');
      }
    } catch { setMsg('Network error'); }
    finally { setPending(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#f3efe9]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-craftmart-900">My Account</h1>
        <div className="space-x-3 flex items-center">
          <button onClick={onBack} className="text-craftmart-700 hover:text-craftmart-900 inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5A1 1 0 018.707 4.293L5.414 7.586H17a1 1 0 110 2H5.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
            <span>Back</span>
          </button>
          <button onClick={() => { logout(); onBack(); }} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg bg-green-600 text-white shadow-lg">{showToast}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {(tab!== 'dashboard' && tab!== 'profile') && (
        <aside className="md:col-span-1 bg-[#fbfaf8] hover:bg-white transition-colors rounded-xl border border-craftmart-200 hover:border-craftmart-300 p-5 shadow-sm hover:shadow">
          <div className="flex items-center space-x-4 mb-5">
            <div className="relative">
              {user.profile_image ? (
                <img src={normalizeImageUrl(user.profile_image) || undefined} className="w-16 h-16 rounded-full object-cover ring-2 ring-craftmart-100" alt="avatar" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-craftmart-600 text-white flex items-center justify-center text-xl ring-2 ring-craftmart-100">{user.first_name?.charAt(0) || 'U'}</div>
              )}
              <label className="absolute -right-1 -bottom-1 bg-craftmart-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow cursor-pointer" title="Change photo">
                <input type="file" name="profile_image" accept="image/*" className="hidden" form="profileForm" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4-4-4-4m6 8h10"/></svg>
              </label>
            </div>
            <div>
              <div className="font-semibold">{user.first_name} {user.last_name}</div>
              <div className="text-xs text-craftmart-600">{user.email}</div>
            </div>
          </div>
          <nav className="space-y-1">
            <button className={`w-full text-left px-3 py-2 rounded-lg ${tab==='dashboard'?'bg-craftmart-50 text-craftmart-900':'text-craftmart-700 hover:bg-craftmart-50'}`} onClick={()=>setTab('dashboard')}>My Profile</button>
            <button className={`w-full text-left px-3 py-2 rounded-lg ${tab==='orders'?'bg-craftmart-50 text-craftmart-900':'text-craftmart-700 hover:bg-craftmart-50'}`} onClick={()=>setTab('orders')}>My Orders</button>
            <button className={`w-full text-left px-3 py-2 rounded-lg ${tab==='wishlist'?'bg-craftmart-50 text-craftmart-900':'text-craftmart-700 hover:bg-craftmart-50'}`} onClick={()=>setTab('wishlist')}>Wishlist</button>
            <button className={`w-full text-left px-3 py-2 rounded-lg ${tab==='profile'?'bg-craftmart-50 text-craftmart-900':'text-craftmart-700 hover:bg-craftmart-50'}`} onClick={()=>setTab('profile')}>Account Information</button>
          </nav>
        </aside>
        )}

        <section className={`${tab==='dashboard' || tab==='profile' ? 'md:col-span-4' : 'md:col-span-3'}`}>
          {tab==='dashboard' && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="bg-[#fbfaf8] hover:bg-white transition-colors rounded-xl border border-craftmart-200 hover:border-craftmart-300 p-6 flex flex-col items-center text-center shadow-sm hover:shadow">
                {user.profile_image ? (
                  <img src={normalizeImageUrl(user.profile_image) || undefined} className="w-20 h-20 rounded-full object-cover ring-2 ring-craftmart-100" alt="avatar" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-craftmart-600 text-white flex items-center justify-center text-2xl ring-2 ring-craftmart-100">{user.first_name?.charAt(0) || 'U'}</div>
                )}
                <div className="mt-3 text-lg font-semibold text-craftmart-900">{user.first_name} {user.last_name}</div>
                <div className="text-sm text-craftmart-600">{user.email}</div>
                <button onClick={()=>setTab('profile')} className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-craftmart-600 text-white hover:bg-craftmart-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-9 9A2 2 0 016 16H4a1 1 0 01-1-1v-2a2 2 0 01.586-1.414l9-9z"/><path d="M15 7l-2-2"/></svg>
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-[#fbfaf8] hover:bg-white transition-colors rounded-xl border border-craftmart-200 hover:border-craftmart-300 p-6 shadow-sm hover:shadow">
                <h3 className="text-base font-semibold text-craftmart-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <button onClick={()=>setTab('orders')} className="p-4 rounded-xl border border-craftmart-100 hover:bg-craftmart-50 text-left">
                    <div className="text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12l-8 4-8-4m16 0l-8-4-8 4m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"/></svg>
                    </div>
                    <div className="font-semibold">My Orders</div>
                  </button>
                  <button onClick={()=>setTab('wishlist')} className="p-4 rounded-xl border border-craftmart-100 hover:bg-craftmart-50 text-left">
                    <div className="text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    </div>
                    <div className="font-semibold">Wishlist</div>
                  </button>
                  <button className="p-4 rounded-xl border border-craftmart-100 hover:bg-craftmart-50 text-left">
                    <div className="text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                    </div>
                    <div className="font-semibold">My Cart</div>
                  </button>
                  <button className="p-4 rounded-xl border border-craftmart-100 hover:bg-craftmart-50 text-left">
                    <div className="text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>
                    </div>
                    <div className="font-semibold">Payment</div>
                  </button>
                  <button className="p-4 rounded-xl border border-craftmart-100 hover:bg-craftmart-50 text-left">
                    <div className="text-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046a1 1 0 00-2.6 0l-.2 1.2a6.992 6.992 0 00-2.03.84l-1.05-.6a1 1 0 00-1.366.366l-1 1.732a1 1 0 00.366 1.366l1.05.606a6.992 6.992 0 000 2.04l-1.05.606a1 1 0 00-.366 1.366l1 1.732a1 1 0 001.366.366l1.05-.6a6.992 6.992 0 002.03.84l.2 1.2a1 1 0 002.6 0l.2-1.2a6.992 6.992 0 002.03-.84l1.05.6a1 1 0 001.366-.366l1-1.732a1 1 0 00-.366-1.366l-1.05-.606a6.992 6.992 0 000-2.04l1.05-.606a1 1 0 00.366-1.366l-1-1.732a1 1 0 00-1.366-.366l-1.05.6a6.992 6.992 0 00-2.03-.84l-.2-1.2zM10 13a3 3 0 110-6 3 3 0 010 6z"/></svg>
                    </div>
                    <div className="font-semibold">Settings</div>
                  </button>
                </div>
              </div>

              {/* Recent Orders Summary */}
              <div className="bg-[#fbfaf8] hover:bg-white transition-colors rounded-xl border border-craftmart-200 hover:border-craftmart-300 p-6 shadow-sm hover:shadow">
                <h3 className="text-base font-semibold text-craftmart-900 mb-4">My Recent Orders Summary</h3>
                <div className="divide-y divide-craftmart-100">
                  <div className="py-3 flex items-center justify-between text-sm">
                    <div className="text-craftmart-900 font-medium">#12345</div>
                    <div className="text-craftmart-700">2 items</div>
                    <div className="text-craftmart-900">₱1,250</div>
                    <div className="text-green-700 inline-flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      <span>Delivered</span>
                    </div>
                    <button onClick={()=>setTab('orders')} className="px-3 py-1 rounded-lg border border-craftmart-200 hover:bg-craftmart-50">View</button>
                  </div>
                  <div className="py-3 flex items-center justify-between text-sm">
                    <div className="text-craftmart-900 font-medium">#12344</div>
                    <div className="text-craftmart-700">1 item</div>
                    <div className="text-craftmart-900">₱499</div>
                    <div className="text-yellow-700 inline-flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span>Pending</span>
                    </div>
                    <button onClick={()=>setTab('orders')} className="px-3 py-1 rounded-lg border border-craftmart-200 hover:bg-craftmart-50">View</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab==='orders' && (
            <div className="bg-white rounded-xl border border-craftmart-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Orders</h2>
              <p className="text-craftmart-700">No orders yet.</p>
            </div>
          )}
          {tab==='wishlist' && (
            <div className="bg-white rounded-xl border border-craftmart-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Wishlist</h2>
              <p className="text-craftmart-700">Your wishlist is empty.</p>
            </div>
          )}
          {tab==='profile' && (
            <div className="bg-[#fbfaf8] hover:bg-white transition-colors rounded-2xl border border-craftmart-200 hover:border-craftmart-300 p-6 max-w-2xl mx-auto shadow-sm hover:shadow">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  {previewSrc ? (
                    <img src={previewSrc} className="w-24 h-24 rounded-full object-cover ring-2 ring-craftmart-100" alt="preview" />
                  ) : user.profile_image ? (
                    <img src={normalizeImageUrl(user.profile_image) || undefined} className="w-24 h-24 rounded-full object-cover ring-2 ring-craftmart-100" alt="avatar" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-craftmart-600 text-white flex items-center justify-center text-2xl ring-2 ring-craftmart-100">{user.first_name?.charAt(0) || 'U'}</div>
                  )}
                  <label className="absolute -right-1 -bottom-1 bg-craftmart-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow cursor-pointer" title="Add photo">
                    <input
                      type="file"
                      name="profile_image"
                      accept="image/*"
                      className="hidden"
                      form="profileForm"
                      onChange={(e)=>{
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ()=> setPreviewSrc(String(reader.result));
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>
                  </label>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-craftmart-900">Edit Profile</h2>
                <p className="text-sm text-craftmart-600">Update your account information</p>
              </div>

              {msg && <div className="mt-4 mb-4 px-4 py-3 rounded-lg border border-craftmart-200 bg-craftmart-50 text-sm text-craftmart-800">{msg}</div>}
              <form id="profileForm" onSubmit={submitProfile} className="space-y-5 mt-4" encType="multipart/form-data">
                <div>
                  <label className="block text-sm font-medium text-craftmart-700 mb-2">Username</label>
                  <input name="username" defaultValue={`${user.first_name ?? ''}${user.last_name ? ` ${user.last_name}` : ''}`} className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-craftmart-700 mb-2">Email</label>
                    <input name="email" defaultValue={user.email} className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-craftmart-700 mb-2">Phone</label>
                    <input name="phone" className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="button" onClick={()=>setShowChangePassword(v=>!v)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-craftmart-200 hover:bg-craftmart-50 text-left">
                    <span className="inline-flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 8V6a5 5 0 1110 0v2h1a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2h1zm2-2a3 3 0 116 0v2H7V6z" clipRule="evenodd"/></svg>
                      <span className="font-medium">Change Password</span>
                    </span>
                    <span className="text-craftmart-700">{showChangePassword ? '▲' : '▼'}</span>
                  </button>
                  {showChangePassword && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-craftmart-700 mb-2">Current Password</label>
                        <input type="password" name="current_password" className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-craftmart-700 mb-2">New Password</label>
                        <input type="password" name="new_password" className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-craftmart-700 mb-2">Confirm Password</label>
                        <input type="password" name="confirm_password" className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" placeholder="••••••••" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button type="button" onClick={()=>setTab('dashboard')} className="px-4 py-2 rounded-lg border border-craftmart-200 text-craftmart-700 hover:bg-craftmart-50">← Back to Profile</button>
                  <button disabled={pending} className="px-5 py-2 rounded-lg bg-craftmart-600 text-white hover:bg-craftmart-700 shadow-sm">{pending ? 'Saving...' : 'Save Changes'}</button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


