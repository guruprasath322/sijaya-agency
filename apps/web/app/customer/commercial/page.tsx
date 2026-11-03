'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/shared/AuthContext';
import { productsApi, customersApi, ordersApi, quotationsApi, Product, Customer } from '@/lib/api';
import { UtensilsCrossed, FileText, CheckCircle2, AlertCircle, ArrowRight, Building, Truck } from 'lucide-react';

export default function CommercialBookingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<Customer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(5);
  const [requestMode, setRequestMode] = useState<'ORDER' | 'QUOTATION'>('ORDER');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsApi.getAll().then((data) => {
      const commercialProds = data.filter((p) => p.unit === 'CYLINDER_19KG' || p.unit === 'KG');
      setProducts(commercialProds.length > 0 ? commercialProds : data);
      if (commercialProds.length > 0) setSelectedProduct(commercialProds[0].id);
    });

    customersApi.getMe().then((data) => setProfile(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    setError(null);

    try {
      if (requestMode === 'ORDER') {
        const order = await ordersApi.create({
          customerId: profile.id,
          orderType: 'COMMERCIAL',
          notes,
          items: [
            {
              productId: selectedProduct,
              quantity: Number(quantity),
              unitPrice: 0, // Commercial regulated rate computed on invoice
              taxRate: 0,
            },
          ],
        });
        setSuccessCode(order.orderCode);
      } else {
        const quo = await quotationsApi.create({
          customerId: profile.id,
          notes,
          items: [
            {
              productId: selectedProduct,
              quantity: Number(quantity),
              unitPrice: 0,
              taxRate: 18,
            },
          ],
        });
        setSuccessCode(quo.quotationCode);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Operation failed.');
      } else {
        setError('Operation failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          Enterprise & Commercial Desk
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
          Commercial & Bulk LPG Supply
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          High-volume 19 kg cylinders and bulk manifold supply for hotels, bakeries, hostels and industrial users.
        </p>
      </div>

      {successCode ? (
        <div className="rounded-2xl bg-white border border-emerald-200 shadow-md p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#102A43]">
            {requestMode === 'ORDER' ? 'Commercial Order Submitted!' : 'Quotation Request Sent!'}
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your reference identifier is{' '}
            <span className="font-mono font-bold text-[#176B9B] text-base">{successCode}</span>.
            Our commercial accounts team will review and schedule your dispatch.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => router.push(requestMode === 'ORDER' ? '/customer/orders' : '/customer/quotations')}
              className="px-6 py-2.5 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43] shadow-sm"
            >
              View in Records
            </button>
            <button
              onClick={() => {
                setSuccessCode(null);
                setQuantity(5);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Submit Another
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Action Type Toggle */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setRequestMode('ORDER')}
                className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  requestMode === 'ORDER'
                    ? 'bg-white text-[#102A43] shadow-sm'
                    : 'text-slate-500 hover:text-[#102A43]'
                }`}
              >
                <Truck className="w-4 h-4 text-[#176B9B]" />
                <span>Direct Supply Order</span>
              </button>
              <button
                type="button"
                onClick={() => setRequestMode('QUOTATION')}
                className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  requestMode === 'QUOTATION'
                    ? 'bg-white text-[#102A43] shadow-sm'
                    : 'text-slate-500 hover:text-[#102A43]'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Formal Price Quotation</span>
              </button>
            </div>

            {/* Product Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Commercial Product Grade *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 ${
                      selectedProduct === p.id
                        ? 'border-amber-500 bg-amber-50/40'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      19kg
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#102A43]">{p.name}</div>
                      {p.nameTamil && (
                        <div className="text-xs text-[#176B9B] font-tamil">{p.nameTamil}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Required Quantity *
              </label>
              <input
                type="number"
                min={1}
                max={500}
                required
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="input-field max-w-xs font-bold text-base"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                For bulk manifold tank setups, specify total metric kilograms or cylinder count.
              </span>
            </div>

            {/* Business / Delivery Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kitchen / Facility Delivery Details & Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify preferred delivery schedule, kitchen access details, or special bulk gas connection requirements..."
                className="input-field resize-none text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? <span>Processing...</span> : (
                <>
                  <span>
                    {requestMode === 'ORDER' ? 'Submit Commercial Supply Order' : 'Generate Formal Quotation Request'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

