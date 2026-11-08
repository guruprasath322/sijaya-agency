'use client';

import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandShowcase } from '@/components/sections/BrandShowcase';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { BusinessSolutionsSection } from '@/components/sections/BusinessSolutionsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <BrandShowcase />
      <AboutSection />
      <ServicesSection />
      <BusinessSolutionsSection />
      <HowItWorksSection />
      <ProductShowcase />
      <FAQSection />
      <ContactSection />
    </PublicLayout>
  );
}
