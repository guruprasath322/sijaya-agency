import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProductShowcase } from '@/components/sections/ProductShowcase';

export default function ProductsPage() {
  return (
    <PublicLayout eyebrow='Products' title='Find your fit. Fuel your day.' description='Explore domestic, commercial, industrial, and bulk LPG supplied by Aegis Puregas.'>
      <ProductShowcase />
    </PublicLayout>
  );
}
