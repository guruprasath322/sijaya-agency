import { PublicLayout } from '@/components/layout/PublicLayout';
import { BusinessSolutionsSection } from '@/components/sections/BusinessSolutionsSection';

export default function BusinessSolutionsPage() {
  return (
    <PublicLayout eyebrow='Business solutions' title='Keep your business moving.' description='Dependable LPG supply arrangements for kitchens, institutions, and industries.'>
      <BusinessSolutionsSection />
    </PublicLayout>
  );
}
