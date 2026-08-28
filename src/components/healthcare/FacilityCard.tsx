import React from 'react';
import { BuildingIcon } from 'lucide-react';
import { Rating } from '../common/Rating';
import { cn } from '../../utils/cn';
import type { Facility } from '../../types';

interface FacilityCardProps {
  facility: Facility;
  active?: boolean;
  onSelect?: (id: string) => void;
}

export function FacilityCard({ facility, active, onSelect }: FacilityCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(facility.id)}
      aria-pressed={active}
      className={cn(
        'flex w-full items-start gap-3 rounded-card border bg-white p-3 text-left',
        'transition-colors duration-150 ease-out hover:border-brand/30 hover:bg-brand-tint2',
        active ? 'border-brand/40 bg-brand-tint2' : 'border-line'
      )}>
      
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
        <BuildingIcon className="h-4 w-4" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-2">
          <span className="truncate text-xs font-semibold text-navy">
            {facility.name}
          </span>
          <Rating value={facility.rating} className="shrink-0" />
        </span>
        <span className="mt-0.5 block truncate text-2xs text-ink-500">
          {facility.distanceKm} km · {facility.type}
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-2xs">
          <span
            className={cn(
              'inline-flex items-center gap-1 font-medium',
              facility.isOpen ? 'text-brand' : 'text-ink-400'
            )}>
            
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                facility.isOpen ? 'bg-brand' : 'bg-ink-400'
              )} />
            
            {facility.isOpen ? 'Open' : 'Closed'}
          </span>
          <span className="text-ink-400">· Closes {facility.openUntil}</span>
        </span>
      </span>
    </button>);

}