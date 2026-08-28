import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

interface ButtonProps extends
  BaseProps,
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  to?: undefined;
}

interface LinkProps extends BaseProps {
  to: string;
}

const variants: Record<Variant, string> = {
  primary:
  'bg-brand text-white border border-brand hover:bg-brand-dark hover:border-brand-dark',
  secondary:
  'bg-white text-navy border border-line hover:bg-brand-tint2 hover:border-brand/30',
  ghost: 'bg-transparent text-ink-500 border border-transparent hover:text-navy hover:bg-line-soft',
  danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
};

const sizes: Record<Size, string> = {
  sm: 'h-7 px-2.5 text-2xs gap-1.5',
  md: 'h-8 px-3.5 text-xs gap-1.5',
  lg: 'h-10 px-5 text-sm gap-2'
};

function classesFor({ variant = 'primary', size = 'md', fullWidth, className }: BaseProps) {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-chip font-medium',
    'transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-1',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );
}

export function Button(props: ButtonProps | LinkProps) {
  const { variant, size, className, children, fullWidth } = props;
  const classes = classesFor({ variant, size, className, children, fullWidth });

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>);

  }

  const { to: _to, variant: _v, size: _s, className: _c, fullWidth: _f, ...rest } =
  props as ButtonProps;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>);

}