'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Clock, Layers, Users, Award } from 'lucide-react';

export function AboutSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Safety First Protocol',
      description: 'Strict cylinder safety inspections, weight verification and leak tests before every dispatch.',
    },
    {
      icon: Truck,
      title: 'Dedicated Distribution Fleet',
      description: 'Systematic dispatch scheduling ensuring prompt delivery for domestic and business clients.',
    },
    {
      icon: Layers,
      title: 'Commercial Supply Contracts',
      description: 'Reliable recurring supply arrangements tailored for hotels, restaurants, bakeries and mills.',
    },
    {
      icon: Users,
      title: 'Dedicated Customer Care',
      description: 'Direct phone or WhatsApp for seamless refills and account billing.',
    },
  ];

  return (
    <section id="about" className="py-14 sm:py-16 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#176B9B] text-xs font-semibold uppercase tracking-wider">
              About SIJAYA Agency
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight leading-tight">
              Powering Homes & Commercial Kitchens with Unwavering Reliability
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              SIJAYA Agency supplies safe, high-purity LPG reliably to households, commercial kitchens and industries, with supply from Aegis Pure gas.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              We understand that an uninterrupted gas supply is essential for every home and business. Our operations track stock levels, coordinate supply schedules and record transactions transparently.
            </p>

            <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image src="/aegis-puregas.png" alt="Aegis Puregas logo" width={64} height={80} className="h-16 w-16 object-contain" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">LPG supplied by</div>
                <div className="mt-0.5 text-base font-bold text-[#102A43]">Aegis Puregas</div>
                <div className="text-xs text-slate-500">SIJAYA Agency supply partner</div>
              </div>
            </div>

            {/* Metrics Mini-Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-xl font-black text-[#176B9B] sm:text-2xl">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Cylinder Inspection</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-sm font-black text-[#F59E0B] sm:text-xl">Aegis Puregas</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Supply Partner</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <div className="text-2xl font-black text-[#102A43]">24/7</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Service</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#176B9B]/50 hover:bg-white hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100/60 text-[#176B9B] flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#102A43] mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
