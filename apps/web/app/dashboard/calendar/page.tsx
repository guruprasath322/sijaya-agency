'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';

export default function DeliveryCalendarPage() {
  const [currentDate] = useState(new Date());

  const days = [
    { date: '01', day: 'Sun', count: 4, items: ['2x 19kg - Hotel Annapoorna', '1x 14.2kg - Palani Nagar'] },
    { date: '02', day: 'Mon', count: 9, items: ['6x 19kg - EBET College Canteen', '3x 14.2kg - Residential'] },
    { date: '03', day: 'Tue', count: 12, active: true, items: ['8x 19kg - Kuppanna Poultry', '4x 14.2kg - Town deliveries'] },
    { date: '04', day: 'Wed', count: 7, items: ['4x 19kg - Bhavani Amman Mess', '3x 14.2kg - North ward'] },
    { date: '05', day: 'Thu', count: 10, items: ['6x 19kg - Winsome Hostel Padiyur', '4x 19kg - Bakery batch'] },
    { date: '06', day: 'Fri', count: 8, items: ['5x 19kg - Commercial mills', '3x 14.2kg - Doorstep'] },
    { date: '07', day: 'Sat', count: 14, items: ['10x 19kg - Weekend restaurant prep', '4x 14.2kg - Weekend slots'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43] tracking-tight">Delivery Scheduling Calendar</h1>
          <p className="text-xs text-slate-500 mt-0.5">Visual dispatch timeline for domestic and recurring commercial deliveries</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#102A43] px-3 py-1.5 rounded-lg bg-white border border-slate-200">
            November 2026
          </span>
          <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
        {days.map((d, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border transition-all flex flex-col justify-between min-h-[160px] ${
              d.active
                ? 'bg-blue-50/70 border-[#176B9B] shadow-md ring-2 ring-[#176B9B]/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">{d.day}</span>
                <span className={`text-base font-black ${d.active ? 'text-[#176B9B]' : 'text-[#102A43]'}`}>
                  {d.date}
                </span>
              </div>

              <div className="text-[11px] font-bold text-[#176B9B] mb-2 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>{d.count} Dispatches</span>
              </div>

              <div className="space-y-1.5">
                {d.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-lg bg-white border border-slate-100 text-[10px] text-slate-700 leading-tight truncate shadow-2xs"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <span className="text-[9px] text-slate-400 mt-2 block">Driver fleet scheduled</span>
          </div>
        ))}
      </div>
    </div>
  );
}

