'use client';
import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { BusinessSolutionsSection } from '@/components/sections/BusinessSolutionsSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';
export default function BusinessSolutionsPage() { return <AuthProvider><div className="min-h-screen flex flex-col"><Navbar/><main className="flex-1 pt-16"><BusinessSolutionsSection/></main><Footer/><FloatingWidgets/></div></AuthProvider>; }
