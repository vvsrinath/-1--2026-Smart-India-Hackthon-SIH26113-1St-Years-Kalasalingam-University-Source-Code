import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";
import { type LucideIcon } from "lucide-react";
interface HealthcareCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to?: string;
  tone?: 'brand' | 'info';
  className?: string;
}

/** Compact icon + title + description card used by quick actions and services. */
export function HealthcareCard({
  icon: Icon,
  title,
  description,
  to,
  tone = 'brand',
  className
}: HealthcareCardProps) {
  const content = <>
      <span className={cn('flex h-7 w-7 items-center justify-center rounded-[6px]', tone === 'info' ? 'bg-info-tint text-info' : 'bg-brand-tint text-brand')}>
        <Icon className="h-[15px] w-[15px]" />
      </span>
      <span className="mt-3 block text-xs font-semibold text-navy">{title}</span>
      <span className="mt-1 block text-2xs leading-[17px] text-ink-500">
        {description}
      </span>
    </>;
  const base = cn('block h-full rounded-card border border-line bg-white p-3.5 shadow-card', className);
  if (to) {
    return <Link to={to} className={cn(base, 'transition-colors duration-150 ease-out hover:border-brand/30 hover:bg-brand-tint2')}>
        {content}
      </Link>;
  }
  return <div className={base}>{content}</div>;
}