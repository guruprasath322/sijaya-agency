'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Factory, Home, ShieldCheck, Truck, UtensilsCrossed } from 'lucide-react';

const supplyTypes = [
  { icon: Home, title: 'For your home', detail: '4 kg / 12 kg domestic LPG', href: '/products' },
  { icon: UtensilsCrossed, title: 'For your business', detail: '17 kg / 21 kg / 33 kg cylinders', href: '/services' },
  { icon: Factory, title: 'For your industry', detail: 'Bulk & scheduled supply', href: '/business-solutions' },
];

export function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });
  return (
    <section ref={hero} id="hero" className="overflow-hidden border-b border-slate-200/80 bg-[#F7F6F2]">
      <div className="site-container py-10 sm:py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <motion.p {...entrance(0.05)} className="eyebrow"><span className="h-2 w-2 rounded-full bg-corporate" />Local service. Lasting trust.</motion.p>
            <motion.h1 {...entrance(0.14)} className="mt-5 max-w-xl text-[2.75rem] font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4.5rem]">Reliable energy.<br /><span className="text-corporate">Every day.</span></motion.h1>
            <motion.p {...entrance(0.24)} className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">LPG for the meals you make and the business you build. Dependable supply for homes, commercial kitchens, and industries from SIJAYA Agency.</motion.p>
            <motion.div {...entrance(0.34)} className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Link href="/contact" className="btn-accent text-sm">Request gas supply<ArrowUpRight className="h-4 w-4" /></Link>
              <Link href="/products" className="btn-outline border-slate-300 bg-white text-sm text-primary hover:border-primary hover:bg-primary">Explore products<ArrowRight className="h-4 w-4" /></Link>
            </motion.div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-6 text-xs font-medium text-slate-600 sm:text-sm">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-corporate" />Weight verified</span>
              <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-corporate" />Reliable local delivery</span>
            </div>
          </div>
          <motion.div {...entrance(0.2)} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-slate-200 sm:aspect-[5/4] lg:aspect-[1.08]">
              <motion.div className="absolute inset-0" style={reducedMotion ? undefined : { scale: imageScale, y: imageY }}>
              <Image src="/hero-depot.png" alt="Aegis Puregas LPG cylinders prepared for distribution at a depot" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[35%_center]" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-6 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-amber-300 backdrop-blur"><ShieldCheck className="h-6 w-6" /></span>
                <div><p className="text-sm font-semibold text-white">Care in every cylinder.</p><p className="mt-1 text-xs text-slate-200">Safe handling · Steady supply · Local support</p></div>
              </div>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/95 px-4 py-3 shadow-sm sm:right-6 sm:top-6">
              <Image src="/aegis-puregas.png" alt="" width={32} height={40} className="h-10 w-auto object-contain" />
              <div><p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">LPG supplied by</p><p className="text-sm font-bold text-primary">Aegis Puregas</p></div>
            </div>
          </motion.div>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-14">
          {supplyTypes.map(({ icon: Icon, title, detail, href }) => (
            <Link key={title} href={href} className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:border-corporate/40 hover:shadow-md sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-corporate"><Icon className="h-5 w-5" strokeWidth={1.75} /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-primary">{title}</span><span className="mt-1 block text-xs text-slate-500">{detail}</span></span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-corporate" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
