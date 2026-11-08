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
    <section id="safety" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="site-container grid items-start gap-10 lg:grid-cols-[1.5fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow"><ShieldAlert className="h-4 w-4" />Everyday LPG care</p>
          <h2 className="section-heading mt-4">Good habits.<br />Safer homes and workplaces.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">LPG is a safe, efficient energy source when handled according to standard industry safety protocols.</p>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {safetyRules.map(({ icon: Icon, title, desc }, index) => <article key={title} className="flex items-start gap-4 py-6 sm:gap-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F6F2] text-corporate"><Icon className="h-5 w-5" strokeWidth={1.75} /></span><div className="min-w-0"><p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Safety practice 0{index + 1}</p><h3 className="text-base font-semibold sm:text-lg">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{desc}</p></div></article>)}
          </div>
        </div>
        <aside className="rounded-2xl border border-rose-200 bg-rose-50 p-6 sm:p-8 lg:sticky lg:top-28">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-red-700"><AlertTriangle className="h-6 w-6" /></span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-red-700">Suspect a gas leak?</p>
          <h2 className="mt-3 text-2xl font-semibold text-primary">Your safety comes first.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">Evacuate the area, avoid electrical sparks or appliances, and call our agency support immediately.</p>
          <a href="tel:+919789494899" className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-800"><PhoneCall className="h-4 w-4" />Call SIJAYA Agency</a>
          <p className="mt-3 text-center text-xs font-medium text-red-800">+91 97894 94899</p>
        </aside>
      </div>
    </section>
  );
}
