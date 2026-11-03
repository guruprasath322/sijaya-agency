import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
  const dimensions = { sm: 30, md: 38, lg: 48 };
  const textSize = { sm: 'text-base', md: 'text-lg', lg: 'text-xl' };
  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <Image src="/logo-s.png" alt="SIJAYA Agency monogram" width={dimensions[size]} height={dimensions[size]} className="object-contain" />
      <span className={`font-black tracking-[0.16em] ${textSize[size]} ${variant === 'light' ? 'text-white' : 'text-[#102A43]'}`}>SIJAYA Agency</span>
    </div>
  );
}
