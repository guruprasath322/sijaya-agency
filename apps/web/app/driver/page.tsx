'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { AuthProvider, useAuth } from '@/components/shared/AuthContext';
import { deliveriesApi, Delivery } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import {
  Truck,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  LogOut,
  RefreshCw,
  Navigation,
  FileCheck,
} from 'lucide-react';

function DriverPortalInner() {
  const { user, logout } = useAuth();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  // Delivery Proof / Action Modal
  const [activeDelivery, setActiveDelivery] = useState<Delivery | null>(null);
  const [receiverName, setReceiverName] = useState('');
  const [proofNotes, setProofNotes] = useState('Tare weight and valve safety ring checked on site.');
  const [actionType, setActionType] = useState<'DELIVER' | 'FAIL'>('DELIVER');
  const [failReason, setFailReason] = useState('Customer premise locked / unavailable');

  const fetchMyDeliveries = () => {
    setLoading(true);
    deliveriesApi
      .getMy()
      .then((data) => setDeliveries(data))
      .catch(() => setDeliveries([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyDeliveries();
  }, []);

  const handleMarkOut = async (deliveryId: string) => {
    await deliveriesApi.updateStatus(deliveryId, 'OUT_FOR_DELIVERY');
    fetchMyDeliveries();
  };

  const handleCompleteDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDelivery) return;

    if (actionType === 'DELIVER') {
      await deliveriesApi.addProof(activeDelivery.id, {
        receiverName,
        notes: proofNotes,
      });
      await deliveriesApi.updateStatus(activeDelivery.id, 'DELIVERED');
    } else {
      await deliveriesApi.updateStatus(activeDelivery.id, 'FAILED', failReason);
    }

    setActiveDelivery(null);
    fetchMyDeliveries();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Driver Mobile Top Header */}
      <header className="bg-[#102A43] text-white p-4 shadow-md flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Logo variant="light" size="sm" />
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
            Driver App
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchMyDeliveries}
            className="p-1.5 rounded-lg bg-white/10 text-white"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg bg-red-500/20 text-red-300"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Driver Info Strip */}
      <div className="bg-[#176B9B] text-white px-4 py-3 flex items-center justify-between text-xs">
        <div>
          <span>Driver: <strong>{user?.staff?.name || user?.email}</strong></span>
          <div className="text-[11px] text-blue-100">Depot: Central Regional Warehouse</div>
        </div>
        <div className="text-right">
          <span className="font-bold text-amber-300">{deliveries.length} Assigned</span>
          <div className="text-[11px] text-blue-100">Today&apos;s Route</div>
        </div>
      </div>

      {/* Main Delivery Queue Cards */}
      <main className="flex-1 p-4 max-w-lg w-full mx-auto space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading assigned route...</div>
        ) : deliveries.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-200 mt-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h2 className="text-base font-bold text-[#102A43]">All Deliveries Completed!</h2>
            <p className="text-xs text-slate-500 mt-1">
              You have no pending dispatches assigned for your route at this moment. Check with the dispatch officer.
            </p>
          </div>
        ) : (
          deliveries.map((deliv) => {
            const customer = deliv.order?.customer;
            const items = deliv.order?.items;

            return (
              <div
                key={deliv.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3.5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#102A43]">
                    {deliv.deliveryCode}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      deliv.status === 'OUT_FOR_DELIVERY'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-[#176B9B]'
                    }`}
                  >
                    {deliv.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#102A43]">
                    {customer?.name || 'Customer Name'}
                  </h3>
                  {customer?.businessName && (
                    <div className="text-xs font-bold text-[#176B9B]">{customer.businessName}</div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {deliv.address?.addressLine1 || deliv.order?.deliveryNotes || 'Address on record at dispatch'}
                    </span>
                  </div>

                  {customer?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <a href={`tel:${customer.phone}`} className="font-bold text-[#176B9B] underline">
                        {customer.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Cylinder Summary */}
                <div className="text-xs font-semibold text-slate-800 flex justify-between border-t border-slate-100 pt-3">
                  <span>Cylinders to deliver:</span>
                  <span className="font-bold text-[#102A43]">
                    {items?.map((i) => `${i.product?.name} (x${i.quantity})`).join(', ') || '1x LPG Cylinder'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex gap-2">
                  {deliv.status === 'ASSIGNED' ? (
                    <button
                      onClick={() => handleMarkOut(deliv.id)}
                      className="w-full py-2.5 rounded-xl bg-[#176B9B] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Start Route (Out for Delivery)</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setActiveDelivery(deliv);
                          setActionType('DELIVER');
                          setReceiverName(customer?.name || '');
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Handover</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveDelivery(deliv);
                          setActionType('FAIL');
                        }}
                        className="px-3 py-2.5 rounded-xl bg-red-100 text-red-700 text-xs font-bold"
                      >
                        Failed
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Handover Proof / Failure Modal */}
      {activeDelivery && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">
              {actionType === 'DELIVER' ? 'Record Delivery Proof' : 'Record Delivery Issue'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{activeDelivery.deliveryCode}</p>

            <form onSubmit={handleCompleteDelivery} className="space-y-4">
              {actionType === 'DELIVER' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Receiver Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="e.g. Ramesh / Chef Anand"
                      className="input-field text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Inspection Handover Notes
                    </label>
                    <input
                      type="text"
                      value={proofNotes}
                      onChange={(e) => setProofNotes(e.target.value)}
                      className="input-field text-xs"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Failure Reason *
                  </label>
                  <select
                    value={failReason}
                    onChange={(e) => setFailReason(e.target.value)}
                    className="input-field text-xs"
                  >
                    <option value="Customer premise locked / unavailable">Customer premise locked / unavailable</option>
                    <option value="Customer requested reschedule">Customer requested reschedule</option>
                    <option value="Address unreachable / road block">Address unreachable / road block</option>
                    <option value="Payment / verification dispute">Payment / verification dispute</option>
                  </select>
                </div>
              )}

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveDelivery(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-white text-xs font-bold ${
                    actionType === 'DELIVER' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {actionType === 'DELIVER' ? 'Complete Handover' : 'Mark Failed'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DriverPortalPage() {
  return (
    <AuthProvider>
      <DriverPortalInner />
    </AuthProvider>
  );
}

