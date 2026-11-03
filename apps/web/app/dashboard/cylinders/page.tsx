'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Search, Filter, Plus, Wrench, RefreshCw } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface CylinderAsset {
  id: string;
  serialNumber: string;
  category: string;
  location: string;
  status: 'AVAILABLE' | 'DEPLOYED' | 'EMPTY_RETURNED' | 'IN_MAINTENANCE' | 'DAMAGED';
  assignedCustomer?: string;
  lastInspectedAt: string;
  tareWeight: string;
}

export default function CylindersManagementPage() {
  const [cylinders, setCylinders] = useState<CylinderAsset[]>([
    {
      id: 'cyl-1',
      serialNumber: 'AGIS-19K-00481',
      category: '19 kg Commercial',
      location: 'Central Depot Rack A',
      status: 'AVAILABLE',
      lastInspectedAt: '2026-10-28',
      tareWeight: '19.4 kg',
    },
    {
      id: 'cyl-2',
      serialNumber: 'AGIS-19K-00482',
      category: '19 kg Commercial',
      location: 'Bhavani Amman Mess Kitchen',
      status: 'DEPLOYED',
      assignedCustomer: 'Bhavani Amman Mess',
      lastInspectedAt: '2026-10-25',
      tareWeight: '19.5 kg',
    },
    {
      id: 'cyl-3',
      serialNumber: 'AGIS-14K-00912',
      category: '14.2 kg Domestic',
      location: 'Depot Intake Quarantine',
      status: 'EMPTY_RETURNED',
      lastInspectedAt: '2026-11-01',
      tareWeight: '15.2 kg',
    },
    {
      id: 'cyl-4',
      serialNumber: 'AGIS-19K-00311',
      category: '19 kg Commercial',
      location: 'Maintenance Workshop',
      status: 'IN_MAINTENANCE',
      lastInspectedAt: '2026-10-15',
      tareWeight: '19.3 kg',
    },
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = cylinders.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (search && !c.serialNumber.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Physical Cylinder Asset Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track serial numbers, tare weights, client deployments, and valve safety inspections</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Available in Warehouse</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {cylinders.filter((c) => c.status === 'AVAILABLE').length}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Deployed at Client Sites</div>
          <div className="text-2xl font-black text-[#176B9B] mt-1">
            {cylinders.filter((c) => c.status === 'DEPLOYED').length}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase">Empty Returned / In Transit</div>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {cylinders.filter((c) => c.status === 'EMPTY_RETURNED').length}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase">In Maintenance / Inspection</div>
          <div className="text-2xl font-black text-purple-600 mt-1">
            {cylinders.filter((c) => c.status === 'IN_MAINTENANCE').length}
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cylinder serial number..."
            className="input-field pl-10 text-xs py-2"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          {['ALL', 'AVAILABLE', 'DEPLOYED', 'EMPTY_RETURNED', 'IN_MAINTENANCE'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                statusFilter === st
                  ? 'bg-[#102A43] text-white border-[#102A43]'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Cylinders Table */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Category</th>
                <th>Tare Weight</th>
                <th>Current Location</th>
                <th>Assigned Client</th>
                <th>Last Inspected</th>
                <th>Asset Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="font-mono text-xs font-bold text-[#102A43]">{c.serialNumber}</td>
                  <td className="text-xs font-semibold text-slate-700">{c.category}</td>
                  <td className="text-xs font-mono text-slate-600">{c.tareWeight}</td>
                  <td className="text-xs text-slate-700">{c.location}</td>
                  <td className="text-xs text-slate-800 font-medium">{c.assignedCustomer || 'Warehouse Asset'}</td>
                  <td className="text-xs text-slate-500">{formatDate(c.lastInspectedAt)}</td>
                  <td>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        c.status === 'AVAILABLE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'DEPLOYED'
                          ? 'bg-blue-100 text-blue-800'
                          : c.status === 'IN_MAINTENANCE'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.status.replace(/_/g, ' ')}
                    </span>
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

