'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, PhoneCall, Wind, EyeOff } from 'lucide-react';

export function SafetySection() {
  const safetyRules = [
    {
      icon: Wind,
      title: 'Adequate Ventilation',
      desc: 'Always store and operate LPG cylinders in an upright, well-ventilated location at ground level. Never in basements or confined unventilated spaces.',
    },
    {
      icon: EyeOff,
      title: 'Leak Awareness (Soap Solution Only)',
      desc: 'Detect leaks by applying a mild soap solution to connections. Never use a lit match or open flame. If bubbling occurs, a leak is present.',
    },
    {
      icon: ShieldAlert,
      title: 'Emergency Valve Closure',
      desc: 'If gas odor is detected: extinguish all open flames immediately, turn the cylinder regulator off, open all doors and windows, and do not touch electrical switches.',
    },
    {
      icon: PhoneCall,
      title: 'Authorised Agency Assistance',
      desc: 'Never attempt DIY repairs on cylinder valves or regulators. Immediately contact SIJAYA Agency emergency response or your authorized safety technician.',
    },
  ];

  return (
    <section id="safety" className="py-14 sm:py-16 md:py-28 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/70 text-red-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            Safety First Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Certified LPG Safety & Emergency Awareness
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            LPG is a safe, efficient energy source when handled according to standard industry safety protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {safetyRules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-5 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#102A43] mb-2">{rule.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Notice Card */}
        <div className="rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Smell Gas or Suspect an Active Leak?</h4>
              <p className="text-sm text-red-100">
                Evacuate the area, avoid electrical sparks or appliances, and call our emergency support immediately.
              </p>
            </div>
          </div>
          <a
            href="tel:[PHONE-PLACEHOLDER]"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-700 font-bold text-sm shadow hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Agency Helpline</span>
          </a>
        </div>
      </div>
    </section>
  );
}

