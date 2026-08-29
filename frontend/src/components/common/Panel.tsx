import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  /** Renders a small "View All" style link on the right of the header. */
  linkLabel?: string;
  linkTo?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  footer?: React.ReactNode;
}

/** The shared hairline card surface used by every screen. */
export function Panel({
  title,
  subtitle,
  action,
  linkLabel,
  linkTo,
  children,
  className,
  bodyClassName,
  footer
}: PanelProps) {
  const hasHeader = Boolean(title || action || linkLabel);

  return (
    <section
      className={cn(
        'flex min-w-0 flex-col rounded-card border border-line bg-white shadow-card',
        className
      )}>
      
      {hasHeader &&
      <header className="flex items-center justify-between gap-4 px-4 pb-3 pt-3.5">
          <div className="min-w-0">
            {title &&
          <h2 className="truncate text-[13px] font-semibold text-navy">{title}</h2>
          }
            {subtitle &&
          <p className="mt-0.5 truncate text-2xs text-ink-500">{subtitle}</p>
          }
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {action}
            {linkLabel && linkTo &&
          <Link
            to={linkTo}
            className="text-2xs font-medium text-brand transition-colors duration-150 ease-out hover:text-brand-dark">
            
                {linkLabel}
              </Link>
          }
          </div>
        </header>
      }
      <div className={cn('flex-1', hasHeader ? 'px-4 pb-4' : 'p-4', bodyClassName)}>
        {children}
      </div>
      {footer &&
      <div className="border-t border-line-soft px-4 py-2.5">{footer}</div>
      }
    </section>);

}