import { cn } from '../../utils/cn';

type Tone = 'pending' | 'success' | 'info' | 'neutral' | 'danger';

const toneFor: Record<string, Tone> = {
  Pending: 'pending',
  'In Progress': 'pending',
  Accepted: 'success',
  Completed: 'success',
  Available: 'success',
  Open: 'success',
  Upcoming: 'info',
  Consulting: 'info',
  Online: 'info',
  Declined: 'danger',
  Cancelled: 'danger',
  Closed: 'neutral'
};

const tones: Record<Tone, string> = {
  pending: 'bg-warn-tint text-warn',
  success: 'bg-brand-tint text-brand',
  info: 'bg-info-tint text-info',
  neutral: 'bg-line-soft text-ink-500',
  danger: 'bg-red-50 text-red-600'
};

interface StatusBadgeProps {
  status: string;
  tone?: Tone;
  className?: string;
}

export function StatusBadge({ status, tone, className }: StatusBadgeProps) {
  const resolved = tone ?? toneFor[status] ?? 'neutral';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[4px] px-2 py-0.5 text-2xs font-medium leading-4',
        tones[resolved],
        className
      )}>
      
      {status}
    </span>);

}