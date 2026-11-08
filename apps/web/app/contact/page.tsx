import { PublicLayout } from '@/components/layout/PublicLayout';
import { ContactSection } from '@/components/sections/ContactSection';

export default function ContactPage() {
  return (
    <PublicLayout eyebrow='Contact' title='Let’s talk about your supply.' description='Request a refill, plan a business supply, or ask for a quotation. Our local team is ready to help.'>
      <ContactSection />
    </PublicLayout>
  );
}
