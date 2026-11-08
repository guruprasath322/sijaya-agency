'use client';

import React from 'react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { FileEdit, CheckCircle, CalendarClock, Truck } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      icon: FileEdit,
      title: 'Submit Requirement',
      description: 'Send a supply request online, call us, or message us on WhatsApp.',
    },
    {
      number: '02',
      icon: CheckCircle,
      title: 'Stock Verification',
      description: 'SIJAYA Agency staff verifies warehouse inventory, confirms pricing, and approves your order.',
    },
    {
      number: '03',
      icon: CalendarClock,
      title: 'Dispatch Scheduling',
      description: 'A delivery slot, transport vehicle, and assigned authorized driver are allocated to your dispatch route.',
    },
    {
      number: '04',
      icon: Truck,
      title: 'Doorstep Delivery',
      description: 'Cylinders are delivered with leak check and weight seal verification. Digital receipt issued instantly.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F7F6F2] relative">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            Simple 4-Step Process
          </div>
          <h2 className="section-heading text-[#102A43] tracking-tight">
            From your request to your doorstep.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Four straightforward steps. One team taking care of the details.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal delay={idx * 0.08}
                key={idx}
                className="relative flex flex-col p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#176B9B]/50 transition-all group"
              >
                {/* Step Number Top Pill */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-[#176B9B] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center text-[#176B9B] group-hover:bg-[#176B9B] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#102A43] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
