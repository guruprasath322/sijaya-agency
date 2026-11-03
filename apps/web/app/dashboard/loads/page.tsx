'use client';

import React, { useState, useEffect } from 'react';
import { loadsApi, GasLoad, productsApi, Product } from '@/lib/api';
import { formatDate, getStatusBadgeClass } from '@/lib/utils';
import { Truck, PlusCircle, CheckCircle2, XCircle, AlertTriangle, RefreshCw, FileText, ShieldCheck } from 'lucide-react';

export default function IncomingLoadsPage() {
  const [loads, setLoads] = useState<GasLoad[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // New Load Modal
  const [newLoadOpen, setNewLoadOpen] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [expectedQty, setExpectedQty] = useState(100);

  // Arrival / Inspection Modal
  const [arrivedLoad, setArrivedLoad] = useState<GasLoad | null>(null);
  const [receivedQty, setReceivedQty] = useState(0);
  const [damagedQty, setDamagedQty] = useState(0);
  const [missingQty, setMissingQty] = useState(0);
  const [inspectionNotes, setInspectionNotes] = useState('');

  const fetchLoads = () => {
    setLoading(true);
    loadsApi
      .getAll({ limit: '50' })
      .then((res) => setLoads(res.data))
      .catch(() => setLoads([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLoads();
    productsApi.getAll().then((data) => {
      setProducts(data);
      if (data.length > 0) setSelectedProduct(data[0].id);
    });
  }, []);

  const handleCreateLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadsApi.create({
      supplierId: '00000000-0000-0000-0000-000000000001', // Agispure Gas
      vehicleNumber,
      invoiceReference: invoiceRef,
      items: [{ productId: selectedProduct, expectedQty: Number(expectedQty) }],
    });
    setNewLoadOpen(false);
    fetchLoads();
  };

  const handleRecordArrival = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!arrivedLoad || !arrivedLoad.items?.[0]) return;
    const itemId = arrivedLoad.items[0].id;

    await loadsApi.recordArrival(arrivedLoad.id, {
      items: [
        {
          id: itemId,
          receivedQty: Number(receivedQty),
          damagedQty: Number(damagedQty),
          missingQty: Number(missingQty),
          notes: inspectionNotes,
        },
      ],
    });
    setArrivedLoad(null);
    fetchLoads();
  };

  const handleApprove = async (id: string) => {
    if (!confirm('Approve this incoming load? This will officially update the warehouse inventory ledger with received quantities.')) return;
    await loadsApi.approve(id);
    fetchLoads();
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Please enter the reason for load rejection:');
    if (!reason) return;
    await loadsApi.reject(id, reason);
    fetchLoads();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Supplier Gas Loads (Agispure Gas)</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage intake manifests, arrival tally inspection, and manager ledger approvals</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLoads}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setNewLoadOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Dispatched Load</span>
          </button>
        </div>
      </div>

      {/* Critical Business Rule Warning Banner */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex items-start gap-3.5 text-amber-900">
        <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Inventory Safety Lock: </span>
          Incoming loads do not alter available warehouse inventory until an authorized Manager inspects the arrival discrepancies and clicks &ldquo;Approve Load&rdquo;. Damaged quantities are quarantined.
        </div>
      </div>

      {/* Loads Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading load manifests...</div>
        ) : loads.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            No gas load records found. Record a new Agispure Gas dispatch using the button above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Load Reference</th>
                  <th>Supplier</th>
                  <th>Vehicle No.</th>
                  <th>Expected Qty</th>
                  <th>Received / Damaged</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loads.map((load) => {
                  const item = load.items?.[0];
                  return (
                    <tr key={load.id}>
                      <td className="font-mono text-xs font-bold text-[#102A43]">{load.loadCode}</td>
                      <td className="text-xs font-semibold text-slate-800">{load.supplier?.name || 'Agispure Gas'}</td>
                      <td className="font-mono text-xs text-slate-600">{load.vehicleNumber || 'Unassigned'}</td>
                      <td className="text-xs font-bold text-slate-800">
                        {item ? `${item.expectedQty} (${item.product?.name})` : '-'}
                      </td>
                      <td className="text-xs">
                        {load.status === 'DRAFT' || load.status === 'DISPATCHED' ? (
                          <span className="text-slate-400 italic">In transit</span>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="font-bold text-emerald-700">{item?.receivedQty || 0} received</span>
                            {Number(item?.damagedQty) > 0 && (
                              <span className="text-red-600 block text-[10px] font-bold">({item?.damagedQty} damaged)</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={getStatusBadgeClass(load.status)}>
                          {load.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {(load.status === 'DRAFT' || load.status === 'DISPATCHED') && (
                            <button
                              onClick={() => {
                                setArrivedLoad(load);
                                setReceivedQty(Number(item?.expectedQty) || 100);
                                setDamagedQty(0);
                                setMissingQty(0);
                              }}
                              className="px-2.5 py-1 rounded bg-blue-50 text-[#176B9B] hover:bg-blue-100 text-xs font-bold"
                            >
                              Record Arrival
                            </button>
                          )}

                          {load.status === 'ARRIVED' && (
                            <>
                              <button
                                onClick={() => handleApprove(load.id)}
                                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                              >
                                Approve to Stock
                              </button>
                              <button
                                onClick={() => handleReject(load.id)}
                                className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {load.status === 'APPROVED' && (
                            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>In Stock</span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Load Modal */}
      {newLoadOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">Record Agispure Gas Dispatch</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter incoming truck invoice manifest details prior to warehouse arrival.
            </p>

            <form onSubmit={handleCreateLoad} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Supplier</label>
                <input
                  type="text"
                  disabled
                  value="Agispure Gas (Authorised Supplier)"
                  className="input-field bg-slate-100 text-xs cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Product Manifest</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="input-field text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Expected Cylinder / Volume Qty</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={expectedQty}
                  onChange={(e) => setExpectedQty(parseInt(e.target.value) || 1)}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Transport Vehicle Reg No.</label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. TN-57-AB-9876"
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Supplier Dispatch Invoice Ref</label>
                <input
                  type="text"
                  value={invoiceRef}
                  onChange={(e) => setInvoiceRef(e.target.value)}
                  placeholder="e.g. AGIS-DISP-4890"
                  className="input-field text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewLoadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Save Dispatch Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Arrival & Tally Inspection Modal */}
      {arrivedLoad && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">
              Record Arrival Inspection: {arrivedLoad.loadCode}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter physical tally counts. Damaged and missing items will be quarantined.
            </p>

            <form onSubmit={handleRecordArrival} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-emerald-800 mb-1">Received *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={receivedQty}
                    onChange={(e) => setReceivedQty(parseInt(e.target.value) || 0)}
                    className="input-field text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-red-800 mb-1">Damaged</label>
                  <input
                    type="number"
                    min={0}
                    value={damagedQty}
                    onChange={(e) => setDamagedQty(parseInt(e.target.value) || 0)}
                    className="input-field text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-amber-800 mb-1">Missing</label>
                  <input
                    type="number"
                    min={0}
                    value={missingQty}
                    onChange={(e) => setMissingQty(parseInt(e.target.value) || 0)}
                    className="input-field text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Inspection Notes</label>
                <input
                  type="text"
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  placeholder="e.g. 2 cylinders arrived with damaged valve caps"
                  className="input-field text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setArrivedLoad(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#176B9B] text-white text-xs font-bold hover:bg-[#102A43]"
                >
                  Confirm Arrival Tally
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
