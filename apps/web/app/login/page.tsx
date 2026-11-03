'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { authApi } from '@/lib/api';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, KeyRound, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authApi.login(email, password);
      // Route based on role
      if (res.role === 'ADMIN' || res.role === 'MANAGER') {
        router.push('/dashboard');
      } else if (res.role === 'DRIVER') {
        router.push('/driver');
      } else if (res.role === 'STAFF') {
        router.push('/staff');
      } else {
        router.push('/customer');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo credential autofillers for evaluation
  const setDemoRole = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Admin@123456');
    if (roleEmail === 'manager@sijaya.in') setPassword('Manager@123456');
    if (roleEmail === 'driver@sijaya.in') setPassword('Driver@123456');
    if (roleEmail === 'customer@sijaya.in') setPassword('Customer@123456');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-4">
          <Logo size="lg" />
        </Link>
        <h2 className="text-2xl font-black text-[#102A43] tracking-tight">
          Sign In to SIJAYA GasFlow
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Access your LPG customer portal, operations, or driver dispatch
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? <span>Signing In...</span> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#176B9B]" />
              <span>Quick Test Account Fillers:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDemoRole('manager@sijaya.in')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left font-medium text-slate-700 hover:text-[#176B9B] transition-colors"
              >
                👔 Manager
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('admin@sijaya.in')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left font-medium text-slate-700 hover:text-[#176B9B] transition-colors"
              >
                ⚡ Admin
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('customer@sijaya.in')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left font-medium text-slate-700 hover:text-[#176B9B] transition-colors"
              >
                🏠 Customer
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('driver@sijaya.in')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left font-medium text-slate-700 hover:text-[#176B9B] transition-colors"
              >
                🚚 Driver
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            New customer?{' '}
            <Link href="/register" className="font-bold text-[#176B9B] hover:underline">
              Create a Customer Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

