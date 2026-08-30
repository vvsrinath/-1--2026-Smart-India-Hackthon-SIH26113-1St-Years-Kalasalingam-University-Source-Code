import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export function Input({ label, hint, icon, className, id, ...rest }: InputProps) {
  const inputId = id ?? rest.name ?? label?.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="w-full">
      {label &&
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-2xs font-medium text-ink-500">
        
          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
            {icon}
          </span>
        }
        <input
          id={inputId}
          className={cn(
            'h-9 w-full rounded-chip border border-line bg-white text-xs text-navy placeholder:text-ink-400',
            'px-3 transition-colors duration-150 ease-out',
            'focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15',
            icon ? 'pl-9' : undefined,
            className
          )}
          {...rest} />
        
      </div>
      {hint && <p className="mt-1.5 text-2xs text-ink-400">{hint}</p>}
    </div>);

}