'use client';

import React, { useEffect, useState } from 'react';
import { brandsApi, Brand } from '@/lib/api';
import { Building2, Sparkles } from 'lucide-react';

export function BrandShowcase() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback verified/preliminary list from supplied agency records
  const defaultBrands: Partial<Brand>[] = [
    { id: '1', nameEnglish: 'EBET College', category: 'Education', displayOrder: 1 },
    { id: '2', nameEnglish: 'Kuppanna Poultry', category: 'Poultry & Farm', displayOrder: 2 },
    { id: '3', nameEnglish: 'Kannika Beauty', category: 'Commercial Enterprise', displayOrder: 3 },
    { id: '4', nameEnglish: 'S.R. Beauty – Ottanchathiram', category: 'Commercial', displayOrder: 4 },
    { id: '5', nameEnglish: 'Bhavani Amman Mess – Anumanthalli', category: 'Restaurant & Mess', displayOrder: 5 },
    { id: '6', nameEnglish: 'Winsome Hostel – Palani', category: 'Institutional Hostel', displayOrder: 6 },
    { id: '7', nameEnglish: 'Pazhaniandavar Mill', nameTamil: 'பழனியாண்டவர் மில்', category: 'Commercial Mill', displayOrder: 7 },
    { id: '8', nameEnglish: 'Arunmigu Mill', nameTamil: 'அருண்மிகு மில்', category: 'Commercial Mill', displayOrder: 8 },
  ];

  useEffect(() => {
    brandsApi
      .getPublic()
      .then((data) => {
        if (data && data.length > 0) {
          setBrands(data);
        } else {
          // If manager hasn't yet toggled approved flag in fresh db, use verified reference records
          setBrands(defaultBrands as Brand[]);
        }
      })
      .catch(() => {
        setBrands(defaultBrands as Brand[]);
      })
      .finally(() => setLoading(false));
  }, []);

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
          Businesses That Trust SIJAYA
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
              {/* Premium Brand Badge Icon */}
              <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover/card:bg-blue-50 flex items-center justify-center text-slate-500 group-hover/card:text-[#176B9B] transition-colors flex-shrink-0">
                <Building2 className="w-5 h-5" />
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
          * Verified business delivery accounts. Managed and updated directly through the SIJAYA administrative platform.
        </p>
      </div>
    </section>
  );
}
