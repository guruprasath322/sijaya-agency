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
      badge: '14.2 kg & 5 kg Refills',
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
      badge: '19 kg Commercial Grade',
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
      ctaHref: '#contact',
      accentColor: 'border-[#102A43]',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            Our Core Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Comprehensive Gas Solutions for Every Requirement
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From single domestic cylinder refills to synchronized bulk commercial supplies, SIJAYA Agency provides dependability and transparent service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-white p-8 border ${
                  srv.popular
                    ? 'border-[#176B9B] shadow-xl ring-2 ring-[#176B9B]/20'
                    : 'border-slate-200/90 shadow-sm hover:shadow-lg'
                } transition-all duration-300`}
              >
                {srv.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#176B9B] text-white text-xs font-bold tracking-wide uppercase shadow-sm">
                    Most Popular for Businesses
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#176B9B]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#102A43]">{srv.title}</h3>
                  <div className="text-xs font-semibold text-[#176B9B] mb-3">{srv.subtitle}</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{srv.description}</p>

                  <div className="space-y-2.5 border-t border-slate-100 pt-6 mb-8">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={srv.ctaHref}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    srv.popular
                      ? 'bg-[#176B9B] hover:bg-[#102A43] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-[#102A43] hover:text-white text-slate-800'
                  }`}
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
