import { Children } from 'react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWidgets } from './FloatingWidgets';

interface PublicLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  eyebrow?: string;
}

export function PublicLayout({ children, title, description, eyebrow }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-primary">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-20">
        {title && (
          <header className="public-page-header relative overflow-hidden border-b border-slate-200/80 bg-[#F7F6F2] py-10 sm:py-14 lg:py-16">
            <div className="site-container relative">
              <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
                <Link href="/" className="hover:text-corporate">Home</Link>
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                <span aria-current="page" className="font-medium text-primary">{eyebrow}</span>
              </nav>
              <div className="flex items-end justify-between gap-10">
                <div className="max-w-3xl">
                  <p className="eyebrow mb-4"><span className="h-1.5 w-6 rounded-full bg-accent" />{eyebrow}</p>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]">{title}</h1>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>
                </div>
                <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 lg:flex">
                  <ShieldCheck className="h-8 w-8 text-corporate" strokeWidth={1.5} />
                  <div className="text-xs leading-relaxed"><span className="block font-semibold text-primary">Your local LPG partner</span><span className="text-slate-500">Vellakoil, Tamil Nadu</span></div>
                </div>
              </div>
            </div>
          </header>
        )}
        {Children.toArray(children).map((child, index) => !title && index === 0 ? child : <ScrollReveal key={index}>{child}</ScrollReveal>)}
        {title && eyebrow !== 'Contact' && (
          <section className="site-container py-10 sm:py-14">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-[#F7F6F2] p-6 sm:p-9 md:flex-row md:items-center">
              <div><h2 className="text-xl font-bold sm:text-2xl">Let’s find the right supply for you.</h2><p className="mt-2 text-sm text-slate-600">A home refill or a business requirement — our team is here to help.</p></div>
              <Link href="/contact" className="btn-primary shrink-0 text-sm">Talk to our team<ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
