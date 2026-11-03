'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ordersApi, Order } from '@/lib/api';
import { formatDate, formatDateTime, getStatusBadgeClass } from '@/lib/utils';
import { Package, Truck, Clock, Eye, AlertCircle, RefreshCw, X, ShieldCheck } from 'lucide-react';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeModalOrder, setActiveModalOrder] = useState<Order | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    ordersApi
      .getMy()
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'ALL') return true;
    return o.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Order History & Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">Live status of your domestic and commercial cylinder bookings</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchOrders}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B] hover:bg-slate-50 transition-colors"
            title="Refresh Orders"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/customer/book"
            className="px-4 py-2 rounded-lg bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold shadow-sm transition-all"
          >
            + New Booking
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {['ALL', 'PENDING', 'CONFIRMED', 'SCHEDULED', 'OUT_FOR_DELIVERY', 'DELIVERED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              statusFilter === st
                ? 'bg-[#102A43] text-white border-[#102A43]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No orders found under selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Placed Date</th>
                  <th>Items & Quantity</th>
                  <th>Category</th>
                  <th>Fulfillment Status</th>
                  <th>Delivery Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{order.orderCode}</td>
                    <td className="text-xs text-slate-500">{formatDate(order.createdAt)}</td>
                    <td>
                      <div className="text-xs font-semibold text-slate-800">
                        {order.items?.map((item) => `${item.product?.name || 'Cylinder'} (x${item.quantity})`).join(', ') || 'LPG Refill'}
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
                    <td className="text-xs text-slate-600">
                      {order.delivery ? (
                        <span>
                          {order.delivery.status.replace(/_/g, ' ')}
                          {order.delivery.vehicleNumber && ` (${order.delivery.vehicleNumber})`}
                        </span>
                      ) : (
                        <span className="text-slate-400">Warehouse Queue</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => setActiveModalOrder(order)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#176B9B] hover:underline"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModalOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Order Tracking
              </span>
              <span className={getStatusBadgeClass(activeModalOrder.status)}>
                {activeModalOrder.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#102A43] mb-1">
              {activeModalOrder.orderCode}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Placed on {formatDateTime(activeModalOrder.createdAt)}
            </p>

            <div className="space-y-4 border-t border-b border-slate-100 py-4 text-xs text-slate-700">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Cylinder Breakdown:</span>
                <ul className="space-y-1">
                  {activeModalOrder.items?.map((item) => (
                    <li key={item.id} className="flex justify-between py-1 border-b border-slate-50">
                      <span>{item.product?.name || 'LPG Product'}</span>
                      <span className="font-bold font-mono">Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Delivery Dispatch:</span>
                {activeModalOrder.delivery ? (
                  <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                    <div>Status: <span className="font-bold">{activeModalOrder.delivery.status}</span></div>
                    {activeModalOrder.delivery.vehicleNumber && (
                      <div>Vehicle: <span className="font-bold">{activeModalOrder.delivery.vehicleNumber}</span></div>
                    )}
                    {activeModalOrder.delivery.scheduledDate && (
                      <div>Scheduled: {formatDate(activeModalOrder.delivery.scheduledDate)}</div>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-500 italic">In warehouse processing queue. A driver will be assigned shortly.</div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalOrder(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

