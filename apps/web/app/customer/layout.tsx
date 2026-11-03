'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { AuthProvider, useAuth } from '@/components/shared/AuthContext';
import {
  LayoutDashboard,
  Flame,
  UtensilsCrossed,
  Package,
  CalendarCheck,
  FileText,
  CreditCard,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Bell,
} from 'lucide-react';

function CustomerLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/customer', icon: LayoutDashboard },
    { label: 'Book Domestic Gas', href: '/customer/book', icon: Flame },
    { label: 'Commercial & Bulk', href: '/customer/commercial', icon: UtensilsCrossed },
    { label: 'Order History', href: '/customer/orders', icon: Package },
    { label: 'Recurring Subscriptions', href: '/customer/subscriptions', icon: CalendarCheck },
    { label: 'Quotations', href: '/customer/quotations', icon: FileText },
    { label: 'Payments & Invoices', href: '/customer/invoices', icon: CreditCard },
    { label: 'Delivered History', href: '/customer/consumption', icon: BarChart3 },
    { label: 'My Profile & Addresses', href: '/customer/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#102A43] text-white p-4 flex items-center justify-between border-b border-slate-800">
        <Logo variant="light" size="sm" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg bg-white/10 text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#102A43] text-white flex-shrink-0 flex flex-col justify-between p-4 md:min-h-screen z-30`}
      >
        <div>
          <div className="hidden md:flex items-center justify-between px-2 py-4 mb-4 border-b border-white/10">
            <Logo variant="light" size="md" />
          </div>

          {/* User Profile Snippet */}
          <div className="p-3 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#176B9B] flex items-center justify-center font-bold text-white text-sm">
              {user?.customer?.name?.charAt(0) || user?.email?.charAt(0) || 'C'}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white truncate">
                {user?.customer?.name || 'Customer Account'}
              </div>
              <div className="text-[11px] text-amber-400 truncate">
                {user?.customer?.businessName || user?.customer?.customerCode || 'Domestic Customer'}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#176B9B] text-white shadow-sm'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Public Website</span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CustomerLayoutInner>{children}</CustomerLayoutInner>
    </AuthProvider>
  );
}
