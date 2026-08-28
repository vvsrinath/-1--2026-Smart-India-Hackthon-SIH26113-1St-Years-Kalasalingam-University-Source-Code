import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingStateProps {
  rows?: number;
  label?: string;
  className?: string;
}

export function LoadingState({
  rows = 3,
  label = 'Loading',
  className
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn('space-y-2', className)}>
      
      {Array.from({ length: rows }).map((_, index) =>
      <div
        key={index}
        className="flex items-center gap-3 rounded-card border border-line bg-white px-3 py-3">
        
          <span className="h-7 w-7 shrink-0 animate-pulse rounded-[4px] bg-line-soft" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-2.5 w-1/3 animate-pulse rounded-full bg-line-soft" />
            <span className="block h-2 w-1/2 animate-pulse rounded-full bg-line-soft" />
          </span>
        </div>
      )}
      <span className="sr-only">{label}</span>
    </div>);

}