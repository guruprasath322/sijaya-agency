'use client';

import React from 'react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
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
    <section id="business" className="py-16 sm:py-20 lg:py-24 bg-[#102A43] text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#176B9B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/10">
            Enterprise Solutions
          </div>
          <h2 className="section-heading tracking-tight text-white">
            Your business runs on reliability.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Busy kitchens. Growing institutions. Essential industries. We work with your team to plan a supply that keeps up.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <ScrollReveal delay={i * 0.06}
                key={i}
                className="p-6 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ind.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{ind.desc}</p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Feature Banner: Recurring Supply Arrangement */}
        <div className="rounded-2xl bg-[#1C3B52] p-6 sm:p-8 md:p-10 border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-8">
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

          <div className="w-full shrink-0 lg:w-auto">
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg transition-all"
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
