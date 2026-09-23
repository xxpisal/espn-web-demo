'use client';

export const ESPN_LOGO_URL = '/espn-logo.png';

interface EspnLogoProps {
  className?: string;
  alt?: string;
}

export function EspnLogo({
  className = 'h-8 w-auto',
  alt = 'ESPN',
}: EspnLogoProps) {
  return (
    <img
      src={ESPN_LOGO_URL}
      alt={alt}
      className={`object-contain select-none ${className}`}
      loading="eager"
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.src.includes('1000logos.net')) {
          target.src = 'https://1000logos.net/wp-content/uploads/2021/05/ESPN-logo.png';
        }
      }}
    />
  );
}
