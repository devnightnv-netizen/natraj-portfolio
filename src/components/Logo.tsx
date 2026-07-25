import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-8 h-8 text-[13px]',
    lg: 'w-16 h-16 text-lg'
  };

  const selectedClass = sizeClasses[size] || sizeClasses.md;
  const dimensions = selectedClass.split(' ')[0] + ' ' + selectedClass.split(' ')[1];
  const textSize = selectedClass.split(' ')[2] || 'text-[13px]';

  return (
    <div className={`${dimensions} rounded-full bg-gradient-to-tr from-[#4F8CFF] via-[#7C4DFF] to-[#00D4FF] flex items-center justify-center p-[2px] shadow-sm relative overflow-hidden`}>
      <div className={`w-full h-full rounded-full bg-white flex items-center justify-center ${textSize} font-extrabold text-slate-800 font-display`}>
        NV
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 animate-shimmer" />
    </div>
  );
}
