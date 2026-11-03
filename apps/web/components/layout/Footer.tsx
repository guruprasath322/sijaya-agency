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
              SIJAYA Agencies — Authorized LPG distributor in official collaboration with Agispure Gas. Supplying reliable energy solutions for domestic homes, commercial kitchens, institutions and industrial enterprises.
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
                <a href="#hero" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Agency</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">Gas Services</a>
              </li>
              <li>
                <a href="#business" className="hover:text-amber-400 transition-colors">Business Solutions</a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">Cylinder Catalogue</a>
              </li>
              <li>
                <a href="#safety" className="hover:text-amber-400 transition-colors">Safety Protocols</a>
              </li>
            </ul>
          </div>

          {/* Portals & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Portals & Supply
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/customer" className="hover:text-amber-400 transition-colors">Customer Portal</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-400 transition-colors">Portal Login</Link>
              </li>
              <li>
                <Link href="/customer/book" className="hover:text-amber-400 transition-colors">Book Domestic Cylinder</Link>
              </li>
              <li>
                <Link href="/customer/commercial" className="hover:text-amber-400 transition-colors">Commercial Quotations</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Manager Dashboard</Link>
              </li>
              <li>
                <Link href="/driver" className="hover:text-amber-400 transition-colors">Driver Dispatch App</Link>
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
                <span>SIJAYA Agencies, Depot & Distribution Office</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>[Agency Phone Number]</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>contact@sijaya.in</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} SIJAYA Agencies (SIJAYA GasFlow). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-white transition-colors">Terms & Conditions</a>
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
