'use client';

import React, { useState, useEffect } from 'react';
import { customersApi, Customer } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Users, Building, Phone, Mail, ShieldAlert, CreditCard, Search, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function CustomersManagementPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const fetchCustomers = () => {
    setLoading(true);
    customersApi
      .getAll({ limit: '100' })
      .then((res) => setCustomers(res.data))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter((c) => {
    if (typeFilter !== 'ALL' && c.customerType !== typeFilter) return false;
    if (search) {
      const matchName = c.name.toLowerCase().includes(search.toLowerCase());
      const matchBiz = c.businessName?.toLowerCase().includes(search.toLowerCase());
      const matchCode = c.customerCode.toLowerCase().includes(search.toLowerCase());
      return matchName || matchBiz || matchCode;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Customers & credit</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage domestic consumers, commercial enterprises, and approved credit terms</p>
        </div>

        <button aria-label="Refresh records" onClick={fetchCustomers}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B] self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input aria-label="Search records"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, business or customer code..."
            className="input-field pl-10 text-xs py-2.5"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          {['ALL', 'COMMERCIAL', 'DOMESTIC', 'BULK', 'INSTITUTIONAL'].map((tp) => (
            <button
              key={tp}
              onClick={() => setTypeFilter(tp)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                typeFilter === tp
                  ? 'bg-[#102A43] text-white border-[#102A43]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Data Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading customer directory...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">No customers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer Code</th>
                  <th>Name / Business</th>
                  <th>Contact Details</th>
                  <th>Category</th>
                  <th>Credit Limit</th>
                  <th>Outstanding</th>
                  <th>Registration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const credit = c.creditAccount;
                  const limit = credit ? Number(credit.creditLimit) : 0;
                  const balance = credit ? Number(credit.outstandingBalance) : 0;
                  const isExceeded = limit > 0 && balance > limit;

                  return (
                    <tr key={c.id}>
                      <td className="font-mono text-xs font-bold text-[#102A43]">{c.customerCode}</td>
                      <td>
                        <div className="text-xs font-bold text-[#102A43]">{c.name}</div>
                        {c.businessName && (
                          <div className="text-[11px] font-semibold text-[#176B9B]">{c.businessName}</div>
                        )}
                      </td>
                      <td className="text-xs text-slate-600">
                        <div>{c.phone}</div>
                        {c.email && <div className="text-slate-400 text-[11px]">{c.email}</div>}
                      </td>
                      <td>
                        <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                          {c.customerType}
                        </span>
                      </td>
                      <td className="text-xs font-mono font-bold text-slate-800">
                        {limit > 0 ? `₹${limit.toLocaleString('en-IN')}` : 'Pay-on-Delivery'}
                      </td>
                      <td className="text-xs font-mono font-bold">
                        <span className={balance > 0 ? 'text-amber-600' : 'text-slate-700'}>
                          ₹{balance.toLocaleString('en-IN')}
                        </span>
                        {isExceeded && (
                          <span className="block text-[10px] text-red-600 font-bold">EXCEEDED</span>
                        )}
                      </td>
                      <td className="text-xs text-slate-500">{formatDate(c.registeredAt)}</td>
                      <td>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

