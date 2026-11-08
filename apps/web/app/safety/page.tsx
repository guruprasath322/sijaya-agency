import { PublicLayout } from '@/components/layout/PublicLayout';
import { SafetySection } from '@/components/sections/SafetySection';

export default function SafetyPage() {
  return (
    <PublicLayout eyebrow='Safety' title='Safety starts with small steps.' description='Practical guidance for storing, handling, and using your LPG cylinders with care.'>
      <SafetySection />
    </PublicLayout>
  );
}
