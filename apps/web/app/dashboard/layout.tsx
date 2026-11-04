'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { AuthProvider, useAuth } from '@/components/shared/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Boxes,
  Layers,
  Users,
  CreditCard,
  FileText,
  Calendar,
  BarChart2,
  Sliders,
  FileCheck,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  Home,
  CheckCircle,
  Clock,
  Sparkles,
  Inbox,
} from 'lucide-react';

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuGroups = [
    {
      group: 'Core Operations',
      items: [
        { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
        { label: 'Incoming Loads', href: '/dashboard/loads', icon: Truck },
        { label: 'Inventory Ledger', href: '/dashboard/inventory', icon: Boxes },
        { label: 'Cylinder Tracking', href: '/dashboard/cylinders', icon: Layers },
        { label: 'Deliveries Dispatch', href: '/dashboard/deliveries', icon: CheckCircle },
        { label: 'Delivery Calendar', href: '/dashboard/calendar', icon: Calendar },
      ],
    },
    {
      group: 'Commercial & Accounts',
      items: [
        { label: 'Customers & Credit', href: '/dashboard/customers', icon: Users },
        { label: 'Quotations', href: '/dashboard/quotations', icon: FileText },
        { label: 'Payments & Invoices', href: '/dashboard/payments', icon: CreditCard },
        { label: 'Analytics & Reports', href: '/dashboard/reports', icon: BarChart2 },
      ],
    },
    {
      group: 'Administration & CMS',
      items: [
        { label: 'Brand Carousel', href: '/dashboard/brands', icon: Sparkles },
        { label: 'Website Content', href: '/dashboard/content', icon: Sliders },
        { label: 'Supply Requests', href: '/dashboard/requests', icon: Inbox },
        { label: 'Staff & Drivers', href: '/dashboard/staff', icon: Users },
        { label: 'Audit Logs', href: '/dashboard/audit', icon: ShieldAlert },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#102A43] text-white p-4 flex items-center justify-between border-b border-slate-800">
        <Logo variant="light" size="sm" />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:block w-full lg:w-64 bg-[#102A43] text-white flex-shrink-0 flex flex-col justify-between p-4 lg:min-h-screen z-30 overflow-y-auto`}
      >
        <div>
          {/* Logo */}
          <div className="hidden lg:flex items-center justify-between px-2 py-3 mb-6 border-b border-white/10">
            <Logo variant="light" size="md" />
          </div>

          {/* User Badge */}
          <div className="p-3 mb-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#176B9B] flex items-center justify-center font-bold text-white text-xs">
              {user?.role?.slice(0, 3) || 'ADM'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">
                {user?.staff?.name || user?.email || 'SIJAYA Agency Administrator'}
              </div>
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                {user?.role || 'MANAGER'} LEVEL
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-6">
            {menuGroups.map((grp) => (
              <div key={grp.group} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#176B9B] text-white shadow-sm'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 mt-6">
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Operational Bar */}
        <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-3.5 items-center justify-between shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span>Supplier Partner: <strong className="text-[#102A43]">Aegis Pure gas</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Warehouse Live Database
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-[#176B9B] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              View Public Site
            </Link>

            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </AuthProvider>
  );
}

