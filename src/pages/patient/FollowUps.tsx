import React from 'react';
import { BellRingIcon, CalendarCheckIcon } from 'lucide-react';
import { Panel } from '../../components/common/Panel';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { demoFollowUps } from '../../data/demoRecords';

export function FollowUps() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Follow-ups
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          Reminders for reviews and report check-ins after a consultation.
        </p>
      </div>

      <Panel title="Scheduled follow-ups" subtitle="Demo reminders.">
        <ul className="space-y-2">
          {demoFollowUps.map((item) =>
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5">
            
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
                {item.status === 'Completed' ?
              <CalendarCheckIcon className="h-4 w-4" /> :

              <BellRingIcon className="h-4 w-4" />
              }
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium text-navy">
                  {item.title}
                </span>
                <span className="block truncate text-2xs text-ink-500">
                  Due {item.due} · {item.with}
                </span>
              </span>
              <StatusBadge status={item.status} />
            </li>
          )}
        </ul>
      </Panel>

      <div className="flex items-center justify-between rounded-card border border-line bg-white px-4 py-3">
        <p className="text-2xs text-ink-500">
          Need to see a doctor sooner? Book an earlier appointment.
        </p>
        <Button variant="secondary" to="/patient/appointments">
          Book appointment
        </Button>
      </div>
    </div>);

}