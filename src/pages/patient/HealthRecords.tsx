import React, { useMemo, useState } from 'react';
import { Tabs } from '../../components/common/Tabs';
import { Panel } from '../../components/common/Panel';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { HealthRecordCard } from '../../components/healthcare/HealthRecordCard';
import { demoRecords, recordTabs } from '../../data/demoRecords';
import type { HealthRecord } from '../../types';

export function HealthRecords() {
  const [tab, setTab] = useState(recordTabs[0]);
  const [openRecord, setOpenRecord] = useState<HealthRecord | null>(null);

  const records = useMemo(() => {
    if (tab === 'All Records') return demoRecords;
    return demoRecords.filter((record) => record.category === tab);
  }, [tab]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
            Health Records
          </h1>
          <p className="mt-0.5 text-2xs text-ink-500">
            Reports, prescriptions and immunization entries in one place.
          </p>
        </div>
        <Tabs tabs={recordTabs} active={tab} onChange={setTab} />
      </div>

      <Panel>
        {records.length === 0 ?
        <EmptyState
          title={`No ${tab.toLowerCase()} yet`}
          description="Records added by your doctor or diagnostic centre will appear here." /> :


        <div className="space-y-2">
            {records.map((record) =>
          <HealthRecordCard
            key={record.id}
            record={record}
            onView={setOpenRecord} />

          )}
          </div>
        }
      </Panel>

      <p className="text-2xs text-ink-400">
        All records shown are demonstration entries and do not belong to a real
        person.
      </p>

      <Modal
        open={Boolean(openRecord)}
        onClose={() => setOpenRecord(null)}
        title={openRecord?.title ?? ''}
        description={
        openRecord ? `${openRecord.date} · ${openRecord.provider}` : undefined
        }
        footer={
        <Button variant="secondary" onClick={() => setOpenRecord(null)}>
            Close
          </Button>
        }>
        
        <p className="leading-5">
          Document preview is not part of this prototype. In a full build, the report
          file would open here with options to download or share it with a doctor.
        </p>
      </Modal>
    </div>);

}