import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LogoProps {
  to?: string;
  size?: 'sm' | 'md';
  className?: string;
}

/** Swastya Sathi wordmark: leaf-and-pulse mark with the healthcare app subline. */
export function Logo({ to = '/', size = 'sm', className }: LogoProps) {
  const mark = (
    <img
      src="/swastya-sathi-mark.svg"
      alt=""
      className={cn('shrink-0', size === 'md' ? 'h-9 w-9' : 'h-7 w-7')}
      aria-hidden="true"
    />
  );


  const text =
  <span className="min-w-0">
      <span
      className={cn(
        'block truncate font-semibold leading-tight tracking-[-0.01em] text-brand',
        size === 'md' ? 'text-base' : 'text-[13px]'
      )}>
      
        Swastya Sathi
      </span>
      <span
      className={cn(
        'block truncate font-medium uppercase tracking-[0.14em] text-ink-400',
        size === 'md' ? 'text-[9px]' : 'text-[8px]'
      )}>
      
        Healthcare App
      </span>
    </span>;


  const content =
  <span className={cn('flex items-center gap-2', className)}>
      {mark}
      {text}
    </span>;


  if (!to) return content;

  return (
    <Link to={to} className="flex items-center" aria-label="Swastya Sathi home">
      {content}
    </Link>
  );
}