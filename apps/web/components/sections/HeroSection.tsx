'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Flame, Truck, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  headline?: string;
  supportingText?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function HeroSection({
  headline = 'Reliable Gas Supply. Smarter Business.',
  supportingText = 'Dependable LPG solutions for homes, businesses and industries — powered by reliable supply and smarter distribution.',
  primaryCta = 'Request Gas Supply',
  secondaryCta = 'Explore Our Services',
}: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background Decorative Energy Wave Gradients */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-[#176B9B] text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>SIJAYA Agencies • Authorised LPG Distributor</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102A43] tracking-tight leading-[1.15]">
              Reliable Gas Supply. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176B9B] via-[#102A43] to-[#F59E0B]">
                Smarter Business.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              {supportingText}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 hover:border-[#176B9B] text-[#102A43] hover:text-[#176B9B] font-semibold text-base transition-colors duration-200 bg-white"
              >
                <span>{secondaryCta}</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">100% Inspected & Safe</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#176B9B] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Prompt Commercial Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Transparent Digital Billing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual Card with LPG Cylinder Representation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card Container */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#102A43] to-[#1E3A52] text-white p-6 sm:p-8 shadow-2xl overflow-hidden border border-slate-700">
                {/* Subtle Geometric Background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#176B9B]/30 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">SIJAYA GasFlow Operations</h2>
                      <p className="text-xs text-slate-300">Supplier: Agispure Gas Distribution</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Status
                  </span>
                </div>

                {/* Cylinder Showcase Visual Graphic */}
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="relative my-2">
                    {/* SVG Realistic Cylinder Graphic */}
                    <svg width="150" height="190" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
                      {/* Cylinder Top Handle Collar */}
                      <path d="M42 16C42 12.6863 44.6863 10 48 10H72C75.3137 10 78 12.6863 78 16V28H42V16Z" fill="#DC2626" />
                      <rect x="47" y="14" width="26" height="6" rx="2" fill="#991B1B" />
                      {/* Valve Knob Brass */}
                      <circle cx="60" cy="24" r="5" fill="#F59E0B" />
                      <rect x="58" y="27" width="4" height="7" fill="#D97706" />
                      {/* Neck Ring */}
                      <path d="M38 34C38 31.7909 39.7909 30 42 30H78C80.2091 30 82 31.7909 82 34V38H38V34Z" fill="#B91C1C" />
                      {/* Main Body Dome Top */}
                      <path d="M20 54C20 41.8497 29.8497 38 42 38H78C90.1503 38 100 41.8497 100 54V124C100 132.837 92.8366 140 84 140H36C27.1634 140 20 132.837 20 124V54Z" fill="url(#cylinderGradient)" />
                      {/* Specular Highlight Strip */}
                      <path d="M28 48C28 48 30 42 38 40V136C30 134 28 128 28 128V48Z" fill="white" fillOpacity="0.15" />
                      {/* Bottom Foot Ring */}
                      <path d="M28 140H92V148C92 150.209 90.2091 152 88 152H32C29.7909 152 28 150.209 28 148V140Z" fill="#991B1B" />
                      <circle cx="40" cy="146" r="3" fill="#450A0A" />
                      <circle cx="60" cy="146" r="3" fill="#450A0A" />
                      <circle cx="80" cy="146" r="3" fill="#450A0A" />
                      {/* SIJAYA Brand Stamp on Body */}
                      <rect x="36" y="70" width="48" height="28" rx="4" fill="#0B1D2D" fillOpacity="0.4" />
                      <text x="60" y="84" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="1">SIJAYA</text>
                      <text x="60" y="93" fill="#F59E0B" fontSize="6.5" fontWeight="bold" textAnchor="middle">LPG 19 KG</text>
                      <defs>
                        <linearGradient id="cylinderGradient" x1="20" y1="38" x2="100" y2="140" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#EF4444" />
                          <stop offset="0.6" stopColor="#DC2626" />
                          <stop offset="1" stopColor="#991B1B" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-sm font-semibold text-white">Commercial & Domestic LPG Distribution</span>
                    <p className="text-xs text-slate-300 mt-0.5">High-efficiency pure propane/butane mix</p>
                  </div>
                </div>

                {/* Floating Metric Pill */}
                <div className="mt-2 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200">Agency Dispatch Center</span>
                  </div>
                  <span className="font-semibold text-amber-300">Ready for Orders</span>
                </div>
              </div>

              {/* Floating Quick Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-slate-100 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Supply Standard</div>
                  <div className="text-sm font-bold text-[#102A43]">Agispure Gas Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
