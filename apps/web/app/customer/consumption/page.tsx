'use client';

import React from 'react';
import { BarChart3, Info, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function CustomerConsumptionPage() {
  const deliveryData = [
    { month: 'Jun', commercial19kg: 12, domestic14kg: 1 },
    { month: 'Jul', commercial19kg: 16, domestic14kg: 2 },
    { month: 'Aug', commercial19kg: 14, domestic14kg: 1 },
    { month: 'Sep', commercial19kg: 18, domestic14kg: 2 },
    { month: 'Oct', commercial19kg: 20, domestic14kg: 1 },
    { month: 'Nov', commercial19kg: 8, domestic14kg: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Delivered Gas History & Usage Trends</h1>
        <p className="text-xs text-slate-500 mt-0.5">Historical tracking of LPG cylinders delivered to your account</p>
      </div>

      {/* Critical Business Clarification Alert */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 flex items-start gap-3.5 text-amber-900">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">Measurement Accuracy Note: </span>
          The data displayed represents verified cylinder deliveries recorded by SIJAYA Agency distribution logistics. Per regulatory standards, delivered volume is not labeled as burning consumption without automated telemetry metering.
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">6-Month Total Delivered</div>
          <div className="text-3xl font-black text-[#102A43] mt-1">88 <span className="text-sm font-semibold text-slate-400">Cylinders</span></div>
          <div className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Consistent commercial supply</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Monthly Batch</div>
          <div className="text-3xl font-black text-[#176B9B] mt-1">14.6 <span className="text-sm font-semibold text-slate-400">Cylinders/mo</span></div>
          <div className="text-xs text-slate-500 font-medium mt-2">19 kg Commercial Dominant</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Projected Reorder</div>
          <div className="text-3xl font-black text-amber-600 mt-1">~7 Days</div>
          <div className="text-xs text-slate-500 font-medium mt-2">Based on weekly refill interval</div>
        </div>
      </div>

      {/* Recharts Visual Graph */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-bold text-[#102A43] mb-1">Delivered Cylinders by Month</h3>
        <p className="text-xs text-slate-500 mb-6">Comparative breakdown between commercial (19 kg) and domestic sizes</p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deliveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#102A43', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="commercial19kg" name="19 kg Commercial" fill="#176B9B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="domestic14kg" name="14.2 kg Domestic" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

