'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate min-h-[560px] sm:min-h-[640px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#102A43] pt-24">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(90deg, rgba(0,0,0,.58) 0%, rgba(0,0,0,.38) 47%, rgba(0,0,0,.08) 100%), url('/hero-depot.png')" }} />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-2xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-amber-200 sm:px-4 sm:text-xs sm:tracking-[.16em]">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> SIJAYA Agency · Supplied by Aegis Pure gas
          </span>
          <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-tight text-white sm:mt-7 sm:text-5xl lg:text-6xl">Reliable LPG for every home and business.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">High-purity LPG fuel designed for steady pressure and clean combustion. From home refills to dependable commercial supply.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-[#102A43] shadow-lg transition hover:bg-amber-300">Order / Request Supply <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/products" className="inline-flex items-center justify-center rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">Explore LPG products</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-100 sm:mt-10 sm:gap-x-8 sm:text-sm">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-300" /> Weight verified</span>
            <span className="inline-flex items-center gap-2"><Truck className="h-5 w-5 text-amber-300" /> Reliable local delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
