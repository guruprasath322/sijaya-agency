'use client';

import React from 'react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function ProductShowcase() {
  const products = [
    {
      id: '1',
      name: 'Domestic LPG',
      nameTamil: 'உள்நாட்டு எல்பிஜி',
      weight: '4 kg / 12 kg',
      description: 'Everyday cooking made simple, with compact cylinders and convenient home refills.',
      displayOrder: 1,
    },
    {
      id: '2',
      name: 'Commercial LPG',
      nameTamil: 'வணிக எல்பிஜி',
      weight: '17 / 21 / 33 kg',
      description: 'A steady supply for restaurant kitchens, bakeries, catering, and everyday business.',
      displayOrder: 2,
    },
    {
      id: '3',
      name: 'Industrial LPG',
      nameTamil: 'தொழில்துறை எல்பிஜி',
      weight: '33 kg LOT / 425 kg',
      description: 'Larger capacity options for process heating and demanding industrial operations.',
      displayOrder: 3,
    },
    {
      id: '4',
      name: 'Bulk LPG (kg)',
      nameTamil: 'மொத்த எல்பிஜி (கிலோ)',
      unit: 'KG',
      weight: 'KG',
      description: 'A tailored supply plan for high-volume commercial and institutional requirements.',
      displayOrder: 4,
    },
  ];

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-white relative">
      <div className="site-container">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            Our LPG range
          </div>
          <h2 className="section-heading text-[#102A43] tracking-tight">
            The right cylinder. The right supply.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Supplied by Aegis Pure gas for instant booking or scheduled supply.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((prod, index) => {
            return (
            <ScrollReveal delay={index * 0.08}
              key={prod.id}
              className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-6 hover:bg-white hover:border-[#176B9B]/60 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Visual Cylinder Graphic Container */}
                <div className="w-full h-36 sm:h-44 rounded-xl bg-gradient-to-b from-[#F0F5F8] to-[#E8EFF4] flex items-center justify-center p-4 mb-5 relative overflow-hidden group-hover:from-blue-50 group-hover:to-slate-100 transition-colors">
                  <div className="relative transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[-3deg] motion-reduce:transform-none">
                    {/* SVG Realistic Cylinder Graphic Badge */}
                    <svg width="80" height="110" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M35 12C35 9 37 8 40 8H60C63 8 65 9 65 12V22H35V12Z" fill="#DC2626" />
                      <circle cx="50" cy="18" r="4" fill="#F59E0B" />
                      <path d="M15 45C15 35 25 30 35 30H65C75 30 85 35 85 45V110C85 118 78 124 70 124H30C22 124 15 118 15 110V45Z" fill="#DC2626" />
                      <path d="M22 40C22 40 25 35 32 33V120C25 118 22 113 22 113V40Z" fill="white" fillOpacity="0.2" />
                      <path d="M22 124H78V132C78 134 76 136 74 136H26C24 136 22 134 22 132V124Z" fill="#991B1B" />
                      <rect x="28" y="60" width="44" height="20" rx="3" fill="#102A43" fillOpacity="0.3" />
                      <text x="50" y="69" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">AEGIS</text>
                      <text x="50" y="76" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" letterSpacing="0.5" textAnchor="middle">PUREGAS</text>
                    </svg>
                  </div>

                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded bg-white/90 text-slate-700 shadow-sm">
                    {prod.weight}
                  </span>
                </div>

                {/* Title & Bilingual Name */}
                <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#176B9B] transition-colors">
                  {prod.name}
                </h3>
                {prod.nameTamil && (
                  <p className="text-xs text-[#176B9B] font-medium font-tamil mt-0.5 mb-2">
                    {prod.nameTamil}
                  </p>
                )}

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {prod.description || 'High-purity LPG fuel designed for steady pressure and clean combustion.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Weight verified
                  </span>
                  <span>Aegis Pure gas Supply</span>
                </div>

                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 w-full min-h-11 py-3 rounded-xl text-sm font-bold text-[#102A43] bg-[#102A43] text-white hover:bg-[#176B9B] border border-[#102A43] hover:border-[#176B9B] transition-all shadow-sm"
                >
                  <span>Order / Request Supply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          );
          })}
        </div>

        <div className="mt-8 text-center bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 max-w-2xl mx-auto">
          Notice: LPG cylinder pricing and tariff rates are regulated and updated periodically based on official Aegis Puregas supplier circulars and applicable GST rates.
        </div>
      </div>
    </section>
  );
}
