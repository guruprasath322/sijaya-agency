'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { authApi } from '@/lib/api';
import { Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, KeyRound, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authApi.login(email, password);
      if (res.role === 'CUSTOMER') {
        await authApi.logout();
        setError('Customer sign-in is unavailable. Please use the gas supply request form instead.');
        return;
      }
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
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] lg:grid lg:grid-cols-2">
      <aside className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-primary p-12 text-white lg:flex xl:p-16">
        <Link href="/" className="self-start rounded-lg"><Logo variant="light" size="lg" /></Link>
        <div className="relative z-10 my-16 max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">SIJAYA Agency workspace</p>
          <h2 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">A better day<br />starts with<br /><span className="text-amber-300">everything in order.</span></h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-slate-300">Your orders, inventory, and deliveries. One connected workspace for the team behind every cylinder.</p>
          <div className="mt-8 flex items-center gap-3 text-xs text-slate-300"><ShieldCheck className="h-5 w-5 text-amber-300" />For agency staff, managers, and drivers</div>
        </div>
        <p className="text-xs text-slate-400">SIJAYA Agency · Supply partner: Aegis Puregas</p>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full border-[48px] border-white/[0.03]" />
      </aside>
      <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-10 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex min-h-11 items-center gap-2 text-xs font-medium text-slate-500 hover:text-primary"><ArrowLeft className="h-4 w-4" />Back to website</Link>
          <div className="mb-8 lg:hidden"><Logo size="lg" /></div>
          <p className="eyebrow">Welcome back</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Sign in to your workspace.</h1>
          <p className="mb-8 mt-3 text-sm leading-6 text-slate-500">Access staff operations and driver dispatch.</p>
        <div className="bg-white p-6 sm:p-8 shadow-[0_8px_40px_-16px_rgba(16,42,67,0.15)] rounded-2xl border border-slate-200/80">
          {error && (
            <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form aria-busy={loading} onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  name="email"
                  autoComplete="username"
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
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-10 pr-12"
                />
                <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:text-primary">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /><span>Signing in…</span></> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Helper */}
          <details className="mt-7 border-t border-slate-100 pt-5">
            <summary className="mb-3 cursor-pointer text-xs font-medium text-slate-500">
              <KeyRound className="w-3.5 h-3.5 text-[#176B9B] inline" />
              <span className="ml-2">Demo account shortcuts</span>
            </summary>
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
                onClick={() => setDemoRole('driver@sijaya.in')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left font-medium text-slate-700 hover:text-[#176B9B] transition-colors"
              >
                🚚 Driver
              </button>
            </div>
          </details>

        </div>
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">Need LPG for your home or business? <Link href="/contact" className="font-semibold text-corporate hover:underline">Send a supply request</Link></p>
        </div>
      </main>
    </div>
  );
}

