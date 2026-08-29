import React from 'react';
import { CalendarDaysIcon, HeartPulseIcon, RepeatIcon } from 'lucide-react';
import { Panel } from '../../components/common/Panel';
import { StatCard } from '../../components/dashboard/StatCard';
import { AppointmentCard } from '../../components/healthcare/AppointmentCard';
import { ReferralCard } from '../../components/healthcare/ReferralCard';
import { Button } from '../../components/common/Button';
import { currentSpecialist } from '../../data/demoSpecialists';
import { specialistSchedule } from '../../data/demoAppointments';
import { receivedReferrals } from '../../data/demoReferrals';

export function SpecialistDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Welcome, {currentSpecialist.name} 👋
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">Here is your overview.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={CalendarDaysIcon}
          label="Today's Appointments"
          value={String(specialistSchedule.length).padStart(2, '0')}
          caption="Referred consultations"
          linkLabel="View"
          linkTo="/specialist/appointments" />
        
        <StatCard
          icon={RepeatIcon}
          label="New Referrals"
          value="06"
          caption="Awaiting your review"
          linkLabel="View"
          linkTo="/specialist/referrals"
          tone="info" />
        
        <StatCard
          icon={HeartPulseIcon}
          label="Follow-ups"
          value="04"
          caption="Due in the next 7 days" />
        
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <Panel
          title="Upcoming Appointments"
          subtitle="21 May 2024 · Life Care Hospital"
          linkLabel="View Calendar"
          linkTo="/specialist/appointments"
          footer={
          <Button variant="ghost" size="sm" to="/specialist/appointments">
              View full day
            </Button>
          }>
          
          <div className="space-y-2">
            {specialistSchedule.map((appointment) =>
            <AppointmentCard key={appointment.id} appointment={appointment} />
            )}
          </div>
        </Panel>

        <Panel
          title="Recent Referrals"
          linkLabel="View All"
          linkTo="/specialist/referrals">
          
          <div className="space-y-2">
            {receivedReferrals.map((referral) =>
            <ReferralCard key={referral.id} referral={referral} />
            )}
          </div>
        </Panel>
      </div>
    </div>);

}