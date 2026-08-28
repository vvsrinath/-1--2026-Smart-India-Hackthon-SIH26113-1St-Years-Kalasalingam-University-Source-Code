import React from 'react';
import {
  CalendarDaysIcon,
  HeartPulseIcon,
  RepeatIcon,
  UserPlusIcon } from
'lucide-react';
import { Panel } from '../../components/common/Panel';
import { StatCard } from '../../components/dashboard/StatCard';
import { AppointmentCard } from '../../components/healthcare/AppointmentCard';
import { ReferralCard } from '../../components/healthcare/ReferralCard';
import { Button } from '../../components/common/Button';
import { currentDoctor } from '../../data/demoDoctors';
import { doctorSchedule } from '../../data/demoAppointments';
import { sentReferrals } from '../../data/demoReferrals';

export function DoctorDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Welcome, {currentDoctor.name} 👋
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          Here is your practice overview for today.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarDaysIcon}
          label="Today's Appointments"
          value="12"
          caption="5 completed · 7 remaining"
          linkLabel="View"
          linkTo="/doctor/appointments" />
        
        <StatCard
          icon={UserPlusIcon}
          label="New Patients"
          value="08"
          caption="Registered this week"
          linkLabel="View"
          linkTo="/doctor/patients"
          tone="info" />
        
        <StatCard
          icon={HeartPulseIcon}
          label="Follow-ups"
          value="05"
          caption="Due in the next 7 days" />
        
        <StatCard
          icon={RepeatIcon}
          label="Referrals"
          value="03"
          caption="Awaiting specialist response"
          linkLabel="View"
          linkTo="/doctor/referrals" />
        
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <Panel
          title="Today's Schedule"
          subtitle="20 May 2024 · City Health Center"
          linkLabel="View All"
          linkTo="/doctor/appointments"
          footer={
          <Button variant="ghost" size="sm" to="/doctor/appointments">
              View full day
            </Button>
          }>
          
          <div className="space-y-2">
            {doctorSchedule.map((appointment) =>
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              action={
              <Button
                variant="secondary"
                size="sm"
                to={`/doctor/patients/${appointment.patientId}`}>
                
                    Open
                  </Button>
              } />

            )}
          </div>
        </Panel>

        <Panel
          title="Recent Referrals"
          linkLabel="View All"
          linkTo="/doctor/referrals">
          
          <div className="space-y-2">
            {sentReferrals.slice(0, 4).map((referral) =>
            <ReferralCard key={referral.id} referral={referral} />
            )}
          </div>
        </Panel>
      </div>
    </div>);

}