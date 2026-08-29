import React from 'react';
import {
  CalendarDaysIcon,
  FileTextIcon,
  HeartPulseIcon,
  RepeatIcon } from
'lucide-react';
import type { ActivityItem } from '../../types';

const iconFor = {
  appointment: CalendarDaysIcon,
  referral: RepeatIcon,
  record: FileTextIcon,
  followup: HeartPulseIcon
} as const;

export function ActivityList({ items }: {items: ActivityItem[];}) {
  return (
    <ul className="divide-y divide-line-soft">
      {items.map((item) => {
        const Icon = iconFor[item.kind];
        return (
          <li key={item.id} className="flex items-start gap-2.5 py-2.5 first:pt-0">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-brand-tint text-brand">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-2xs font-medium leading-4 text-navy">
                {item.title}
              </span>
              <span className="mt-0.5 block truncate text-2xs text-ink-500">
                {item.meta}
              </span>
              <span className="mt-0.5 block text-2xs text-ink-400">{item.date}</span>
            </span>
          </li>);

      })}
    </ul>);

}