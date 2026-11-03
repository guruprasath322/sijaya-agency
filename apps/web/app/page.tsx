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
import { SafetySection } from '@/components/sections/SafetySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-background text-[#102A43]">
        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Trust Brand Showcase (Infinite Loop Carousel) */}
          <BrandShowcase />

          {/* 3. About SIJAYA Agencies */}
          <AboutSection />

          {/* 4. Core Services (Domestic, Commercial, Bulk) */}
          <ServicesSection />

          {/* 5. Business Solutions (Hotels, Hostels, Bakeries, Poultry, Mills) */}
          <BusinessSolutionsSection />

          {/* 6. 4-Step Process */}
          <HowItWorksSection />

          {/* 7. Why Choose SIJAYA */}
          <WhyChooseSection />

          {/* 8. Configurable Product Catalogue */}
          <ProductShowcase />

          {/* 9. Safety Standards & Emergency Precautions */}
          <SafetySection />

          {/* 10. Customer Testimonials */}
          <TestimonialsSection />

          {/* 11. FAQ Accordion */}
          <FAQSection />

          {/* 12. Contact Details & Interactive Form */}
          <ContactSection />
        </main>

        <Footer />
        <FloatingWidgets />
      </div>
    </AuthProvider>
  );
}
