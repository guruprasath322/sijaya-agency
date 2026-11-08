'use client';

import Link from 'next/link';
import { RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center bg-[#F7F6F2] px-5 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center sm:p-12">
        <Link href="/" className="inline-flex rounded-lg"><Logo /></Link>
        <AlertCircle className="mx-auto mt-10 h-10 w-10 text-corporate" strokeWidth={1.5} />
        <h1 className="mt-5 text-2xl font-bold sm:text-3xl">Let’s give that another try.</h1>
        <p role="alert" className="mt-4 text-sm leading-7 text-slate-600">Something interrupted this page. Try loading it again, or return to the website.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={reset} className="btn-primary text-sm"><RefreshCw className="h-4 w-4" />Try again</button><Link href="/" className="btn-outline text-sm"><ArrowLeft className="h-4 w-4" />Go home</Link></div>
      </div>
    </main>
  );
}
