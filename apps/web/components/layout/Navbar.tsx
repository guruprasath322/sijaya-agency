'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Menu, X, ArrowRight, User, PhoneCall } from 'lucide-react';
import { useAuth } from '@/components/shared/AuthContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Business Solutions', href: '#business' },
    { label: 'Products', href: '#products' },
    { label: 'Safety', href: '#safety' },
    { label: 'Contact', href: '#contact' },
  ];

  const getPortalLink = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN' || user.role === 'MANAGER') return '/dashboard';
    if (user.role === 'DRIVER') return '/driver';
    if (user.role === 'STAFF') return '/staff';
    return '/customer';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center focus:outline-none">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-[#176B9B] transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#176B9B] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={getPortalLink()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#102A43] hover:text-[#176B9B] hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
            >
              <User className="w-4 h-4 text-[#176B9B]" />
              {user ? (user.customer?.name || user.staff?.name || 'My Portal') : 'Customer Login'}
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#176B9B] hover:bg-[#102A43] rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>Request Gas / Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href={getPortalLink()}
              className="p-2 text-[#102A43] hover:bg-slate-100 rounded-lg"
              title="Portal Login"
            >
              <User className="w-5 h-5 text-[#176B9B]" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#102A43] hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-[#176B9B] py-2 border-b border-slate-50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <Link
                href={getPortalLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-[#102A43] bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                <User className="w-4 h-4 text-[#176B9B]" />
                {user ? 'Go to Portal' : 'Customer Portal Login'}
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#176B9B] hover:bg-[#102A43] rounded-lg shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Gas / Get a Quote</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
