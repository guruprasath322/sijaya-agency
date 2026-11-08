'use client';

import React from 'react';
import { ShieldCheck, Truck, Clock, RefreshCcw, FileSpreadsheet, Headphones } from 'lucide-react';

export function WhyChooseSection() {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Stringent Safety Standards',
      desc: 'Every cylinder undergoes pressure inspection and tare weight check prior to customer handoff.',
    },
    {
      icon: RefreshCcw,
      title: 'Reliable Supply Coordination',
      desc: 'Direct coordination with Aegis Pure gas helps maintain dependable warehouse reserves.',
    },
    {
      icon: Clock,
      title: 'Scheduled Business Delivery',
      desc: 'Set pre-arranged delivery windows that align with your restaurant cooking schedule or industrial shifts.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Transparent Digital Accounting',
      desc: 'Instant digital order receipts, downloadable GST-ready invoices, and complete transaction histories.',
    },
    {
      icon: Truck,
      title: 'Dedicated Local Delivery Fleet',
      desc: 'Trained delivery personnel equipped with safety equipment and digital verification apps.',
    },
    {
      icon: Headphones,
      title: 'Attentive Customer Support',
      desc: 'Direct hotline, WhatsApp, and agency office accessibility for swift issue resolution.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative border-t border-slate-200/80">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            The SIJAYA Agency Standard
          </div>
          <h2 className="section-heading text-[#102A43] tracking-tight">
            Why Homes and Enterprises Choose SIJAYA Agency
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Professional operations, certified cylinder safety, and transparent digital account management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#176B9B] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#102A43] mb-2.5">{pt.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
