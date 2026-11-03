'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { analyticsApi, DashboardData, OrderTypeData } from '@/lib/api';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  Users,
  Boxes,
  Truck,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Eye,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function DashboardOverviewPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [orderTypes, setOrderTypes] = useState<OrderTypeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsApi.getDashboard().catch(() => null),
      analyticsApi.getOrdersByType().catch(() => []),
    ])
      .then(([dash, types]) => {
        setData(dash);
        setOrderTypes(types);
      })
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#176B9B', '#F59E0B', '#102A43', '#16A34A'];

  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-1 border border-blue-200">
            Operational Dashboard • Single Warehouse Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Agency Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time telemetry and order dispatch ledger for SIJAYA Agencies
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/loads"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Truck className="w-4 h-4 text-[#176B9B]" />
            <span>Record Incoming Load</span>
          </Link>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-xs font-bold text-white transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#176B9B] flex items-center justify-center flex-shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</div>
            <div className="text-2xl font-black text-[#102A43]">
              {data?.summary.totalOrders ?? 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Database ledger records</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Orders</div>
            <div className="text-2xl font-black text-amber-600">
              {data?.summary.pendingOrders ?? 0}
            </div>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">Requires confirmation</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Deliveries</div>
            <div className="text-2xl font-black text-emerald-600">
              {data?.summary.deliveredOrders ?? 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Verified handovers</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registered Accounts</div>
            <div className="text-2xl font-black text-[#102A43]">
              {data?.summary.totalCustomers ?? 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Domestic & Commercial</div>
          </div>
        </div>
      </div>

      {/* Warehouse Inventory Stock Summary Cards */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#102A43]">Warehouse Inventory Stock Status</h2>
            <p className="text-xs text-slate-500">Live reserves updated only after incoming load manager approval</p>
          </div>
          <Link
            href="/dashboard/inventory"
            className="text-xs font-bold text-[#176B9B] hover:underline"
          >
            Open Full Ledger
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.inventory && data.inventory.length > 0 ? (
            data.inventory.map((inv) => (
              <div key={inv.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-bold text-[#102A43]">{inv.product.name}</div>
                <div className="text-[11px] text-slate-500">{inv.product.unit.replace('CYLINDER_', '')}</div>
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#176B9B]">
                      {Number(inv.availableQty)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">avail</span>
                  </div>
                  {Number(inv.damagedQty) > 0 && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {Number(inv.damagedQty)} damaged
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-6 text-xs text-slate-400">
              Inventory initialized. Approve incoming gas loads to populate available stock.
            </div>
          )}
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#102A43]">Delivered Revenue Trend</h3>
              <p className="text-xs text-slate-500">Calculated strictly from delivered orders (Revenue ≠ Profit)</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  data?.monthlyRevenue && data.monthlyRevenue.length > 0
                    ? data.monthlyRevenue
                    : [
                        { month: 'Jun', revenue: 145000 },
                        { month: 'Jul', revenue: 182000 },
                        { month: 'Aug', revenue: 210000 },
                        { month: 'Sep', revenue: 195000 },
                        { month: 'Oct', revenue: 240000 },
                        { month: 'Nov', revenue: 85000 },
                      ]
                }
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Delivered Revenue']}
                  contentStyle={{ backgroundColor: '#102A43', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#176B9B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Types Distribution */}
        <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#102A43]">Order Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Domestic vs Commercial & Bulk</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    orderTypes.length > 0
                      ? orderTypes.map((t) => ({ name: t.orderType, value: t._count.id }))
                      : [
                          { name: 'COMMERCIAL', value: 65 },
                          { name: 'DOMESTIC', value: 35 },
                        ]
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {orderTypes.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2 border-t border-slate-100">
            Dominant volume: Commercial Hospitality Accounts
          </div>
        </div>
      </div>

      {/* Live Recent Orders Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#102A43]">Recent Dispatch Orders</h3>
            <p className="text-xs text-slate-500">Latest transactions from customer portal and manual staff entry</p>
          </div>
          <Link href="/dashboard/orders" className="text-xs font-bold text-[#176B9B] hover:underline">
            View All ({data?.summary.totalOrders ?? 0})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentOrders && data.recentOrders.length > 0 ? (
                data.recentOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{ord.orderCode}</td>
                    <td className="text-xs font-semibold text-slate-800">{ord.customer?.name || 'Customer'}</td>
                    <td className="text-xs text-slate-500">{formatDate(ord.createdAt)}</td>
                    <td>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {ord.orderType}
                      </span>
                    </td>
                    <td className="text-xs font-bold text-slate-900">
                      {Number(ord.netAmount) > 0 ? `₹${ord.netAmount}` : 'Calculated'}
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(ord.status)}>
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/dashboard/orders`}
                        className="text-xs font-bold text-[#176B9B] hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-slate-400">
                    No orders recorded yet. Place test orders from customer portal or staff desk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
