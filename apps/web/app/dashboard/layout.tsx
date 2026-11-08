'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { AuthProvider, useAuth } from '@/components/shared/AuthContext';
import { LayoutDashboard, ShoppingCart, Truck, Boxes, Layers, Users, CreditCard, FileText, Calendar, BarChart2, Sliders, ShieldAlert, LogOut, Menu, X, Home, CheckCircle, Sparkles, Inbox, ChevronRight, ArrowUpRight } from 'lucide-react';

const menuGroups = [
  { group: 'Operations', items: [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { label: 'Incoming loads', href: '/dashboard/loads', icon: Truck },
    { label: 'Inventory', href: '/dashboard/inventory', icon: Boxes },
    { label: 'Cylinder tracking', href: '/dashboard/cylinders', icon: Layers },
    { label: 'Deliveries', href: '/dashboard/deliveries', icon: CheckCircle },
    { label: 'Delivery calendar', href: '/dashboard/calendar', icon: Calendar },
  ] },
  { group: 'Business & accounts', items: [
    { label: 'Customers & credit', href: '/dashboard/customers', icon: Users },
    { label: 'Quotations', href: '/dashboard/quotations', icon: FileText },
    { label: 'Payments & invoices', href: '/dashboard/payments', icon: CreditCard },
    { label: 'Reports', href: '/dashboard/reports', icon: BarChart2 },
  ] },
  { group: 'Administration', items: [
    { label: 'Brand showcase', href: '/dashboard/brands', icon: Sparkles },
    { label: 'Website content', href: '/dashboard/content', icon: Sliders },
    { label: 'Supply requests', href: '/dashboard/requests', icon: Inbox },
    { label: 'Staff & drivers', href: '/dashboard/staff', icon: Users },
    { label: 'Audit logs', href: '/dashboard/audit', icon: ShieldAlert },
  ] },
];

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const drawer = useRef<HTMLDialogElement>(null);
  const activePage = menuGroups.flatMap(group => group.items).find(item => item.href === pathname)?.label || 'Overview';

  useEffect(() => {
    const closeOnDesktop = () => { if (window.innerWidth >= 1024) drawer.current?.close(); };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const navigation = (
    <div className="flex min-h-full flex-col p-5">
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
        <Link href="/" className="rounded-lg"><Logo variant="light" size="sm" /></Link>
        <button type="button" onClick={() => drawer.current?.close()} aria-label="Close workspace navigation" className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 lg:hidden"><X className="h-5 w-5" /></button>
      </div>
      <p className="mb-6 flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />Agency workspace</p>
      <nav aria-label="Workspace navigation" className="flex-1 space-y-6">
        {menuGroups.map(group => (
          <div key={group.group}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">{group.group}</p>
            <div className="space-y-1">
              {group.items.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => drawer.current?.close()} aria-current={pathname === href ? 'page' : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${pathname === href ? 'bg-white text-primary shadow-sm' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><Icon className={`h-[18px] w-[18px] shrink-0 ${pathname === href ? 'text-corporate' : ''}`} strokeWidth={1.75} /><span className="flex-1">{label}</span>{pathname === href && <span className="h-1.5 w-1.5 rounded-full bg-corporate" />}</Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-7 border-t border-white/10 pt-5">
        <div className="mb-4 flex items-center gap-3 px-2"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-semibold text-amber-300">{(user?.staff?.name || user?.email || 'SA').slice(0, 2).toUpperCase()}</span><div className="min-w-0"><p className="truncate text-xs font-medium text-white">{user?.staff?.name || user?.email || 'SIJAYA Agency'}</p><p className="mt-1 text-[10px] capitalize text-slate-400">{user?.role?.toLowerCase() || 'Operations'}</p></div></div>
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-slate-300 hover:bg-white/5 hover:text-white"><Home className="h-4 w-4" />Public website<ArrowUpRight className="ml-auto h-3.5 w-3.5" /></Link>
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-rose-300 hover:bg-rose-500/10"><LogOut className="h-4 w-4" />Sign out</button>
      </div>
    </div>
  );

  return (
    <div className="workspace min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 overflow-y-auto bg-primary text-white lg:block xl:w-[272px]">{navigation}</aside>
      <dialog ref={drawer} aria-label="Workspace navigation" onClick={event => { if (event.target === event.currentTarget) drawer.current?.close(); }} className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(86vw,304px)] max-w-none overflow-y-auto border-0 bg-primary p-0 text-white shadow-2xl backdrop:bg-primary/50 backdrop:backdrop-blur-sm lg:hidden">{navigation}</dialog>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-lg sm:px-7 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => drawer.current?.showModal()} aria-label="Open workspace navigation" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-primary lg:hidden"><Menu className="h-5 w-5" /></button>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm"><span className="hidden text-slate-400 sm:inline">Workspace</span><ChevronRight className="hidden h-3.5 w-3.5 text-slate-400 sm:block" /><span aria-current="page" className="truncate font-semibold text-primary">{activePage}</span></nav>
          </div>
          <Link href="/" className="flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50">View website<ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </header>
        <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-7 lg:p-8 xl:p-10">{children}</main>
        <footer className="flex flex-wrap justify-between gap-2 px-4 pb-6 text-[11px] text-slate-500 sm:px-7 lg:px-8"><span>SIJAYA Agency · Operations</span><span>Supply partner: Aegis Puregas</span></footer>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider><DashboardLayoutInner>{children}</DashboardLayoutInner></AuthProvider>;
}
