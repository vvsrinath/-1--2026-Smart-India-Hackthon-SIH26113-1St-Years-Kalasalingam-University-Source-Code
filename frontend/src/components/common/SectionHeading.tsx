import React from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
  as = 'h2'
}: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Tag className="text-xl font-semibold tracking-[-0.01em] text-navy">{title}</Tag>
      {subtitle && <p className="mt-1.5 text-xs text-ink-500">{subtitle}</p>}
    </div>);

}