'use client';

import React from 'react';
import { Quote, Star, CheckCircle, Info } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      author: 'Commercial Kitchen Manager',
      organisation: 'Restaurant Client (Palani Region)',
      text: 'Switching our restaurant recurring supply to SIJAYA Agency has streamlined our operational kitchen mornings. Cylinders are delivered on time before our breakfast prep starts.',
      isDemo: true,
      rating: 5,
    },
    {
      author: 'Hostel Facilities Warden',
      organisation: 'Institutional Customer',
      text: 'The scheduled weekly batch refill ensures we never run out of cooking fuel for our 400+ hostellers. Account billing and GST invoices are accurate and straightforward.',
      isDemo: true,
      rating: 5,
    },
    {
      author: 'Domestic Resident',
      organisation: 'Household Account (Dindigul)',
      text: 'Online refill booking was fast, and the delivery staff verified the cylinder seal and net weight right in front of us before handoff.',
      isDemo: true,
      rating: 5,
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            Customer Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Commitment to Real Service Quality
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            What commercial chefs, institutional wardens, and households say about their experience with SIJAYA Agency.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Demonstration sample cards — real customer reviews are approved and updated through the administrative portal.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#176B9B]/40 hover:shadow-md transition-all relative"
            >
              <div>
                <Quote className="w-8 h-8 text-blue-200 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#102A43]">{t.author}</div>
                  <div className="text-xs text-slate-500">{t.organisation}</div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  Demo Label
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

