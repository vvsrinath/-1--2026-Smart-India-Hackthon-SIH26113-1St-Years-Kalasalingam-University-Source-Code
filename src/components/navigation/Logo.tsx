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
      src="/logo.png"
      alt=""
      className={cn('shrink-0 object-contain', size === 'md' ? 'h-12 w-12' : 'h-9 w-9')}
      aria-hidden="true"
    />
  );


  const text =
  <span className="min-w-0">
      <span
      className={cn(
        'block truncate font-semibold leading-tight tracking-[-0.01em] text-brand',
        size === 'md' ? 'text-lg' : 'text-sm'
      )}>
      
        Swastya Sathi
      </span>
      <span
      className={cn(
        'block truncate font-medium uppercase tracking-[0.14em] text-ink-400',
        size === 'md' ? 'text-[10px]' : 'text-[9px]'
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