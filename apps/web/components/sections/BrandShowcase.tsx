'use client';

import React from 'react';
import Image from 'next/image';
import { Building2, Sparkles } from 'lucide-react';

const brandLogos = [
  { match: (name: string) => name.toLowerCase().includes('ebet'), src: '/brands/ebet-college.png' },
  { match: (name: string) => name.toLowerCase().includes('kuppanna'), src: '/brands/kuppanna-poultry.png' },
  { match: (name: string) => /kann?ika/i.test(name), src: '/brands/kanika-bakery.png' },
  { match: (name: string) => /s\.?r\.?\s*(bakery|beauty)/i.test(name), src: '/brands/sr-bakery.jpeg' },
  { match: (name: string) => /salem\s*r\.?r/i.test(name), src: '/brands/salem-rr-biriyani.jpeg' },
];

export function BrandShowcase() {
  const brands = [
    { id: '1', nameEnglish: 'EBET College', category: 'Education', logoUrl: '/brands/ebet-college.png', displayOrder: 1 },
    { id: '2', nameEnglish: 'Kuppanna Poultry', category: 'Poultry & Farm', logoUrl: '/brands/kuppanna-poultry.png', displayOrder: 2 },
    { id: '3', nameEnglish: 'Kannika Bakery', category: 'Bakery', logoUrl: '/brands/kanika-bakery.png', displayOrder: 3 },
    { id: '4', nameEnglish: 'S.R. Bakery – Ottanchathiram', category: 'Bakery', logoUrl: '/brands/sr-bakery.jpeg', displayOrder: 4 },
    { id: '5', nameEnglish: 'Salem R.R Biriyani', category: 'Restaurant', logoUrl: '/brands/salem-rr-biriyani.jpeg', displayOrder: 5 },
    { id: '6', nameEnglish: 'Winsome Hostel – Padiyur', category: 'Hostel', displayOrder: 6 },
    { id: '7', nameEnglish: 'Pazhaniandavar Mill', nameTamil: 'பழனியாண்டவர் மில்', category: 'Commercial Mill', displayOrder: 7 },
    { id: '8', nameEnglish: 'Arulmurugan Mill', nameTamil: 'அருள்முருகன் மில்', category: 'Commercial Mill', displayOrder: 8 },
  ].map((brand) => ({
    ...brand,
    logoUrl: brand.logoUrl || brandLogos.find(({ match }) => match(brand.nameEnglish))?.src,
  }));

  // Duplicate for seamless infinite loop scroll
  const displayItems = [...brands, ...brands, ...brands];

  return (
    <section className="py-14 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B9B] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Commercial & Institutional Relationships
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight">
          Businesses That Trust SIJAYA Agency
        </h2>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto mt-2">
          Building dependable supply relationships with businesses, educational institutions and commercial customers across the region.
        </p>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Left and Right Subtle Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        {/* Carousel Track with CSS animation and pause on hover */}
        <div className="flex items-center gap-6 w-max carousel-track hover:[animation-play-state:paused] py-2">
          {displayItems.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center gap-3.5 px-6 py-4 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#176B9B]/40 group/card select-none"
            >
              {/* Brand Logo or neutral fallback icon */}
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {brand.logoUrl ? (
                  <Image src={brand.logoUrl} alt={`${brand.nameEnglish} logo`} width={48} height={48} className="h-full w-full object-contain" />
                ) : (
                  <Building2 className="w-5 h-5 text-slate-500" />
                )}
              </div>

              {/* Brand Typography (Bilingual Support: English & Tamil) */}
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-800 group-hover/card:text-[#102A43] text-sm sm:text-base whitespace-nowrap transition-colors">
                  {brand.nameEnglish}
                </span>

                {brand.nameTamil && (
                  <span className="text-xs text-[#176B9B] font-medium font-tamil whitespace-nowrap">
                    {brand.nameTamil}
                  </span>
                )}

                {brand.category && (
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mt-0.5">
                    {brand.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-slate-400">
          * Selected business and institutional customers served by SIJAYA Agency.
        </p>
      </div>
    </section>
  );
}
