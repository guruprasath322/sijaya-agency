'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Phone, Mail, MapPin, ArrowUp, MessageSquare, ShieldCheck } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#102A43] text-white pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mt-3">
              SIJAYA Agency supplies reliable LPG for homes, commercial kitchens, institutions and industrial enterprises.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified LPG Safety & Digital Order Tracking</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About Agency</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">Gas Services</Link>
              </li>
              <li>
                <Link href="/business-solutions" className="hover:text-amber-400 transition-colors">Business Solutions</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-400 transition-colors">Cylinder Catalogue</Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-amber-400 transition-colors">Safety Protocols</Link>
              </li>
            </ul>
          </div>

          {/* Supply Request */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              LPG Supply
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">Request Gas Supply or Quotation</Link>
              </li>
            </ul>
          </div>

          {/* Agency Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Agency Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <a href="https://maps.app.goo.gl/NKZYsDofKWEML7aVA" target="_blank" rel="noreferrer" className="hover:text-white">SIJAYA Agency · Office & Depot</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="flex flex-col"><a href="tel:+919789494899" className="hover:text-white">+91 97894 94899</a><a href="tel:+919488679029" className="hover:text-white">+91 94886 79029</a></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:sijayaexcorp@gmail.com" className="hover:text-white">sijayaexcorp@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="flex flex-col"><a href="https://wa.me/919789494899" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp · +91 97894 94899</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} SIJAYA Agency. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-white transition-colors ml-2"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

