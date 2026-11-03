'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { quotationsApi, Quotation } from '@/lib/api';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import { FileText, Check, X, PlusCircle, RefreshCw, AlertCircle } from 'lucide-react';

export default function CustomerQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotations = () => {
    setLoading(true);
    quotationsApi
      .getMy()
      .then((data) => setQuotations(data))
      .catch(() => setQuotations([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleAccept = async (id: string) => {
    await quotationsApi.accept(id);
    fetchQuotations();
  };

  const handleReject = async (id: string) => {
    await quotationsApi.reject(id);
    fetchQuotations();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Quotations & Price Estimates</h1>
          <p className="text-xs text-slate-500 mt-0.5">Review, accept or reject formal commercial gas quotations</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchQuotations}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/customer/commercial"
            className="px-4 py-2 rounded-lg bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all"
          >
            + Request Quotation
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading quotations...</div>
        ) : quotations.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No quotations found for your account. Use the button above to request formal enterprise pricing.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quotation Code</th>
                  <th>Created Date</th>
                  <th>Products</th>
                  <th>Total Estimate</th>
                  <th>Valid Until</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quo) => (
                  <tr key={quo.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{quo.quotationCode}</td>
                    <td className="text-xs text-slate-500">{formatDate(quo.createdAt)}</td>
                    <td>
                      <div className="text-xs font-semibold text-slate-800">
                        {quo.items?.map((item) => `${item.product?.name || 'Product'} (x${item.quantity})`).join(', ') || 'Gas Supply'}
                      </div>
                    </td>
                    <td className="text-xs font-bold text-slate-900">
                      {Number(quo.netAmount) > 0 ? `₹${quo.netAmount}` : 'Custom Regulated'}
                    </td>
                    <td className="text-xs text-slate-500">{quo.validUntil ? formatDate(quo.validUntil) : '30 Days'}</td>
                    <td>
                      <span className={getStatusBadgeClass(quo.status)}>
                        {quo.status}
                      </span>
                    </td>
                    <td>
                      {quo.status === 'DRAFT' || quo.status === 'SENT' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAccept(quo.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleReject(quo.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

