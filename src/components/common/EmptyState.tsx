import React from 'react';
import { InboxIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white px-6 py-12 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-line-soft text-ink-400">
        {icon ?? <InboxIcon className="h-4 w-4" />}
      </span>
      <p className="mt-3 text-xs font-semibold text-navy">{title}</p>
      {description &&
      <p className="mt-1 max-w-sm text-2xs leading-5 text-ink-500">{description}</p>
      }
      {action && <div className="mt-4">{action}</div>}
    </div>);

}