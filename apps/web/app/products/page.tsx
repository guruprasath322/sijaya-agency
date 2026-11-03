'use client';
import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';
export default function ProductsPage() { return <AuthProvider><div className="min-h-screen flex flex-col"><Navbar/><main className="flex-1 pt-16"><ProductShowcase/></main><Footer/><FloatingWidgets/></div></AuthProvider>; }
