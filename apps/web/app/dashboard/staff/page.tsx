'use client';

import React, { useState, useEffect } from 'react';
import { staffApi, Staff } from '@/lib/api';
import { Users, Truck, ShieldCheck, Phone, RefreshCw } from 'lucide-react';

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = () => {
    setLoading(true);
    staffApi
      .getAll()
      .then((data) => setStaffList(data))
      .catch(() => setStaffList([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Staff & drivers</h1>
          <p className="text-xs text-slate-500 mt-0.5">Authorised operations personnel, warehouse staff, and fleet delivery drivers</p>
        </div>

        <button aria-label="Refresh records" onClick={fetchStaff}
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#176B9B] self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">Loading staff roster...</div>
        ) : staffList.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-xs">No staff records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee Code</th>
                  <th>Full Name</th>
                  <th>Operational Role</th>
                  <th>Phone Contact</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((st) => (
                  <tr key={st.id}>
                    <td className="font-mono text-xs font-bold text-[#102A43]">{st.employeeCode}</td>
                    <td className="text-xs font-bold text-slate-800">{st.name}</td>
                    <td>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          st.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800'
                            : st.role === 'MANAGER'
                            ? 'bg-blue-100 text-blue-800'
                            : st.role === 'DRIVER'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {st.role}
                      </span>
                    </td>
                    <td className="text-xs text-slate-600">{st.phone}</td>
                    <td>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {st.isActive ? 'Active Duty' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

