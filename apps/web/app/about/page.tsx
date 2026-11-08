import { PublicLayout } from '@/components/layout/PublicLayout';
import { AboutSection } from '@/components/sections/AboutSection';

export default function AboutPage() {
  return (
    <PublicLayout eyebrow='About' title='A local partner. A reliable supply.' description='Get to know the people and principles behind your everyday LPG supply.'>
      <AboutSection priority />
    </PublicLayout>
  );
}
