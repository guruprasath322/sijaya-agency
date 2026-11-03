'use client';

import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { AboutSection } from '@/components/sections/AboutSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';

export default function AboutPage() {
  return <AuthProvider><div className="min-h-screen flex flex-col bg-white text-[#102A43]"><Navbar /><main className="flex-1 pt-16"><AboutSection /></main><Footer /><FloatingWidgets /></div></AuthProvider>;
}
