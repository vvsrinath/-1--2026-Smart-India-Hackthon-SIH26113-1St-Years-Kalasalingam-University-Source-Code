import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  xs: 'h-6 w-6 text-[9px]',
  sm: 'h-7 w-7 text-2xs',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm'
};

function initials(name: string) {
  return name.
  replace(/^Dr\.?\s+/i, '').
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase()).
  join('');
}

export function Avatar({ name, src, size = 'sm', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'shrink-0 rounded-full border border-line object-cover',
          sizes[size],
          className
        )} />);


  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-brand-tint font-semibold text-brand',
        sizes[size],
        className
      )}>
      
      {initials(name)}
    </span>);

}