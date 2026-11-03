'use client';
import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { SafetySection } from '@/components/sections/SafetySection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';
export default function SafetyPage() { return <AuthProvider><div className="min-h-screen flex flex-col"><Navbar/><main className="flex-1 pt-16"><SafetySection/></main><Footer/><FloatingWidgets/></div></AuthProvider>; }
