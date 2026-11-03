'use client';

import React, { useState, useEffect } from 'react';
import { inventoryApi, InventoryRecord, StockMovement, productsApi, Product } from '@/lib/api';
import { formatDate, formatDateTime } from '@/lib/utils';
import { Boxes, Sliders, ArrowUpRight, ArrowDownLeft, AlertTriangle, ShieldCheck, RefreshCw, PlusCircle } from 'lucide-react';

export default function InventoryLedgerPage() {
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Manual Adjustment Modal
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [adjustType, setAdjustType] = useState<'IN' | 'OUT'>('IN');
  const [adjustQty, setAdjustQty] = useState(1);
  const [adjustNotes, setAdjustNotes] = useState('');
  const [adjustError, setAdjustError] = useState<string | null>(null);

  const fetchInventory = () => {
    setLoading(true);
    Promise.all([
      inventoryApi.getAll().catch(() => []),
      inventoryApi.getMovements({ limit: '50' }).catch(() => []),
      productsApi.getAll().catch(() => []),
    ])
      .then(([inv, mov, prods]) => {
        setInventory(inv);
        setMovements(mov);
        setProducts(prods);
        if (prods.length > 0) setSelectedProduct(prods[0].id);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdjustError(null);
    try {
      await inventoryApi.adjust({
        productId: selectedProduct,
        quantity: Number(adjustQty),
        adjustmentType: adjustType,
        notes: adjustNotes,
      });
      setAdjustModalOpen(false);
      fetchInventory();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAdjustError(err.message || 'Adjustment failed');
      } else {
        setAdjustError('Adjustment failed');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Warehouse Inventory & Stock Ledger</h1>
          <p className="text-xs text-slate-500 mt-0.5">Accurate cylinder balance accounting and immutable movement transaction history</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInventory}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAdjustModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all shadow-sm"
          >
            <Sliders className="w-4 h-4" />
            <span>Manual Stock Adjustment</span>
          </button>
        </div>
      </div>

      {/* Product Stock Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {inventory.map((inv) => (
          <div key={inv.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {inv.product.unit.replace('CYLINDER_', '')}
                </span>
                <span className="text-xs text-slate-400">Warehouse 1</span>
              </div>
              <h3 className="text-base font-bold text-[#102A43] mb-1">{inv.product.name}</h3>
              {inv.product.nameTamil && (
                <div className="text-xs text-[#176B9B] font-tamil mb-4">{inv.product.nameTamil}</div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500 font-medium">Available Reserves:</span>
                <span className="text-2xl font-black text-[#176B9B]">{Number(inv.availableQty)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Reserved / Scheduled:</span>
                <span className="font-semibold text-slate-700">{Number(inv.reservedQty)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Quarantined Damaged:</span>
                <span className="font-bold text-red-600">{Number(inv.damagedQty)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stock Movement Immutable Ledger */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#102A43]">Stock Movement Ledger</h2>
            <p className="text-xs text-slate-500">Every change requires an authorized transaction reference</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Product</th>
                <th>Movement Type</th>
                <th>Quantity</th>
                <th>Balance After</th>
                <th>Reference</th>
                <th>Reason / Notes</th>
              </tr>
            </thead>
            <tbody>
              {movements.length > 0 ? (
                movements.map((mov) => (
                  <tr key={mov.id}>
                    <td className="text-xs text-slate-500">{formatDateTime(mov.createdAt)}</td>
                    <td className="text-xs font-bold text-[#102A43]">{mov.product?.name || 'LPG Item'}</td>
                    <td>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          mov.movementType.includes('IN')
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {mov.movementType}
                      </span>
                    </td>
                    <td className="text-xs font-mono font-bold text-slate-800">
                      {mov.movementType.includes('OUT') ? `-${mov.quantity}` : `+${mov.quantity}`}
                    </td>
                    <td className="text-xs font-mono font-bold text-[#176B9B]">{mov.balanceAfter}</td>
                    <td className="text-xs font-mono text-slate-500">{mov.referenceType || 'SYSTEM'}</td>
                    <td className="text-xs text-slate-600">{mov.notes || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-xs text-slate-400">
                    No movements recorded yet. Approve loads or record stock adjustments to view ledger audit entries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Stock Adjustment Modal */}
      {adjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">Manual Stock Adjustment</h3>
            <p className="text-xs text-slate-500 mb-4">
              Authorized manager adjustments require mandatory reason and audit recording.
            </p>

            {adjustError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {adjustError}
              </div>
            )}

            <form onSubmit={handleAdjust} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Select Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="input-field text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Adjustment Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAdjustType('IN')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      adjustType === 'IN'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    + Stock IN (Physical Found)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustType('OUT')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      adjustType === 'OUT'
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    - Stock OUT (Shrinkage/Damage)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Quantity</label>
                <input
                  type="number"
                  min={1}
                  required
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(parseInt(e.target.value) || 1)}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mandatory Reason / Audit Notes</label>
                <input
                  type="text"
                  required
                  value={adjustNotes}
                  onChange={(e) => setAdjustNotes(e.target.value)}
                  placeholder="e.g. Physical inventory count reconciliation"
                  className="input-field text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAdjustModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Confirm Ledger Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

