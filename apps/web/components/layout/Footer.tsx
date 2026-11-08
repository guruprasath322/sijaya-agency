'use client';

import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Phone, Mail, MapPin, ArrowUp, ArrowUpRight, ShieldCheck } from 'lucide-react';

const links = [
  ['About SIJAYA', '/about'], ['Our services', '/services'], ['Business solutions', '/business-solutions'],
  ['LPG products', '/products'], ['Safety guidance', '/safety'], ['Contact us', '/contact'],
];

export function Footer() {
  return (
    <footer className="bg-primary pb-24 pt-12 text-white sm:pb-8 sm:pt-16">
      <div className="site-container">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-16">
          <div>
            <Logo variant="light" size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">Reliable LPG for homes, commercial kitchens, institutions, and industries. Local service you can count on.</p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-amber-300"><ShieldCheck className="h-4 w-4" />Supplied by Aegis Puregas</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Explore SIJAYA</h2>
            <ul className="mt-4 grid gap-1">
              {links.map(([label, href]) => <li key={href}><Link href={href} className="inline-flex min-h-10 items-center gap-2 text-sm text-slate-300 transition hover:text-white">{label}<ArrowUpRight className="h-3 w-3 text-slate-500" /></Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Get in touch</h2>
            <div className="mt-5 space-y-5 text-sm text-slate-300">
              <a href="https://maps.app.goo.gl/NKZYsDofKWEML7aVA" target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-white"><MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-400" /><span>SIJAYA Agency · Office &amp; Depot<br /><span className="text-xs text-slate-400">Vellakoil, Tamil Nadu 638111</span></span></a>
              <div className="flex items-start gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-slate-400" /><div className="space-y-2"><a href="tel:+919789494899" className="block hover:text-white">+91 97894 94899</a><a href="tel:+919488679029" className="block hover:text-white">+91 94886 79029</a></div></div>
              <a href="mailto:sijayaexcorp@gmail.com" className="flex items-center gap-3 break-all hover:text-white"><Mail className="h-4 w-4 shrink-0 text-slate-400" />sijayaexcorp@gmail.com</a>
              <a href="https://wa.me/919789494899" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-4 text-xs font-semibold text-emerald-300 transition hover:bg-white/5">Chat on WhatsApp<ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} SIJAYA Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="inline-flex min-h-10 items-center hover:text-white">Staff sign in</Link>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} className="inline-flex min-h-10 items-center gap-2 hover:text-white">Back to top<ArrowUp className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
