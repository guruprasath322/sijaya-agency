'use client';

import React, { useState } from 'react';
import { CreditCard, Download, Printer, CheckCircle, Clock, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function CustomerInvoicesPage() {
  const [invoices] = useState([
    {
      id: 'inv-1',
      invoiceCode: 'INV-2026-001',
      orderCode: 'ORD-1094',
      date: '2026-11-01',
      items: '19 kg Commercial LPG (x4)',
      amount: '7,800.00',
      status: 'PAID',
      method: 'UPI / Direct Bank',
    },
    {
      id: 'inv-2',
      invoiceCode: 'INV-2026-002',
      orderCode: 'ORD-1098',
      date: '2026-11-03',
      items: '14.2 kg Domestic LPG Refill (x1)',
      amount: '950.00',
      status: 'PAID',
      method: 'Cash on Delivery',
    },
  ]);

  const handlePrint = (code: string) => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Payments & Invoices</h1>
          <p className="text-xs text-slate-500 mt-0.5">Download official GST-compliant tax invoices and delivery receipts</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Order Ref</th>
                <th>Billing Date</th>
                <th>Supplied Cylinders</th>
                <th>Amount (INR)</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="font-mono text-xs font-bold text-[#102A43]">{inv.invoiceCode}</td>
                  <td className="font-mono text-xs text-slate-500">{inv.orderCode}</td>
                  <td className="text-xs text-slate-600">{formatDate(inv.date)}</td>
                  <td className="text-xs font-medium text-slate-800">{inv.items}</td>
                  <td className="text-xs font-bold text-slate-900">₹{inv.amount}</td>
                  <td className="text-xs text-slate-600">{inv.method}</td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handlePrint(inv.invoiceCode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#176B9B] hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Invoice PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
