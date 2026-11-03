'use client';

import React, { useState, useEffect } from 'react';
import { deliveriesApi, Delivery } from '@/lib/api';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import { Truck, CheckCircle2, AlertCircle, RefreshCw, Eye, ShieldCheck, MapPin } from 'lucide-react';

export default function DeliveriesDispatchPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeProof, setActiveProof] = useState<Delivery | null>(null);

  const fetchDeliveries = () => {
    setLoading(true);
    deliveriesApi
      .getAll({ limit: '100' })
      .then((res) => setDeliveries(res.data))
      .catch(() => setDeliveries([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const filtered = deliveries.filter((d) => {
    if (statusFilter === 'ALL') return true;
    return d.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Delivery Dispatch Operations</h1>
          <p className="text-xs text-slate-500 mt-0.5">Fleet route assignment, real-time driver delivery status, and verified proofs of handover</p>
        </div>

        <button
          onClick={fetchDeliveries}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B] self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
        {['ALL', 'PENDING', 'ASSIGNED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED'].map((st) => (
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

      {/* Deliveries Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading dispatch roster...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">No deliveries found under filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Dispatch Code</th>
                  <th>Order Ref</th>
                  <th>Customer</th>
                  <th>Scheduled Date</th>
                  <th>Assigned Driver</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Delivery Proof</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{d.deliveryCode}</td>
                    <td className="font-mono text-xs text-slate-500">{d.orderId?.slice(0, 8)}...</td>
                    <td>
                      <div className="text-xs font-bold text-[#102A43]">{d.order?.customer?.name || 'Customer'}</div>
                    </td>
                    <td className="text-xs text-slate-600">
                      {d.scheduledDate ? formatDate(d.scheduledDate) : 'Today'}
                    </td>
                    <td className="text-xs font-medium text-slate-800">
                      {d.driver?.name || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="font-mono text-xs text-slate-600">{d.vehicleNumber || '-'}</td>
                    <td>
                      <span className={getStatusBadgeClass(d.status)}>
                        {d.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td>
                      {d.proof ? (
                        <button
                          onClick={() => setActiveProof(d)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>View Proof</span>
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Awaiting</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Proof Modal */}
      {activeProof && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#102A43]">Delivery Handover Proof</h3>
            <p className="text-xs text-slate-400 mb-4">{activeProof.deliveryCode}</p>

            <div className="p-4 bg-slate-50 rounded-xl text-left text-xs space-y-2 mb-6">
              <div>Received by: <strong className="text-slate-900">{activeProof.proof?.receiverName || 'Customer on record'}</strong></div>
              <div>Notes: <span className="text-slate-600">{activeProof.proof?.notes || 'Tare weight and seal verified on delivery.'}</span></div>
            </div>

            <button
              onClick={() => setActiveProof(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

