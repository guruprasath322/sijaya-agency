import { PublicLayout } from '@/components/layout/PublicLayout';
import { ServicesSection } from '@/components/sections/ServicesSection';

export default function ServicesPage() {
  return (
    <PublicLayout eyebrow='Services' title='The right energy for every need.' description='From a home refill to a busy commercial kitchen, find a supply service that works for you.'>
      <ServicesSection />
    </PublicLayout>
  );
}
