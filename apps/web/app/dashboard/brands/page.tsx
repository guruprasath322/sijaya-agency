'use client';

import React, { useState, useEffect } from 'react';
import { brandsApi, Brand } from '@/lib/api';
import { Sparkles, PlusCircle, Check, X, Eye, EyeOff, Trash2, Edit2, RefreshCw, ShieldCheck } from 'lucide-react';

export default function BrandManagementPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Add / Edit Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nameEnglish, setNameEnglish] = useState('');
  const [nameTamil, setNameTamil] = useState('');
  const [category, setCategory] = useState('Commercial Enterprise');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isApproved, setIsApproved] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const fetchBrands = () => {
    setLoading(true);
    brandsApi
      .getAll()
      .then((data) => setBrands(data))
      .catch(() => setBrands([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await brandsApi.update(editingId, {
        nameEnglish,
        nameTamil: nameTamil || undefined,
        category,
        displayOrder: Number(displayOrder),
        isApproved,
        isVisible,
      });
    } else {
      await brandsApi.create({
        nameEnglish,
        nameTamil: nameTamil || undefined,
        category,
        displayOrder: Number(displayOrder),
        isApproved,
        isVisible,
      });
    }
    setModalOpen(false);
    resetForm();
    fetchBrands();
  };

  const handleToggleApprove = async (brand: Brand) => {
    await brandsApi.update(brand.id, { isApproved: !brand.isApproved });
    fetchBrands();
  };

  const handleToggleVisible = async (brand: Brand) => {
    await brandsApi.update(brand.id, { isVisible: !brand.isVisible });
    fetchBrands();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this organisation from the database?')) return;
    await brandsApi.delete(id);
    fetchBrands();
  };

  const resetForm = () => {
    setEditingId(null);
    setNameEnglish('');
    setNameTamil('');
    setCategory('Commercial Enterprise');
    setDisplayOrder(brands.length + 1);
    setIsApproved(false);
    setIsVisible(true);
  };

  const openEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setNameEnglish(brand.nameEnglish);
    setNameTamil(brand.nameTamil || '');
    setCategory(brand.category || 'Commercial Enterprise');
    setDisplayOrder(brand.displayOrder);
    setIsApproved(brand.isApproved);
    setIsVisible(brand.isVisible);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Homepage Brand Showcase Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control the public &ldquo;Businesses That Trust SIJAYA&rdquo; continuous carousel</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchBrands}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B]"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              resetForm();
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Organisation</span>
          </button>
        </div>
      </div>

      {/* Verification Notice */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex items-start gap-3.5 text-amber-900">
        <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Public Approval Filter: </span>
          Only organizations with <strong className="text-emerald-700">Approved = YES</strong> and <strong className="text-blue-700">Visible = YES</strong> are displayed publicly on the landing page carousel. Never publish unverified relationships.
        </div>
      </div>

      {/* Brands Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading brands...</div>
        ) : brands.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">No brands in database.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>English Name</th>
                  <th>Tamil Name</th>
                  <th>Category</th>
                  <th>Public Approval</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id}>
                    <td className="font-mono text-xs font-bold text-slate-500">#{brand.displayOrder}</td>
                    <td className="text-xs font-bold text-[#102A43]">{brand.nameEnglish}</td>
                    <td className="text-xs text-[#176B9B] font-tamil font-medium">{brand.nameTamil || '-'}</td>
                    <td className="text-xs text-slate-600">{brand.category || 'Commercial'}</td>
                    <td>
                      <button
                        onClick={() => handleToggleApprove(brand)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                          brand.isApproved
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {brand.isApproved ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        <span>{brand.isApproved ? 'Approved' : 'Pending Approval'}</span>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleVisible(brand)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          brand.isVisible
                            ? 'bg-blue-100 text-[#176B9B]'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {brand.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{brand.isVisible ? 'Visible' : 'Hidden'}</span>
                      </button>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(brand)}
                          className="p-1 rounded text-slate-500 hover:text-[#176B9B]"
                          title="Edit Brand"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="p-1 rounded text-slate-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#102A43] mb-1">
              {editingId ? 'Edit Organisation Record' : 'Add Organisation to Showcase'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter official details in English and Tamil for the public carousel.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">English Business Name *</label>
                <input
                  type="text"
                  required
                  value={nameEnglish}
                  onChange={(e) => setNameEnglish(e.target.value)}
                  placeholder="e.g. EBET College"
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tamil Business Name (Optional)</label>
                <input
                  type="text"
                  value={nameTamil}
                  onChange={(e) => setNameTamil(e.target.value)}
                  placeholder="e.g. பழனியாண்டவர் மில்"
                  className="input-field text-xs font-tamil"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Education, Restaurant"
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    className="input-field text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isApproved}
                    onChange={(e) => setIsApproved(e.target.checked)}
                    className="rounded"
                  />
                  <span>Manager Approved (Public)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="rounded"
                  />
                  <span>Show in Carousel</span>
                </label>
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
