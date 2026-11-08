'use client';

import { MotionConfig } from 'framer-motion';

// Keep fixed navigation and dialogs outside transformed animation containers.
export function PageMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
