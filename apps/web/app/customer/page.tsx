'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/shared/AuthContext';
import { ordersApi, Order, customersApi, Customer } from '@/lib/api';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import {
  Flame,
  UtensilsCrossed,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  PlusCircle,
  Truck,
  CreditCard,
} from 'lucide-react';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ordersApi.getMy().catch(() => []),
      customersApi.getMe().catch(() => null),
    ])
      .then(([ordersData, profileData]) => {
        setOrders(ordersData);
        setProfile(profileData);
      })
      .finally(() => setLoading(false));
  }, []);

  const pendingOrders = orders.filter((o) => ['PENDING', 'CONFIRMED', 'PROCESSING', 'SCHEDULED', 'OUT_FOR_DELIVERY'].includes(o.status));
  const completedOrders = orders.filter((o) => o.status === 'DELIVERED');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#102A43] via-[#176B9B] to-[#1E3A52] text-white p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Customer Portal • ID: {user?.customer?.customerCode || 'Registered'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {user?.customer?.name || 'Customer'}!
          </h1>
          <p className="text-sm text-slate-200 mt-1 max-w-xl">
            Manage your cylinder bookings, view delivery dispatch statuses, and monitor recurring supply arrangements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/customer/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Book Domestic Refill</span>
          </Link>

          <Link
            href="/customer/commercial"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
          >
            <UtensilsCrossed className="w-4 h-4 text-amber-300" />
            <span>Commercial Supply</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#176B9B] flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Bookings</div>
            <div className="text-2xl font-black text-[#102A43]">{orders.length}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress / Pending</div>
            <div className="text-2xl font-black text-amber-600">{pendingOrders.length}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Deliveries</div>
            <div className="text-2xl font-black text-emerald-600">{completedOrders.length}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Credit</div>
            <div className="text-sm font-black text-[#102A43]">
              {profile?.creditAccount ? `₹${profile.creditAccount.outstandingBalance}` : 'Standard (Cash/COD)'}
            </div>
          </div>
        </div>
      </div>

      {/* Active / Recent Orders Section */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">Active & Recent Gas Orders</h2>
            <p className="text-xs text-slate-500">Live order status tracked in the SIJAYA Agency distribution ledger</p>
          </div>
          <Link
            href="/customer/orders"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#176B9B] hover:text-[#102A43]"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-700">No Orders Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You haven&apos;t placed any gas requests yet. Click below to book your first cylinder.
            </p>
            <Link
              href="/customer/book"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book Cylinder</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Code</th>
                  <th>Date</th>
                  <th>Product / Items</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{order.orderCode}</td>
                    <td className="text-xs text-slate-500">{formatDate(order.createdAt)}</td>
                    <td>
                      <div className="text-xs font-semibold text-slate-800">
                        {order.items?.map((item) => `${item.product?.name || 'LPG Cylinder'} (x${item.quantity})`).join(', ') || 'LPG Supply'}
                      </div>
                    </td>
                    <td>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {order.orderType}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(order.status)}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/customer/orders`}
                        className="text-xs font-bold text-[#176B9B] hover:underline"
                      >
                        Track Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Safe Cylinder Operation Reminder */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex items-start gap-4 text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Important Agency Safety Reminder: </span>
          Always ensure your cylinder delivery personnel checks the tare weight seal and valve safety ring during handover. For any emergency assistance, call our agency hotline directly.
        </div>
      </div>
    </div>
  );
}

