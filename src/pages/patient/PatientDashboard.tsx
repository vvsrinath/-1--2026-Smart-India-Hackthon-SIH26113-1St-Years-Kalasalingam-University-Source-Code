import {
  CalendarDaysIcon,
  ChevronRightIcon,
  FolderOpenIcon,
  HeartPulseIcon,
  MapPinIcon,
  RepeatIcon,
  StethoscopeIcon,
  PillIcon,
  BellRingIcon,
  ActivityIcon
} from 'lucide-react';
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
import { useLanguage } from '../../context/LanguageContext';

const quickActions = [
  { label: 'Find Healthcare', to: '/patient/find-healthcare', icon: MapPinIcon, accent: 'bg-emerald-50 text-emerald-700' },
  { label: 'Talk to Doctor', to: '/patient/consult-online', icon: StethoscopeIcon, accent: 'bg-sky-50 text-sky-700' },
  { label: 'My Appointments', to: '/patient/appointments', icon: CalendarDaysIcon, accent: 'bg-amber-50 text-amber-700' },
  { label: 'Track Referral', to: '/patient/referrals', icon: RepeatIcon, accent: 'bg-violet-50 text-violet-700' },
  { label: 'Medicines', to: '/patient/medicines', icon: PillIcon, accent: 'bg-rose-50 text-rose-700' },
  { label: 'My Records', to: '/patient/records', icon: FolderOpenIcon, accent: 'bg-cyan-50 text-cyan-700' },
];

export function PatientDashboard() {
  const { t } = useLanguage();
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
    <div className="space-y-3 pb-24 md:pb-0">
      <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-tint2 via-white to-emerald-50 p-3 shadow-card sm:p-4 md:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.12em] text-brand">Swasthya Sathi</p>
            <h1 className="mt-1 truncate text-lg font-semibold tracking-[-0.02em] text-navy sm:text-xl md:text-2xl">
              {t('home.greeting')}
            </h1>
            <p className="mt-0.5 truncate text-sm font-semibold text-navy">{currentPatient.name}</p>
          </div>
          <div className="flex-shrink-0 rounded-full border border-line bg-white p-1.5 text-ink-500">
            <BellRingIcon className="h-4 w-4" />
          </div>
        </div>

        <p className="mt-3 text-xs font-medium text-navy sm:text-sm md:text-base">{t('home.question')}</p>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {quickActions.map(({ label, to, icon: Icon, accent }) => (
            <Button key={label} variant="secondary" to={to} className="h-auto w-full flex-col items-start justify-start rounded-xl border border-line bg-white px-2.5 py-2.5 text-left shadow-sm hover:border-brand/30 sm:rounded-2xl sm:px-3 sm:py-3">
              <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg sm:mb-3 sm:h-10 sm:w-10 sm:rounded-xl ${accent}`}>
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>
              <span className="text-xs font-medium text-navy sm:text-sm">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={CalendarDaysIcon}
          label="Upcoming Appointment"
          badge={nextAppointment && <StatusBadge status="Upcoming" />}
          linkLabel="Manage"
          linkTo="/patient/appointments">
          {nextAppointment ? (
            <div>
              <p className="text-xs font-semibold text-navy">
                {nextAppointment.date} · {nextAppointment.time}
              </p>
              <p className="mt-1 text-2xs text-ink-500">{nextAppointment.doctorName}</p>
              <p className="text-2xs text-ink-400">{nextAppointment.facility}</p>
            </div>
          ) : (
            <p className="text-2xs text-ink-500">No appointment scheduled.</p>
          )}
        </StatCard>

        <StatCard
          icon={RepeatIcon}
          label="Referrals"
          value={String(pendingReferrals).padStart(2, '0')}
          caption="Active referrals"
          linkLabel="View"
          linkTo="/patient/referrals"
        />

        <StatCard
          icon={FolderOpenIcon}
          label="Health Records"
          value={String(demoRecords.length).padStart(2, '0')}
          caption="Reports available"
          linkLabel="View"
          linkTo="/patient/records"
          tone="info"
        />

        <StatCard
          icon={HeartPulseIcon}
          label="Follow-ups"
          value={String(upcomingFollowUps).padStart(2, '0')}
          caption="Scheduled this month"
          linkLabel="View"
          linkTo="/patient/follow-up"
        />
      </div>

      <div className="grid gap-2 sm:gap-3 xl:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)]">
        <Panel title="Your Care Journey" subtitle="Where you are in the current care request.">
          <Timeline steps={careJourney} className="mt-1" />
          <div className="mt-5 rounded-card border border-line bg-brand-tint2 px-3 py-2.5">
            <p className="text-2xs font-medium text-navy">Current step</p>
            <p className="mt-0.5 text-2xs text-ink-500">
              {careJourney.find((step) => step.status === 'In Progress')?.detail ?? 'All steps are up to date.'}
            </p>
          </div>
        </Panel>

        <Panel title="Recent Activity" linkLabel="View All" linkTo="/patient/records">
          <ActivityList items={recentActivity} />
        </Panel>
      </div>

      <div className="rounded-lg border border-line bg-white p-2.5 shadow-card sm:rounded-card sm:p-3 md:flex md:items-center md:justify-between md:px-4 md:py-3">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 sm:h-10 sm:w-10 sm:rounded-xl">
            <ActivityIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-navy sm:text-sm">Referral status</p>
            <p className="text-2xs text-ink-500">Your specialist referral is being processed.</p>
          </div>
        </div>
        <Button variant="secondary" to="/patient/find-healthcare" className="mt-2 w-full text-xs sm:mt-3 sm:text-sm md:mt-0 md:w-auto">
          Find <ChevronRightIcon className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
