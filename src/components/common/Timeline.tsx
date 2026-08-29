import React from 'react';
import { CheckIcon, ClockIcon, CircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { JourneyStep } from '../../types';

interface TimelineProps {
  steps: JourneyStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const statusStyles = {
  Completed: {
    node: 'bg-brand-tint text-brand border-brand/25',
    label: 'text-navy',
    caption: 'text-brand',
    connector: 'bg-brand/35'
  },
  'In Progress': {
    node: 'bg-warn-tint text-warn border-warn/25',
    label: 'text-navy',
    caption: 'text-warn',
    connector: 'bg-line'
  },
  Upcoming: {
    node: 'bg-white text-ink-400 border-line',
    label: 'text-ink-500',
    caption: 'text-ink-400',
    connector: 'bg-line'
  }
} as const;

function StatusIcon({ status }: {status: JourneyStep['status'];}) {
  if (status === 'Completed') return <CheckIcon className="h-3.5 w-3.5" />;
  if (status === 'In Progress') return <ClockIcon className="h-3.5 w-3.5" />;
  return <CircleIcon className="h-3 w-3" />;
}

export function Timeline({
  steps,
  orientation = 'horizontal',
  className
}: TimelineProps) {
  if (orientation === 'vertical') {
    return (
      <ol className={cn('space-y-0', className)}>
        {steps.map((step, index) => {
          const styles = statusStyles[step.status];
          const isLast = index === steps.length - 1;
          return (
            <li key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full border',
                    styles.node
                  )}>
                  
                  <StatusIcon status={step.status} />
                </span>
                {!isLast && <span className={cn('w-px flex-1', styles.connector)} />}
              </div>
              <div className={cn('pb-5', isLast && 'pb-0')}>
                <p className={cn('text-xs font-medium', styles.label)}>{step.label}</p>
                <p className="mt-0.5 text-2xs text-ink-500">{step.detail}</p>
                <p className={cn('mt-1 text-2xs font-medium', styles.caption)}>
                  {step.status}
                </p>
              </div>
            </li>);

        })}
      </ol>);

  }

  return (
    <ol className={cn('ss-scroll flex min-w-0 items-start overflow-x-auto', className)}>
      {steps.map((step, index) => {
        const styles = statusStyles[step.status];
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className="flex flex-1 items-start">
            <div className="flex min-w-0 flex-col items-start">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-[6px] border',
                  styles.node
                )}
                title={step.detail}>
                
                <StatusIcon status={step.status} />
              </span>
              <p className={cn('mt-2 text-2xs font-medium', styles.label)}>
                {step.label}
              </p>
              <p className={cn('mt-0.5 text-2xs', styles.caption)}>{step.status}</p>
            </div>
            {!isLast &&
            <span
              aria-hidden="true"
              className={cn('mx-2 mt-4 h-px flex-1', styles.connector)} />

            }
          </li>);

      })}
    </ol>);

}