'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Business Solutions', href: '/business-solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Safety', href: '/safety' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuButton.current?.getAttribute('aria-expanded') === 'true') {
        setMobileMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const closeAtDesktop = () => {
      if (window.innerWidth >= 1280) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', closeAtDesktop);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', closeAtDesktop);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="site-container flex h-20 items-center justify-between gap-5">
        <Link href="/" aria-label="SIJAYA Agency home" onClick={() => setMobileMenuOpen(false)} className="shrink-0 rounded-lg"><Logo /></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={`rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${pathname === href ? 'bg-blue-50 text-corporate' : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}`}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/contact" className="btn-primary hidden min-h-11 px-4 py-2.5 text-sm sm:inline-flex">Request supply<ArrowUpRight className="h-4 w-4" /></Link>
          <button ref={menuButton} type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-primary hover:bg-slate-50 xl:hidden" aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-100 bg-white px-5 py-5 shadow-lg sm:px-8 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navLinks.map(({ label, href }) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} aria-current={pathname === href ? 'page' : undefined} className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-medium ${pathname === href ? 'bg-blue-50 text-corporate' : 'text-slate-600 hover:bg-slate-50'}`}>{label}<ArrowUpRight className="h-4 w-4" /></Link>)}
            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm">Request gas / get a quote<ArrowUpRight className="h-4 w-4" /></Link>
              <a href="tel:+919789494899" className="btn-outline text-sm"><Phone className="h-4 w-4" />+91 97894 94899</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
