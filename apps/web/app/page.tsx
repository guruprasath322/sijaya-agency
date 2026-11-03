'use client';

import React from 'react';
import { AuthProvider } from '@/components/shared/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandShowcase } from '@/components/sections/BrandShowcase';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { BusinessSolutionsSection } from '@/components/sections/BusinessSolutionsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';

export default function HomePage() {
  return <AuthProvider><div className="min-h-screen flex flex-col bg-white text-[#102A43]"><Navbar /><main className="flex-1"><HeroSection /><BrandShowcase /><AboutSection /><ServicesSection /><BusinessSolutionsSection /><HowItWorksSection /><WhyChooseSection /><ProductShowcase /><FAQSection /><ContactSection /></main><Footer /><FloatingWidgets /></div></AuthProvider>;
}
