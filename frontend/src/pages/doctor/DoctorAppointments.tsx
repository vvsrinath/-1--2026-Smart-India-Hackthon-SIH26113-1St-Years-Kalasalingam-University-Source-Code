import React, { useMemo, useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { Tabs } from '../../components/common/Tabs';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { AppointmentCard } from '../../components/healthcare/AppointmentCard';
import { doctorSchedule } from '../../data/demoAppointments';

const tabs = ['All', 'Upcoming', 'Consulting', 'Completed'];

export function DoctorAppointments() {
  const [tab, setTab] = useState(tabs[0]);

  const appointments = useMemo(() => {
    if (tab === 'All') return doctorSchedule;
    return doctorSchedule.filter((appointment) => appointment.status === tab);
  }, [tab]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
            Appointments
          </h1>
          <p className="mt-0.5 text-2xs text-ink-500">
            20 May 2024 · City Health Center · demo schedule
          </p>
        </div>
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <Panel>
        {appointments.length === 0 ?
        <EmptyState
          title={`No ${tab.toLowerCase()} appointments`}
          description="Appointments matching this status will appear here." /> :


        <div className="space-y-2">
            {appointments.map((appointment) =>
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            action={
            <Button
              variant="secondary"
              size="sm"
              to={`/doctor/patients/${appointment.patientId}`}>
              
                    Open consultation
                  </Button>
            } />

          )}
          </div>
        }
      </Panel>
    </div>);

}