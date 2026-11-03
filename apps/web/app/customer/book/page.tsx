'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/shared/AuthContext';
import { productsApi, customersApi, ordersApi, Product, Customer } from '@/lib/api';
import { Flame, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function BookDomesticPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<Customer | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [newAddress, setNewAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOrder, setSuccessOrder] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productsApi.getAll().then((data) => {
      // Filter domestic cylinders
      const domesticProds = data.filter((p) => p.unit === 'CYLINDER_14KG' || p.unit === 'CYLINDER_5KG');
      setProducts(domesticProds.length > 0 ? domesticProds : data);
      if (domesticProds.length > 0) setSelectedProduct(domesticProds[0].id);
    });

    customersApi.getMe().then((data) => {
      setProfile(data);
      if (data.addresses && data.addresses.length > 0) {
        const defaultAddr = data.addresses.find((a) => a.isDefault) || data.addresses[0];
        setSelectedAddress(defaultAddr.id);
      }
    });
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    setError(null);

    try {
      const order = await ordersApi.create({
        customerId: profile.id,
        orderType: 'DOMESTIC',
        deliveryNotes: deliveryNotes || (newAddress ? `Address: ${newAddress}` : undefined),
        items: [
          {
            productId: selectedProduct,
            quantity: Number(quantity),
            unitPrice: 0, // Regulated official price finalized in invoice
            taxRate: 0,
          },
        ],
      });

      setSuccessOrder(order.orderCode);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to place booking.');
      } else {
        setError('Booking failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-2">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          Domestic Refill Request
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
          Book Household LPG Cylinder
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Select cylinder size and delivery destination for prompt dispatch.
        </p>
      </div>

      {successOrder ? (
        <div className="rounded-2xl bg-white border border-emerald-200 shadow-md p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#102A43]">Cylinder Booking Confirmed!</h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your booking reference is{' '}
            <span className="font-mono font-bold text-[#176B9B] text-base">{successOrder}</span>.
            Our agency dispatch officer is verifying inventory and assigning a delivery slot.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => router.push('/customer/orders')}
              className="px-6 py-2.5 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43] shadow-sm"
            >
              View Order in History
            </button>
            <button
              onClick={() => {
                setSuccessOrder(null);
                setQuantity(1);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
            >
              Book Another
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

          <form onSubmit={handleBooking} className="space-y-6">
            {/* Product Size Choice */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Cylinder Size *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProduct(p.id)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3.5 ${
                      selectedProduct === p.id
                        ? 'border-[#176B9B] bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      LPG
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
                2. Quantity (Cylinders) *
              </label>
              <div className="flex items-center gap-3 max-w-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 font-bold text-lg text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input-field text-center font-bold text-lg"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 font-bold text-lg text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard domestic consumer limit is maximum 2 refills per booking.
              </span>
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                3. Delivery Address *
              </label>

              {profile?.addresses && profile.addresses.length > 0 ? (
                <div className="space-y-2 mb-3">
                  {profile.addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedAddress === addr.id
                          ? 'border-[#176B9B] bg-blue-50/40'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-[#102A43] mr-2">[{addr.label}]</span>
                        <span className="text-slate-600">
                          {addr.addressLine1}, {addr.city} {addr.pincode}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mb-3">
                  <textarea
                    required
                    rows={3}
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter your complete home address, street, landmark, and pincode..."
                    className="input-field resize-none text-xs"
                  />
                </div>
              )}
            </div>

            {/* Delivery Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                4. Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Call before arrival, 2nd floor, morning delivery preferred"
                className="input-field text-xs"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Agispure Certified Pure Gas Supply</span>
              </div>
              <span className="font-semibold text-slate-700">Official Rate Receipt on Delivery</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
            >
              {loading ? <span>Placing Booking...</span> : (
                <>
                  <span>Confirm Cylinder Booking</span>
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

