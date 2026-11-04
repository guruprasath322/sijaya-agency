'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Inbox, Mail, MessageSquare, Phone, RefreshCw } from 'lucide-react';
import { SupplyRequest, supplyRequestsApi } from '@/lib/api';

const statusLabels: Record<SupplyRequest['status'], string> = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  CLOSED: 'Closed',
};

export default function SupplyRequestsPage() {
  const [requests, setRequests] = useState<SupplyRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setRequests(await supplyRequestsApi.getAll(statusFilter === 'ALL' ? undefined : statusFilter));
    } catch {
      setError('Could not load requests. Sign in with a staff or manager account and try again.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { void loadRequests(); }, [loadRequests]);

  const changeStatus = async (request: SupplyRequest, status: SupplyRequest['status']) => {
    try {
      await supplyRequestsApi.updateStatus(request.id, status);
      await loadRequests();
    } catch {
      setError('Could not update this request. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#176B9B]">
            <Inbox className="h-3.5 w-3.5" /> Website inbox
          </div>
          <h1 className="text-2xl font-extrabold text-[#102A43] sm:text-3xl">Supply Requests</h1>
          <p className="mt-1 text-sm text-slate-500">Requests sent from the public website contact form.</p>
        </div>
        <div className="flex gap-2">
          <select aria-label="Filter requests by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field min-w-36">
            <option value="ALL">All requests</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CLOSED">Closed</option>
          </select>
          <button onClick={() => void loadRequests()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </header>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading requests…</div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Inbox className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700">No requests yet</p>
          <p className="mt-1 text-sm text-slate-500">New website enquiries will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <article key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-[#102A43]">{request.name}</h2>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${request.status === 'NEW' ? 'bg-amber-50 text-amber-700' : request.status === 'CONTACTED' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {statusLabels[request.status]}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#176B9B]">{request.requirementType}</p>
                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-600">{request.message}</p>
                  <p className="text-xs text-slate-400">Received {new Date(request.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 text-sm">
                  <a href={`tel:${request.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2 font-semibold text-slate-700 hover:text-[#176B9B]"><Phone className="h-4 w-4" />{request.phone}</a>
                  {request.email && <a href={`mailto:${request.email}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-[#176B9B]"><Mail className="h-4 w-4" />{request.email}</a>}
                  <a href={`https://wa.me/${request.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"><MessageSquare className="h-4 w-4" /> WhatsApp</a>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-400">Request ID: {request.id.slice(0, 8)}</span>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  Status
                  <select value={request.status} onChange={(e) => void changeStatus(request, e.target.value as SupplyRequest['status'])} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700">
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </label>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
