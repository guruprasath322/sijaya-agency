'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I request an LPG cylinder?',
      a: 'You can request a domestic refill or commercial supply by contacting our agency office directly by phone call or WhatsApp.',
    },
    {
      q: 'Do you supply commercial LPG for restaurants and hotels?',
      a: 'Yes. We supply 17 kg, 21 kg, and 33 kg commercial grade cylinders and multi-cylinder manifold systems tailored for restaurants, hotels, mess halls, bakeries, and catering businesses with priority dispatch.',
    },
    {
      q: 'Can commercial establishments request recurring supply arrangements?',
      a: 'Absolutely. We provide scheduled recurring supply agreements (weekly, bi-weekly, or custom intervals). Once arranged with our team, we schedules recurring dispatches without needing repetitive bookings.',
    },
    {
      q: 'How can I request bulk LPG supply?',
      a: 'You can submit a bulk supply enquiry through our "Request Gas / Quote" form or contact our commercial manager directly. We review your quantity requirements, delivery facility, and provide a formal written quotation.',
    },
    {
      q: 'How do I contact SIJAYA Agency?',
      a: 'Reach us via our official office phone, send an instant message on WhatsApp, use the contact form below, or visit our local distribution warehouse during working hours.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="site-container grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="max-w-sm lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="section-heading text-[#102A43] tracking-tight">
            A little clarity goes a long way.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Your questions about LPG supply, answered. Need something else? Our team is a call away.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-bold text-[#102A43] hover:text-[#176B9B] transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-corporate"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#176B9B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

