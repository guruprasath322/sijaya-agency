import type { Metadata } from 'next';
import { PageMotion } from '@/components/shared/PageMotion';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SIJAYA Agency — Reliable LPG Supply & Distribution',
    template: '%s | SIJAYA Agency',
  },
  description:
    'SIJAYA Agency provides reliable LPG gas supply for homes, businesses and industries. Domestic, commercial and bulk LPG distribution.',
  keywords: ['LPG', 'gas agency', 'cylinder', 'SIJAYA Agency', 'commercial gas', 'bulk LPG'],
  openGraph: {
    title: 'SIJAYA Agency',
    description: 'Reliable Gas Supply. Smarter Business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Tamil:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <PageMotion>{children}</PageMotion>
      </body>
    </html>
  );
}

