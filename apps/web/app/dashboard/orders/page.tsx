'use client';

import React, { useState, useEffect } from 'react';
import { ordersApi, Order, staffApi, Staff, deliveriesApi } from '@/lib/api';
import { formatDate, formatDateTime, getStatusBadgeClass } from '@/lib/utils';
import { ShoppingCart, Filter, Search, Check, X, Truck, Eye, RefreshCw, AlertCircle } from 'lucide-react';

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  // Status Change Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');

  // Delivery Assignment Modal
  const [assignOrder, setAssignOrder] = useState<Order | null>(null);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    ordersApi
      .getAll({ limit: '100' })
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
    staffApi.getDrivers().then((d) => setDrivers(d)).catch(() => []);
  }, []);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !newStatus) return;
    await ordersApi.updateStatus(selectedOrder.id, newStatus, statusNotes);
    setSelectedOrder(null);
    fetchOrders();
  };

  const handleAssignDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignOrder) return;
    await deliveriesApi.create({
      orderId: assignOrder.id,
      driverId: selectedDriver || undefined,
      vehicleNumber: vehicleNumber || undefined,
      scheduledDate: deliveryDate ? new Date(deliveryDate).toISOString() : new Date().toISOString(),
    });
    setAssignOrder(null);
    fetchOrders();
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (search) {
      const matchCode = o.orderCode.toLowerCase().includes(search.toLowerCase());
      const matchCust = o.customer?.name.toLowerCase().includes(search.toLowerCase());
      return matchCode || matchCust;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Order Management Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track, verify, schedule and update all customer cylinder orders</p>
        </div>

        <button
          onClick={fetchOrders}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B] self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order reference or customer name..."
            className="input-field pl-10 text-xs py-2.5"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          {['ALL', 'PENDING', 'CONFIRMED', 'SCHEDULED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                statusFilter === st
                  ? 'bg-[#176B9B] text-white border-[#176B9B]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading orders ledger...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Customer</th>
                  <th>Created Date</th>
                  <th>Items Summary</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Dispatch</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{ord.orderCode}</td>
                    <td>
                      <div className="text-xs font-bold text-[#102A43]">{ord.customer?.name}</div>
                      <div className="text-[10px] text-slate-400">{ord.customer?.customerCode}</div>
                    </td>
                    <td className="text-xs text-slate-500">{formatDate(ord.createdAt)}</td>
                    <td className="text-xs text-slate-700">
                      {ord.items?.map((i) => `${i.product?.name || 'Cylinder'} (x${i.quantity})`).join(', ') || 'LPG Refill'}
                    </td>
                    <td>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {ord.orderType}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(ord.status)}>
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="text-xs text-slate-600">
                      {ord.delivery ? (
                        <span className="font-medium text-emerald-700">
                          Scheduled ({ord.delivery.status})
                        </span>
                      ) : (
                        <button
                          onClick={() => setAssignOrder(ord)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#176B9B] hover:underline"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Assign Driver</span>
                        </button>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(ord);
                            setNewStatus(ord.status);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-[#176B9B] hover:text-white text-xs font-bold text-slate-700 transition-colors"
                        >
                          Change Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Change Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">
              Update Order Status: {selectedOrder.orderCode}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              All status updates are recorded in the system audit log.
            </p>

            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED (Stock verified)</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SCHEDULED">SCHEDULED (Driver Assigned)</option>
                  <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                  <option value="DELIVERED">DELIVERED (Handover complete)</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Status Notes / Reason</label>
                <input
                  type="text"
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="e.g. Stock confirmed at warehouse, driver notified"
                  className="input-field text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Delivery Modal */}
      {assignOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">
              Assign Dispatch Driver
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Assign order {assignOrder.orderCode} to an authorised driver and vehicle.
            </p>

            <form onSubmit={handleAssignDelivery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Select Driver</label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="">Select Authorised Driver</option>
                  {drivers.map((drv) => (
                    <option key={drv.id} value={drv.id}>
                      {drv.name} ({drv.employeeCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Vehicle Registration No.</label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. TN-57-AB-1234"
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Scheduled Delivery Date</label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="input-field text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAssignOrder(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
