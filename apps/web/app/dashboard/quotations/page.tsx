'use client';

import React, { useState, useEffect } from 'react';
import { quotationsApi, Quotation, customersApi, Customer, productsApi, Product } from '@/lib/api';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import { FileText, PlusCircle, Check, X, RefreshCw, Eye, ArrowRight, Printer } from 'lucide-react';

export default function DashboardQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // New Quotation Modal
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [unitPrice, setUnitPrice] = useState(1850);
  const [taxRate, setTaxRate] = useState(18);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [notes, setNotes] = useState('');

  const fetchQuotations = () => {
    setLoading(true);
    Promise.all([
      quotationsApi.getAll({ limit: '100' }).catch(() => ({ data: [] })),
      customersApi.getAll({ limit: '100' }).catch(() => ({ data: [] })),
      productsApi.getAll().catch(() => []),
    ])
      .then(([quoRes, custRes, prods]) => {
        setQuotations(quoRes.data);
        setCustomers(custRes.data);
        setProducts(prods);
        if (custRes.data.length > 0) setSelectedCustomerId(custRes.data[0].id);
        if (prods.length > 0) setSelectedProductId(prods[0].id);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await quotationsApi.create({
      customerId: selectedCustomerId,
      notes,
      items: [
        {
          productId: selectedProductId,
          quantity: Number(quantity),
          unitPrice: Number(unitPrice),
          taxRate: Number(taxRate),
          additionalCharges: Number(additionalCharges),
        },
      ],
    });
    setNewModalOpen(false);
    fetchQuotations();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Formal Quotation Generator</h1>
          <p className="text-xs text-slate-500 mt-0.5">Generate, issue, and manage commercial LPG estimates for enterprise accounts</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchQuotations}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setNewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Quotation</span>
          </button>
        </div>
      </div>

      {/* Quotations Data Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading quotations...</div>
        ) : quotations.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No quotations generated yet. Create a commercial price estimate using the button above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quotation Code</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Item Details</th>
                  <th>Net Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quo) => (
                  <tr key={quo.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{quo.quotationCode}</td>
                    <td>
                      <div className="text-xs font-bold text-[#102A43]">{quo.customer?.name}</div>
                      <div className="text-[10px] text-slate-400">{quo.customer?.customerCode}</div>
                    </td>
                    <td className="text-xs text-slate-500">{formatDate(quo.createdAt)}</td>
                    <td className="text-xs text-slate-700">
                      {quo.items?.map((i) => `${i.product?.name || 'Item'} (x${i.quantity})`).join(', ') || '-'}
                    </td>
                    <td className="text-xs font-mono font-bold text-slate-900">
                      {Number(quo.netAmount) > 0 ? `₹${Number(quo.netAmount).toLocaleString('en-IN')}` : 'Regulated'}
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(quo.status)}>
                        {quo.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#176B9B] hover:underline"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Quotation Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">Generate Formal Quotation</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter customer, volume requirements, tariff and applicable taxes.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Select Customer</label>
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
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">LPG Product Grade</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="input-field text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Unit Tariff (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Applicable GST %</label>
                  <input
                    type="number"
                    min={0}
                    max={28}
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Delivery / Handling Charges (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={additionalCharges}
                    onChange={(e) => setAdditionalCharges(parseFloat(e.target.value) || 0)}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Terms & Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Valid for 30 days from issue, doorstep delivery included"
                  className="input-field text-xs"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between">
                <span className="font-bold text-slate-600">Calculated Net Total:</span>
                <span className="font-mono font-bold text-[#176B9B] text-sm">
                  ₹{((quantity * unitPrice + additionalCharges) * (1 + taxRate / 100)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Create Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

