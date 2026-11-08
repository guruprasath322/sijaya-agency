'use client';

import React from 'react';
import Link from 'next/link';
import { Home, UtensilsCrossed, Factory, ArrowRight, CheckCircle2 } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      id: 'domestic',
      icon: Home,
      title: 'Domestic LPG Supply',
      subtitle: 'Household Cylinder Refills',
      badge: '4 kg & 12 kg Refills',
      description:
        'Safe, reliable cooking gas for families. Quick digital requests, weight verification upon delivery, and seamless refill tracking directly on your mobile device.',
      features: [
        'Simple doorstep delivery request',
        'Transparent digital booking receipt',
        'Official safety cap & seal guarantee',
        'Emergency response guidance',
      ],
      ctaText: 'Book Domestic Cylinder',
      ctaHref: '/contact',
      accentColor: 'border-blue-500',
    },
    {
      id: 'commercial',
      icon: UtensilsCrossed,
      title: 'Commercial LPG Supply',
      subtitle: 'Hotels, Restaurants & Bakeries',
      badge: '17 kg / 21 kg / 33 kg',
      description:
        'Engineered for heavy-duty commercial kitchens, catering enterprises, and food establishments. High flame calorific value with scheduled recurring delivery.',
      features: [
        'Priority commercial dispatch pipeline',
        'Weekly / monthly recurring subscriptions',
        'Credit terms for verified business accounts',
        'Multi-cylinder batch deliveries',
      ],
      ctaText: 'Commercial Account Booking',
      ctaHref: '/contact',
      accentColor: 'border-amber-500',
      popular: true,
    },
    {
      id: 'bulk',
      icon: Factory,
      title: 'Bulk LPG Solutions',
      subtitle: 'Industrial & Institutional Installations',
      badge: 'Bulk Manifold Supply',
      description:
        'Dedicated bulk gas supply arrangements for mills, poultry farms, hospitals, college hostels, and manufacturing facilities requiring high-volume energy.',
      features: [
        'Custom volume pricing & formal quotations',
        'Scheduled tanker / manifold cylinder loads',
        'Safety audit & regulatory compliance support',
        'Dedicated agency account relationship manager',
      ],
      ctaText: 'Request Bulk Quotation',
      ctaHref: '/contact',
      accentColor: 'border-[#102A43]',
    },
  ];

  return (
    <section id="services" className="bg-[#F7F6F2] py-16 sm:py-20 lg:py-24">
      <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        <header className="self-start lg:sticky lg:top-28">
          <p className="eyebrow"><span className="h-px w-7 bg-accent" />Our services</p>
          <h2 className="section-heading mt-5">One trusted partner.<br />Every LPG need.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">From your family’s kitchen to a full-scale operation, we make reliable gas supply feel simple.</p>
          <Link href="/contact" className="mt-7 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-primary">Find your supply solution<ArrowRight className="h-4 w-4" /></Link>
          <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-6 text-xs leading-5 text-slate-500"><CheckCircle2 className="h-5 w-5 shrink-0 text-corporate" />Weight verification. Clear communication. Local support.</div>
        </header>
        <div className="space-y-4">
          {services.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <article key={srv.id} className={`group rounded-2xl border p-6 sm:p-8 ${srv.popular ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white'}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${srv.popular ? 'bg-white/10 text-amber-300' : 'bg-[#F3F5F7] text-corporate'}`}><Icon className="h-6 w-6" strokeWidth={1.5} /></span>
                  <span className={`text-xs font-medium ${srv.popular ? 'text-amber-300' : 'text-slate-500'}`}>{srv.badge}</span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4"><div><p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] ${srv.popular ? 'text-slate-400' : 'text-slate-500'}`}>{srv.subtitle}</p><h3 className={`text-2xl font-semibold ${srv.popular ? 'text-white' : 'text-primary'}`}>{srv.title}</h3></div><span className={`text-3xl font-light ${srv.popular ? 'text-white/20' : 'text-slate-200'}`}>0{index + 1}</span></div>
                <p className={`mt-4 text-sm leading-7 ${srv.popular ? 'text-slate-300' : 'text-slate-600'}`}>{srv.description}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">{srv.features.map(feat => <li key={feat} className={`flex items-start gap-2 text-xs leading-5 ${srv.popular ? 'text-slate-300' : 'text-slate-600'}`}><CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${srv.popular ? 'text-amber-300' : 'text-corporate'}`} />{feat}</li>)}</ul>
                <Link href={srv.ctaHref} className={`mt-6 flex min-h-12 items-center justify-between gap-3 border-t pt-5 text-sm font-semibold ${srv.popular ? 'border-white/15 text-amber-300' : 'border-slate-100 text-corporate'}`}>{srv.ctaText}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
