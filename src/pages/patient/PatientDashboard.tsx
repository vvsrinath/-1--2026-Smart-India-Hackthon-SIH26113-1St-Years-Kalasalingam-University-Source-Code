import React from 'react';
import {
  CalendarDaysIcon,
  FolderOpenIcon,
  HeartPulseIcon,
  RepeatIcon } from
'lucide-react';
import { Panel } from '../../components/common/Panel';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Timeline } from '../../components/common/Timeline';
import { ActivityList } from '../../components/dashboard/ActivityList';
import { Button } from '../../components/common/Button';
import { currentPatient } from '../../data/demoPatients';
import { patientAppointments } from '../../data/demoAppointments';
import { patientReferrals } from '../../data/demoReferrals';
import { careJourney, demoRecords, recentActivity, demoFollowUps } from '../../data/demoRecords';

export function PatientDashboard() {
  const nextAppointment = patientAppointments.find(
    (appointment) => appointment.status === 'Upcoming'
  );
  const pendingReferrals = patientReferrals.filter(
    (referral) => referral.status !== 'Completed'
  ).length;
  const upcomingFollowUps = demoFollowUps.filter(
    (item) => item.status === 'Upcoming'
  ).length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Hello, {currentPatient.name} 👋
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          Here is an overview of your care journey.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarDaysIcon}
          label="Upcoming Appointment"
          badge={nextAppointment && <StatusBadge status="Upcoming" />}
          linkLabel="Manage"
          linkTo="/patient/appointments">
          
          {nextAppointment ?
          <div>
              <p className="text-xs font-semibold text-navy">
                {nextAppointment.date} · {nextAppointment.time}
              </p>
              <p className="mt-1 text-2xs text-ink-500">
                {nextAppointment.doctorName}
              </p>
              <p className="text-2xs text-ink-400">{nextAppointment.facility}</p>
            </div> :

          <p className="text-2xs text-ink-500">No appointment scheduled.</p>
          }
        </StatCard>

        <StatCard
          icon={RepeatIcon}
          label="Referrals"
          value={String(pendingReferrals).padStart(2, '0')}
          caption="Active referrals"
          linkLabel="View"
          linkTo="/patient/referrals" />
        

        <StatCard
          icon={FolderOpenIcon}
          label="Health Records"
          value={String(demoRecords.length).padStart(2, '0')}
          caption="Reports available"
          linkLabel="View"
          linkTo="/patient/records"
          tone="info" />
        

        <StatCard
          icon={HeartPulseIcon}
          label="Follow-ups"
          value={String(upcomingFollowUps).padStart(2, '0')}
          caption="Scheduled this month"
          linkLabel="View"
          linkTo="/patient/follow-up" />
        
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <Panel
          title="Your Care Journey"
          subtitle="Where you are in the current care request.">
          
          <Timeline steps={careJourney} className="mt-1" />
          <div className="mt-5 rounded-card border border-line bg-brand-tint2 px-3 py-2.5">
            <p className="text-2xs font-medium text-navy">Current step</p>
            <p className="mt-0.5 text-2xs text-ink-500">
              {careJourney.find((step) => step.status === 'In Progress')?.detail ??
              'All steps are up to date.'}
            </p>
          </div>
        </Panel>

        <Panel title="Recent Activity" linkLabel="View All" linkTo="/patient/records">
          <ActivityList items={recentActivity} />
        </Panel>
      </div>

      <div className="flex items-center justify-between rounded-card border border-line bg-white px-4 py-3">
        <p className="text-2xs text-ink-500">
          Looking for care nearby? Search facilities on the healthcare map.
        </p>
        <Button variant="secondary" to="/patient/find-healthcare">
          Find healthcare
        </Button>
      </div>
    </div>);

}