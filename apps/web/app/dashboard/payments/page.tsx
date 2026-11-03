'use client';

import React, { useState, useEffect } from 'react';
import { paymentsApi, Payment, customersApi, Customer } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { CreditCard, PlusCircle, CheckCircle2, RefreshCw } from 'lucide-react';

export default function DashboardPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  // New Payment Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [amount, setAmount] = useState(1950);
  const [method, setMethod] = useState('UPI');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');

  const fetchPayments = () => {
    setLoading(true);
    Promise.all([
      paymentsApi.getAll({ limit: '100' }).catch(() => ({ data: [] })),
      customersApi.getAll({ limit: '100' }).catch(() => ({ data: [] })),
    ])
      .then(([payRes, custRes]) => {
        setPayments(payRes.data);
        setCustomers(custRes.data);
        if (custRes.data.length > 0) setSelectedCustomerId(custRes.data[0].id);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    await paymentsApi.create({
      customerId: selectedCustomerId,
      amount: Number(amount),
      method,
      reference,
      notes,
    });
    setModalOpen(false);
    fetchPayments();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Payments & Settlement Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">Record customer settlements, bank transfers, UPI and cash on delivery collections</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPayments}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Customer Payment</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">No payments recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Payment Code</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Reference</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{p.paymentCode}</td>
                    <td className="text-xs font-bold text-slate-800">{p.customerId}</td>
                    <td className="text-xs text-slate-500">{formatDate(p.createdAt)}</td>
                    <td className="text-xs font-mono font-bold text-emerald-700">₹{p.amount}</td>
                    <td className="text-xs text-slate-600">{p.method}</td>
                    <td className="text-xs font-mono text-slate-500">{p.reference || '-'}</td>
                    <td>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">Record Payment Settlement</h3>
            <p className="text-xs text-slate-500 mb-4">Post payment credit to customer account ledger.</p>

            <form onSubmit={handleRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Customer Account</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="input-field text-xs"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.businessName || c.customerCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Payment Amount (₹)</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="input-field text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="UPI">UPI / QR Code</option>
                  <option value="CASH">Cash on Delivery (COD)</option>
                  <option value="BANK_TRANSFER">Direct Bank Transfer / NEFT</option>
                  <option value="CHEQUE">Business Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Transaction Ref / Cheque No.</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. UPI-983719823 or CHQ-00129"
                  className="input-field text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Confirm Payment Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
