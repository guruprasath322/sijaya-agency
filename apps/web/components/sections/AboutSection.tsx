'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Truck, Layers, Users } from 'lucide-react';

export function AboutSection({ priority = false }: { priority?: boolean } = {}) {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Safety First Protocol',
      description: 'Strict cylinder safety inspections, weight verification and leak tests before every dispatch.',
    },
    {
      icon: Truck,
      title: 'Dedicated Distribution Fleet',
      description: 'Systematic dispatch scheduling ensuring prompt delivery for domestic and business clients.',
    },
    {
      icon: Layers,
      title: 'Commercial Supply Contracts',
      description: 'Reliable recurring supply arrangements tailored for hotels, restaurants, bakeries and mills.',
    },
    {
      icon: Users,
      title: 'Dedicated Customer Care',
      description: 'Direct phone or WhatsApp for seamless refills and account billing.',
    },
  ];

  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-slate-100">
            <Image src="/hero-depot.png" alt="LPG cylinders and distribution fleet at a gas depot" fill priority={priority} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-left" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <p className="absolute bottom-7 left-7 right-7 text-2xl font-semibold leading-tight text-white sm:text-3xl">Local roots.<br />Dependable service.</p>
          </div>
          <div className="relative mx-5 -mt-8 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F7F6F2] p-5 shadow-sm sm:mx-8 sm:p-6">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">Our supply partner</p><p className="mt-1 text-lg font-semibold text-primary">Aegis Puregas</p><p className="mt-1 text-xs text-slate-500">High-purity LPG. Consistent performance.</p></div>
            <Image src="/aegis-puregas.png" alt="Aegis Puregas logo" width={52} height={65} className="h-16 w-auto shrink-0 object-contain" />
          </div>
        </div>
        <div>
          <p className="eyebrow"><span className="h-px w-7 bg-accent" />The SIJAYA promise</p>
          <h2 className="section-heading mt-5">More than a cylinder.<br />A commitment.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">SIJAYA Agency supplies safe, high-purity LPG to households, commercial kitchens, and industries, with supply from Aegis Puregas. We believe a reliable energy partner should be easy to reach and ready to help.</p>
          <p className="mt-4 text-sm leading-7 text-slate-500">Our team tracks stock, coordinates deliveries, and records transactions transparently, so you can focus on the day ahead.</p>
          <div className="mt-7 divide-y divide-slate-100 border-y border-slate-100">
            {highlights.map(({ icon: Icon, title, description }) => <div key={title} className="flex items-start gap-4 py-4"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-corporate" strokeWidth={1.75} /><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-6 text-slate-500">{description}</p></div></div>)}
          </div>
          <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-corporate">Get to know your local team<ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
