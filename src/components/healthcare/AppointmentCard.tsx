import React from 'react';
import { MapPinIcon, VideoIcon } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';
import { cn } from '../../utils/cn';
import type { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  /** 'patient' shows who is being seen; 'doctor' shows the practitioner. */
  perspective?: 'patient' | 'doctor';
  showTimeRail?: boolean;
  className?: string;
  action?: React.ReactNode;
}

export function AppointmentCard({
  appointment,
  perspective = 'doctor',
  showTimeRail = true,
  className,
  action
}: AppointmentCardProps) {
  const primary =
  perspective === 'doctor' ? appointment.patientName : appointment.doctorName;
  const secondary =
  perspective === 'doctor' ?
  appointment.reason :
  `${appointment.reason} · ${appointment.facility}`;

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5',
        className
      )}>
      
      {showTimeRail &&
      <span className="w-[68px] shrink-0 text-2xs font-medium text-navy">
          {appointment.time}
        </span>
      }
      <Avatar name={primary} size="sm" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-navy">{primary}</span>
        <span className="mt-0.5 flex items-center gap-1 truncate text-2xs text-ink-500">
          {appointment.mode === 'Online' ?
          <VideoIcon className="h-3 w-3 shrink-0 text-ink-400" /> :

          <MapPinIcon className="h-3 w-3 shrink-0 text-ink-400" />
          }
          <span className="truncate">{secondary}</span>
        </span>
      </span>
      {action ?? <StatusBadge status={appointment.status} />}
    </div>);

}