'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { AuthProvider, useAuth } from '@/components/shared/AuthContext';
import {
  Boxes,
  Truck,
  ShoppingCart,
  Calendar,
  LogOut,
  RefreshCw,
  Home,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function StaffPortalInner() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Staff Top Bar */}
      <header className="bg-[#102A43] text-white p-4 shadow-md flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Logo variant="light" size="sm" />
          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
            Staff Desk
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold px-3 flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Site</span>
          </Link>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-semibold px-3 flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Staff Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">
            Warehouse Operations & Staff Dispatch Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as {user?.staff?.name || user?.email} (Code: {user?.staff?.employeeCode || 'STAFF-01'})
          </p>
        </div>

        {/* Action Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/dashboard/orders"
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#176B9B] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#176B9B] group-hover:bg-[#176B9B] group-hover:text-white transition-colors flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">Process Customer Orders</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Verify stock reserves, confirm pending bookings, and dispatch to route.
            </p>
          </Link>

          <Link
            href="/dashboard/loads"
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#176B9B] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">Record Incoming Loads</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Log Aegis Pure gas truck manifests and record physical arrival tallies.
            </p>
          </Link>

          <Link
            href="/dashboard/inventory"
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#176B9B] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center mb-4">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">Warehouse Inventory</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Inspect current available cylinder stocks and damaged quarantine bins.
            </p>
          </Link>

          <Link
            href="/dashboard/calendar"
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#176B9B] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">Delivery Calendar</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              View daily dispatch schedules, driver allocations and vehicle runs.
            </p>
          </Link>
        </div>

        {/* Operational Safety Reminder */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900 block text-sm mb-1">Standard Warehouse Safety Operating Procedure:</strong>
            All cylinders entering the distribution depot from Aegis Pure gas must be checked with soap solution for micro-valve leaks. Tare weights must match manufacturer embossed ratings before final handover to delivery drivers.
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StaffPortalPage() {
  return (
    <AuthProvider>
      <StaffPortalInner />
    </AuthProvider>
  );
}

