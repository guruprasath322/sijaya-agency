'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate min-h-[680px] flex items-center overflow-hidden bg-[#102A43] pt-24">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,.58) 0%, rgba(0,0,0,.38) 47%, rgba(0,0,0,.08) 100%), url('/hero-depot.png')" }} />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> SIJAYA Agencies · Agispure LPG
          </span>
          <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl">Reliable LPG for every home and business.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">High-purity LPG fuel designed for steady pressure and clean combustion. From home refills to dependable commercial supply.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/customer/book" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-[#102A43] shadow-lg transition hover:bg-amber-300">Order / Request Supply <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/products" className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">Explore LPG products</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-100">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-300" /> Weight verified</span>
            <span className="inline-flex items-center gap-2"><Truck className="h-5 w-5 text-amber-300" /> Reliable local delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
