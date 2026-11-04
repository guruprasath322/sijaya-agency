'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export function FloatingWidgets() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/919789494899?text=Hello%20SIJAYA%20Agency,%20I%20would%20like%20to%20enquire%20about%20LPG%20gas%20supply."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float group"
        aria-label="Chat with SIJAYA Agency on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        <span className="sr-only">Chat on WhatsApp</span>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with SIJAYA Agency Support
        </span>
      </a>

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-white text-[#102A43] hover:bg-[#176B9B] hover:text-white shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-200 animate-in fade-in"
          aria-label="Scroll back to top"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

