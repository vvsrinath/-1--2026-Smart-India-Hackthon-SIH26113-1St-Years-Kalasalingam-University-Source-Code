import { Panel } from '../../components/common/Panel';
import { AppointmentCard } from '../../components/healthcare/AppointmentCard';
import { specialistSchedule } from '../../data/demoAppointments';

export function SpecialistAppointments() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Appointments
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          21 May 2024 · Life Care Hospital · demo schedule
        </p>
      </div>

      <Panel>
        <div className="space-y-2">
          {specialistSchedule.map((appointment) =>
          <AppointmentCard key={appointment.id} appointment={appointment} />
          )}
        </div>
      </Panel>
    </div>);

}