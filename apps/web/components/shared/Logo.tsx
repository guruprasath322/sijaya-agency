import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', variant = 'dark', size = 'md' }: LogoProps) {
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 22,
    md: 28,
    lg: 34,
  };

  const currentIconSize = iconSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* Premium Energy Flame / Gas Drop Logo Mark */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentIconSize}
          height={currentIconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Outer Shield / Droplet Base */}
          <path
            d="M18 3C11 11.5 6 17.5 6 24C6 30.6274 11.3726 36 18 36C24.6274 36 30 30.6274 30 24C30 17.5 25 11.5 18 3Z"
            fill={isLight ? '#176B9B' : '#102A43'}
          />
          {/* Inner Gas Flame Layer */}
          <path
            d="M18 10C14 16 10 20.5 10 25C10 29.4183 13.5817 33 18 33C22.4183 33 26 29.4183 26 25C26 20.5 22 16 18 10Z"
            fill="url(#flameGradient)"
          />
          {/* Core Energy Flare */}
          <path
            d="M18 18C16 21 14 23.5 14 26C14 28.2091 15.7909 30 18 30C20.2091 30 22 28.2091 22 26C22 23.5 20 21 18 18Z"
            fill="#FDE68A"
          />
          <defs>
            <linearGradient id="flameGradient" x1="18" y1="10" x2="18" y2="33" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-wider ${sizeClasses[size]} ${isLight ? 'text-white' : 'text-[#102A43]'}`}>
          SIJAYA
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-widest ${
            isLight ? 'text-amber-400' : 'text-[#176B9B]'
          }`}
        >
          GasFlow
        </span>
      </div>
    </div>
  );
}
