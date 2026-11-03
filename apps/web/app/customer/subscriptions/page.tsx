'use client';

import React, { useState } from 'react';
import { CalendarCheck, AlertCircle, PlusCircle, CheckCircle2, PauseCircle, PlayCircle, Clock } from 'lucide-react';

interface SubscriptionItem {
  id: string;
  category: string;
  cylinders: number;
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  status: 'ACTIVE' | 'PAUSED';
  nextExpectedDate: string;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([
    {
      id: 'sub-1',
      category: '19 kg Commercial Kitchen Cylinders',
      cylinders: 4,
      frequency: 'WEEKLY',
      status: 'ACTIVE',
      nextExpectedDate: '2026-11-10',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('19 kg Commercial LPG');
  const [newQty, setNewQty] = useState(2);
  const [newFreq, setNewFreq] = useState<'WEEKLY' | 'BIWEEKLY' | 'MONTHLY'>('WEEKLY');

  const toggleStatus = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: sub.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : sub
      )
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: SubscriptionItem = {
      id: `sub-${Date.now()}`,
      category: newCategory,
      cylinders: newQty,
      frequency: newFreq,
      status: 'ACTIVE',
      nextExpectedDate: '2026-11-15',
    };
    setSubscriptions([...subscriptions, newSub]);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Recurring Supply Subscriptions</h1>
          <p className="text-xs text-slate-500 mt-0.5">Automate your scheduled recurring supply requirements for kitchen continuity</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white text-xs font-bold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Set Up New Subscription</span>
        </button>
      </div>

      {/* Critical Business Notice Banner */}
      <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5 flex items-start gap-3.5 text-blue-900">
        <AlertCircle className="w-5 h-5 text-[#176B9B] flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Important Operational Rule: </span>
          A subscription creates a planned periodic supply request. Our warehouse team reviews inventory availability and confirms each supply with you prior to creating the final dispatch order.
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Recurring Schedule
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    sub.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {sub.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#102A43] mb-1">{sub.category}</h3>
              <p className="text-xs text-slate-600 mb-4">
                Frequency: <span className="font-bold text-[#176B9B]">{sub.frequency}</span> • Target: <span className="font-bold">{sub.cylinders} cylinders</span>
              </p>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Next expected booking trigger: <span className="font-bold">{sub.nextExpectedDate}</span></span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
              <button
                onClick={() => toggleStatus(sub.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#176B9B]"
              >
                {sub.status === 'ACTIVE' ? (
                  <>
                    <PauseCircle className="w-4 h-4 text-amber-500" />
                    <span>Pause Subscription</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4 text-emerald-600" />
                    <span>Resume Subscription</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSubscriptions(subscriptions.filter((s) => s.id !== sub.id))}
                className="text-xs text-red-500 hover:underline"
              >
                Cancel Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for setting up subscription */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-[#102A43] mb-2">Set Up Recurring Supply</h3>
            <p className="text-xs text-slate-500 mb-6">
              Create a scheduled cylinder requirement plan for your establishment.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Cylinder Grade</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="19 kg Commercial LPG">19 kg Commercial LPG</option>
                  <option value="14.2 kg Domestic LPG">14.2 kg Domestic LPG</option>
                  <option value="5 kg Compact LPG">5 kg Compact LPG</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Target Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={newQty}
                  onChange={(e) => setNewQty(parseInt(e.target.value) || 1)}
                  className="input-field text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Delivery Frequency</label>
                <select
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value as 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY')}
                  className="input-field text-xs"
                >
                  <option value="WEEKLY">Weekly (Every 7 days)</option>
                  <option value="BIWEEKLY">Bi-Weekly (Every 14 days)</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
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
                  Save Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
