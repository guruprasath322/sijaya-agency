import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
      <section className="site-container py-20 text-center sm:py-28">
        <p className="text-7xl font-light tracking-tight text-slate-300 sm:text-9xl">404</p>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">A small detour.</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">We couldn’t find that page. Head back home or get in touch with the SIJAYA team.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className="btn-primary text-sm"><ArrowLeft className="h-4 w-4" />Back to home</Link><Link href="/contact" className="btn-outline text-sm">Contact us<ArrowUpRight className="h-4 w-4" /></Link></div>
      </section>
    </PublicLayout>
  );
}
