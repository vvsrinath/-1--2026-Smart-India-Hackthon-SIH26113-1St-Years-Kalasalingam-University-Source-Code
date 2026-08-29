import React from 'react';
import { SearchIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  action?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search',
  size = 'md',
  action,
  className,
  ariaLabel = 'Search'
}: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
      className={cn('flex items-center gap-2', className)}>
      
      <div className="relative flex-1">
        <SearchIcon
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400',
            size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'
          )} />
        
        <input
          type="search"
          aria-label={ariaLabel}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'w-full rounded-chip border border-line bg-white text-navy placeholder:text-ink-400',
            'transition-colors duration-150 ease-out focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15',
            size === 'lg' ? 'h-11 pl-9 pr-3 text-sm' : 'h-9 pl-9 pr-3 text-xs'
          )} />
        
      </div>
      {action}
    </form>);

}