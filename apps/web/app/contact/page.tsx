'use client';

import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';

export default function ContactPage() {
  return <AuthProvider><div className="min-h-screen flex flex-col bg-white text-[#102A43]"><Navbar /><main className="flex-1 pt-16"><ContactSection /></main><Footer /><FloatingWidgets /></div></AuthProvider>;
}
