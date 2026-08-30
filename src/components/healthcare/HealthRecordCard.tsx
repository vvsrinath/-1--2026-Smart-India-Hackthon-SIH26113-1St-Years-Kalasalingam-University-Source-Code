import {
  ActivityIcon,
  FlaskConicalIcon,
  ScanIcon,
  ShieldCheckIcon,
  PillIcon } from
'lucide-react';
import { Button } from '../common/Button';
import type { HealthRecord } from '../../types';

const iconFor = {
  'Lab Reports': FlaskConicalIcon,
  Imaging: ScanIcon,
  Prescriptions: PillIcon,
  Immunization: ShieldCheckIcon
} as const;

interface HealthRecordCardProps {
  record: HealthRecord;
  onView?: (record: HealthRecord) => void;
}

export function HealthRecordCard({ record, onView }: HealthRecordCardProps) {
  const Icon = iconFor[record.category] ?? ActivityIcon;

  return (
    <article className="flex items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-info-tint text-info">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-navy">{record.title}</p>
        <p className="mt-0.5 truncate text-2xs text-ink-500">
          {record.date} · {record.provider}
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={() => onView?.(record)}>
        View
      </Button>
    </article>);

}