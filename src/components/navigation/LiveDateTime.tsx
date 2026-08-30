import { CalendarIcon, ClockIcon } from 'lucide-react';
import { useDateTime } from '../../hooks/useDateTime';
import { cn } from '../../utils/cn';

interface LiveDateTimeProps {
  className?: string;
}

/** Live date + time read from the device clock, so it always works offline. */
export function LiveDateTime({ className }: LiveDateTimeProps) {
  const now = useDateTime(1000);

  const date = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(now);

  const time = new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  return (
    <div className={cn('flex items-center gap-3', className)} aria-label="Current date and time">
      <span className="hidden items-center gap-1.5 text-2xs text-ink-500 min-[1100px]:flex">
        <CalendarIcon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        {date}
      </span>
      <span className="inline-flex items-center gap-1.5 text-2xs font-medium tabular-nums text-navy">
        <ClockIcon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        <span className="relative">
          {time}
          <span
            className="absolute -right-1.5 top-1/2 h-1 w-1 -translate-y-1/2 translate-x-full animate-pulse rounded-full bg-brand"
            aria-hidden="true"
          />
        </span>
      </span>
    </div>
  );
}