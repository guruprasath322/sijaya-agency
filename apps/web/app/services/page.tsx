'use client';
import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';
export default function ServicesPage() { return <AuthProvider><div className="min-h-screen flex flex-col"><Navbar/><main className="flex-1 pt-16"><ServicesSection/></main><Footer/><FloatingWidgets/></div></AuthProvider>; }
