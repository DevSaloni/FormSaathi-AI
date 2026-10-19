import React from 'react';

interface FormSaathiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  tagline?: string;
  className?: string;
}

export const FormSaathiLogo: React.FC<FormSaathiLogoProps> = ({
  size = 'md',
  showText = true,
  tagline,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10',
    lg: 'w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12',
    xl: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
  }[size];

  const textSizes = {
    sm: { title: 'text-sm sm:text-base', badge: 'text-[9px]', tag: 'text-[10px]' },
    md: { title: 'text-[15px] sm:text-lg md:text-xl', badge: 'text-[9px] sm:text-[10px]', tag: 'text-[11px] sm:text-xs' },
    lg: { title: 'text-lg sm:text-xl md:text-2xl', badge: 'text-[10px] sm:text-[11px]', tag: 'text-xs sm:text-sm' },
    xl: { title: 'text-xl sm:text-2xl md:text-3xl', badge: 'text-xs', tag: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none min-w-0 ${className}`}>
      {/* Custom Vector Brand Mark */}
      <div
        className={`${iconDimensions} rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#16834A] via-[#105C38] to-[#0D4E2F] p-0.5 shadow-sm shadow-[#16834A]/25 flex items-center justify-center relative shrink-0 transition-transform duration-200 hover:scale-105`}
        aria-label="FormSaathi AI Logo"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Document Sheet with folded corner */}
          <path
            d="M10 8C10 6.89543 10.8954 6 12 6H24L30 12V32C30 33.1046 29.1046 34 28 34H12C10.8954 34 10 33.1046 10 32V8Z"
            fill="white"
            fillOpacity="0.96"
          />
          {/* Document folded corner flap */}
          <path
            d="M24 6V11C24 11.5523 24.4477 12 25 12H30L24 6Z"
            fill="#D1E7D7"
          />

          {/* Form field lines */}
          <line
            x1="14"
            y1="16"
            x2="22"
            y2="16"
            stroke="#105C38"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="20.5"
            x2="26"
            y2="20.5"
            stroke="#68756C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />
          <line
            x1="14"
            y1="24.5"
            x2="20"
            y2="24.5"
            stroke="#68756C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.7"
          />

          {/* AI Sparkle / Intelligent Beacon at Top Right */}
          <circle cx="28" cy="7.5" r="3" fill="#22C55E" />
          <path
            d="M28 4.5V10.5M25 7.5H31"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Bold Verification Checkmark Shield on bottom right */}
          <circle cx="25" cy="27" r="6" fill="#16834A" />
          <path
            d="M22.5 27L24.2 28.7L27.5 25.2"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col text-left leading-tight min-w-0">
          <div className="flex items-center gap-1.5 flex-nowrap">
            <span className={`${textSizes.title} font-extrabold tracking-tight text-[#17231C] whitespace-nowrap`}>
              FormSaathi <span className="text-[#16834A]">AI</span>
            </span>
          </div>
          {tagline && (
            <p className={`hidden sm:block ${textSizes.tag} text-[#68756C] font-medium truncate max-w-[200px] sm:max-w-[320px] mt-0.5`}>
              {tagline}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
