import React from 'react';

interface Ri8ClickLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export const Ri8ClickLogo: React.FC<Ri8ClickLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  variant = 'dark',
  className = ''
}) => {
  const sizeMap = {
    xs: { img: 'h-5 w-auto', text: 'text-sm', sub: 'text-[8.5px]' },
    sm: { img: 'h-7 w-auto', text: 'text-base', sub: 'text-[9.5px]' },
    md: { img: 'h-9 w-auto', text: 'text-lg', sub: 'text-[10.5px]' },
    lg: { img: 'h-11 w-auto', text: 'text-xl', sub: 'text-xs' },
    xl: { img: 'h-14 w-auto', text: 'text-2xl', sub: 'text-xs' },
  };

  const current = sizeMap[size] || sizeMap.md;
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/logo-ri8click-no-bg-WF3rE.png"
        alt="ri8click logo"
        className={`${current.img} object-contain shrink-0`}
        onError={(e) => {
          // Fallback if image fails
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
      <div className="leading-none flex flex-col justify-center">
        <div className="flex items-center tracking-tight">
          <span className={`font-extrabold ${current.text} ${isLight ? 'text-white' : 'text-slate-900'}`}>
            ri<span className="text-amber-500">8</span>click
          </span>
          <span className="ml-1 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
            PRO
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-medium tracking-wide uppercase ${current.sub} ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            Real Estate & Group of Companies
          </span>
        )}
      </div>
    </div>
  );
};

export default Ri8ClickLogo;
