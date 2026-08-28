import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DropdownOption {
  value: string;
  label: string;
  hint?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  menuClassName?: string;
  size?: 'sm' | 'md';
  ariaLabel?: string;
  footnote?: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select',
  icon,
  className,
  menuClassName,
  size = 'md',
  ariaLabel,
  footnote
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function onDocClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex w-full items-center justify-between gap-2 rounded-chip border border-line bg-white text-navy',
          'transition-colors duration-150 ease-out hover:border-brand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20',
          size === 'sm' ? 'h-7 px-2 text-2xs' : 'h-9 px-3 text-xs'
        )}>
        
        <span className="flex min-w-0 items-center gap-1.5">
          {icon}
          <span className={cn('truncate', !selected && 'text-ink-400')}>
            {selected?.label ?? placeholder}
          </span>
        </span>
        <ChevronDownIcon
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform duration-150 ease-out',
            open && 'rotate-180'
          )} />
        
      </button>

      {open &&
      <div
        role="listbox"
        className={cn(
          'ss-scroll absolute right-0 z-50 mt-1.5 max-h-64 w-full min-w-[200px] overflow-y-auto',
          'rounded-card border border-line bg-white py-1 shadow-pop',
          menuClassName
        )}>
        
          {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              role="option"
              aria-selected={isActive}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-xs transition-colors duration-150 ease-out',
                isActive ?
                'bg-brand-tint text-brand' :
                'text-navy hover:bg-line-soft'
              )}>
              
                <span className="truncate">{option.label}</span>
                {option.hint &&
              <span className="shrink-0 text-2xs text-ink-400">{option.hint}</span>
              }
              </button>);

        })}
          {footnote &&
        <p className="mt-1 border-t border-line-soft px-3 pb-1 pt-2 text-2xs leading-4 text-ink-400">
              {footnote}
            </p>
        }
        </div>
      }
    </div>);

}