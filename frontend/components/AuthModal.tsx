import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Mode = 'login' | 'signup' | 'googleFinalize';

export default function AuthModal() {
  const { isOpen, closeAuth, setUser } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [prefillEmail, setPrefillEmail] = useState<string>('');

  const apiBase = useMemo(() => {
    // In dev (Vite on :3000) talk to XAMPP at http://localhost/craftmart_projct
    if (window.location.port === '3000') {
      return 'http://localhost/craftmart_projct/api/auth/';
    }
    // When served from XAMPP, construct from the first path segment
    const parts = window.location.pathname.split('/').filter(Boolean);
    const root = parts.length ? `/${parts[0]}` : '';
    return `${root}/api/auth/`;
  }, []);

  if (!isOpen) return null;

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(null); setInfo(null); setPending(true);
    const form = e.currentTarget as any;
    try {
      const res = await fetch(`${apiBase}login.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.email.value, password: form.password.value }) });
      const data = await res.json();
      if (data.success) { setUser(data.user); closeAuth(); }
      else setError(data.message || 'Login failed');
    } catch { setError('Network error'); }
    finally { setPending(false); }
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(null); setInfo(null); setPending(true);
    const form = e.currentTarget as any;
    try {
      const payload = new FormData(form);
      const res = await fetch(`${apiBase}signup.php`, { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) {
        // After signup, require explicit login
        setPrefillEmail(form.email?.value || '');
        setMode('login');
        setInfo('Account created successfully. Please log in.');
      }
      else setError(data.message || 'Signup failed');
    } catch { setError('Network error'); }
    finally { setPending(false); }
  };

  const startGoogle = async () => {
    // Placeholder: simulate Google login, then ask for remaining fields
    setMode('googleFinalize');
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-7 text-center">
          <div className="flex justify-center mb-3">
            <img src="/logo/CraftMart_logo.png" alt="CraftMart" className="h-8 w-auto" />
          </div>
          <h3 className="text-xl font-extrabold text-craftmart-900">{mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Complete your profile'}</h3>
          {mode !== 'googleFinalize' && <p className="mt-2 text-xs text-craftmart-500">Use your email to {mode === 'login' ? 'sign in' : 'sign up'}</p>}
        </div>

        <div className="px-7 pb-7">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
              {error}
            </div>
          )}
          {info && (
            <div className="mb-4 px-4 py-3 rounded-lg border border-green-200 bg-green-50 text-sm text-green-700">
              {info}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={onLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">Email</label>
                <input name="email" type="email" defaultValue={prefillEmail} required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">Password</label>
                <div className="relative">
                  <input name="password" id="loginPassword" type="password" required className="w-full px-3 py-2 pr-10 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                  <button type="button" aria-label="Toggle password" onClick={() => {
                    const el = document.getElementById('loginPassword') as HTMLInputElement | null;
                    if (el) el.type = el.type === 'password' ? 'text' : 'password';
                  }} className="absolute inset-y-0 right-2 flex items-center text-craftmart-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-craftmart-600">
                <label className="inline-flex items-center space-x-2"><input type="checkbox" className="rounded" /> <span>Remember me</span></label>
                <button type="button" className="hover:underline">Forgot password?</button>
              </div>
              <button disabled={pending} className="w-full bg-craftmart-600 text-white py-2 rounded-lg hover:bg-craftmart-700">{pending ? 'Signing in...' : 'Login now'}</button>
              <button type="button" onClick={startGoogle} className="w-full mt-2 border border-craftmart-200 py-2 rounded-lg flex items-center justify-center space-x-2">
                <svg viewBox="0 0 48 48" className="w-4 h-4"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.64,6.053,29.082,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.349,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,14,24,14c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C33.64,6.053,29.082,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.165,0,9.86-1.977,13.409-5.191l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.281-7.931 l-6.49,5.005C9.63,39.556,16.345,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-3.996,5.571c0.001-0.001,0.002-0.001,0.003-0.002 l6.19,5.238C36.862,39.252,44,34,44,24C44,22.659,43.862,21.349,43.611,20.083z"/></svg>
                <span>Continue with Google</span>
              </button>
              <p className="text-sm text-craftmart-600 text-center">Don&apos;t have an account? <button type="button" onClick={() => setMode('signup')} className="text-craftmart-700 font-medium">Sign up</button></p>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={onSignup} className="space-y-4" encType="multipart/form-data">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-craftmart-700 mb-2">First Name</label>
                  <input name="first_name" required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-craftmart-700 mb-2">Last Name</label>
                  <input name="last_name" required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">Email</label>
                <input name="email" type="email" required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">Password</label>
                <div className="relative">
                  <input name="password" id="signupPassword" type="password" required className="w-full px-3 py-2 pr-10 text-sm border border-craftmart-200 rounded-lg focus:ring-2 focus:ring-craftmart-500 focus:border-craftmart-500" />
                  <button type="button" aria-label="Toggle password" onClick={() => {
                    const el = document.getElementById('signupPassword') as HTMLInputElement | null;
                    if (el) el.type = el.type === 'password' ? 'text' : 'password';
                  }} className="absolute inset-y-0 right-2 flex items-center text-craftmart-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
              </div>
              <input type="hidden" name="user_type" value="buyer" />
              <button disabled={pending} className="w-full bg-craftmart-600 text-white py-2 rounded-lg hover:bg-craftmart-700">{pending ? 'Creating...' : 'Create Account'}</button>
              <p className="text-sm text-craftmart-600 text-center">Already have an account? <button type="button" onClick={() => setMode('login')} className="text-craftmart-700 font-medium">Log in</button></p>
            </form>
          )}

          {mode === 'googleFinalize' && (
            <form onSubmit={onSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-craftmart-700 mb-2">First Name</label>
                  <input name="first_name" required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-craftmart-700 mb-2">Last Name</label>
                  <input name="last_name" required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-craftmart-700 mb-2">Email</label>
                <input name="email" type="email" required className="w-full px-3 py-2 text-sm border border-craftmart-200 rounded-lg bg-gray-100" readOnly defaultValue="googleuser@example.com" />
              </div>
              <input type="hidden" name="password" value="google-oauth" />
              <input type="hidden" name="user_type" value="buyer" />
              <button disabled={pending} className="w-full bg-craftmart-600 text-white py-2 rounded-lg hover:bg-craftmart-700">Continue</button>
              <p className="text-sm text-craftmart-600 text-center">Not you? <button type="button" onClick={() => setMode('login')} className="text-craftmart-700 font-medium">Back to login</button></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


