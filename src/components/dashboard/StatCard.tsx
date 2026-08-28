import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { BoxIcon } from "lucide-react";
interface StatCardProps {
  icon: BoxIcon;
  label: string;
  value?: string;
  caption?: string;
  linkLabel?: string;
  linkTo?: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  tone?: 'brand' | 'info';
  className?: string;
}
export function StatCard({
  icon: Icon,
  label,
  value,
  caption,
  linkLabel,
  linkTo,
  badge,
  children,
  tone = 'brand',
  className
}: StatCardProps) {
  return <div className={cn('flex h-full flex-col rounded-card border border-line bg-white p-3.5 shadow-card', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <span className={cn('flex h-6 w-6 items-center justify-center rounded-[5px]', tone === 'info' ? 'bg-info-tint text-info' : 'bg-brand-tint text-brand')}>
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="text-2xs font-medium text-ink-500">{label}</span>
        </span>
        {badge}
      </div>

      {value && <p className="mt-3 text-2xl font-semibold leading-none tracking-[-0.02em] text-navy">
          {value}
        </p>}
      {children && <div className="mt-2.5">{children}</div>}

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        {caption ? <p className="text-2xs text-ink-400">{caption}</p> : <span />}
        {linkLabel && linkTo && <Link to={linkTo} className="shrink-0 rounded-[4px] border border-line px-2 py-0.5 text-2xs font-medium text-ink-500 transition-colors duration-150 ease-out hover:border-brand/30 hover:text-brand">
            {linkLabel}
          </Link>}
      </div>
    </div>;
}