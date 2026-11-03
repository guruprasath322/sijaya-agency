'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I request an LPG cylinder?',
      a: 'You can request a domestic refill or commercial supply directly through our online customer portal, by registering an account, or by contacting our agency office directly by phone or WhatsApp.',
    },
    {
      q: 'Do you supply commercial LPG for restaurants and hotels?',
      a: 'Yes. We supply 19 kg commercial grade cylinders and multi-cylinder manifold systems tailored for restaurants, hotels, mess halls, bakeries, and catering businesses with priority dispatch.',
    },
    {
      q: 'Can commercial establishments request recurring supply arrangements?',
      a: 'Absolutely. We provide scheduled recurring supply agreements (weekly, bi-weekly, or custom intervals). Once set up in your portal, our team schedules recurring dispatches without needing repetitive bookings.',
    },
    {
      q: 'How can I request bulk LPG supply?',
      a: 'You can submit a bulk supply enquiry through our "Request Gas / Quote" form or contact our commercial manager directly. We review your quantity requirements, delivery facility, and provide a formal written quotation.',
    },
    {
      q: 'How do I track my active cylinder delivery?',
      a: 'Once your order is confirmed, log in to your customer portal. You will see real-time status updates: Pending, Confirmed, Scheduled, Out for Delivery, or Delivered.',
    },
    {
      q: 'How do I contact SIJAYA Agencies?',
      a: 'Reach us via our official office phone, send an instant message on WhatsApp, use the contact form below, or visit our local distribution warehouse during working hours.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Answers to common questions about LPG delivery, commercial orders, and account management.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-bold text-[#102A43] hover:text-[#176B9B] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#176B9B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
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

