'use client';

import React from 'react';
import { Building, Utensils, BedDouble, Bird, GraduationCap, Cake, Factory, CalendarCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export function BusinessSolutionsSection() {
  const industries = [
    { icon: Utensils, name: 'Hotels & Restaurants', desc: 'Continuous high-pressure cooking supply to prevent kitchen downtime during peak hours.' },
    { icon: Cake, name: 'Bakeries & Confectioneries', desc: 'Stable flame temperatures essential for precision baking and bulk oven operations.' },
    { icon: BedDouble, name: 'Hostels & Mess Halls', desc: 'Scheduled weekly batches serving student dining facilities and mass residential feeding.' },
    { icon: Bird, name: 'Poultry Farms', desc: 'Temperature-controlled brooding setups with reliable cylinder heating backups.' },
    { icon: GraduationCap, name: 'Educational Institutions', desc: 'Laboratory, canteen and pantry supply with rigorous safety certifications.' },
    { icon: Factory, name: 'Mills & Small Industries', desc: 'Bulk cylinder manifolds and scheduled refills for process heating requirements.' },
  ];

  return (
    <section id="business" className="py-20 md:py-28 bg-[#102A43] text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#176B9B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/10">
            Enterprise Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered for Commercial Continuity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Never halt your ovens, stoves or brooders. SIJAYA designs customized recurring gas supply arrangements for institutions and commercial enterprises.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{ind.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Feature Banner: Recurring Supply Arrangement */}
        <div className="rounded-2xl bg-gradient-to-r from-[#176B9B] to-[#1E3A52] p-8 md:p-10 border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <CalendarCheck className="w-4 h-4" />
              Automated Supply Subscriptions
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Scheduled Weekly & Monthly Commercial Deliveries
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Set your target cylinder delivery frequency. Our management team confirms stock, schedules dedicated vehicles, and provides monthly credit statements without requiring repetitive manual bookings.
            </p>
          </div>

          <div className="flex-shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-base shadow-lg transition-all"
            >
              <span>Request a Business Quotation</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
