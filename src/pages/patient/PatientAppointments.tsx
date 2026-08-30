import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { Panel } from '../../components/common/Panel';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Rating } from '../../components/common/Rating';
import { AppointmentCard } from '../../components/healthcare/AppointmentCard';
import { cn } from '../../utils/cn';
import { currentDoctor } from '../../data/demoDoctors';
import {
  bookingDates,
  bookingSlots,
  patientAppointments } from
'../../data/demoAppointments';

const steps = ['Select Doctor', 'Select Date & Time', 'Confirm'];

export function PatientAppointments() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('20');
  const [slot, setSlot] = useState('10:30 AM');

  const selectedDate = bookingDates.find((item) => item.day === date);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Book an Appointment
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          Choose a doctor, pick a time and confirm. Demo booking only.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Panel className="overflow-hidden" bodyClassName="p-0">
          {/* Step indicator */}
           <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line-soft px-4 py-3">
            {steps.map((label, index) => {
              const position = index + 1;
              const isActive = position === step;
              const isDone = position < step;
              return (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold',
                      isDone ?
                      'bg-brand text-white' :
                      isActive ?
                      'bg-brand-tint text-brand' :
                      'bg-line-soft text-ink-400'
                    )}>
                    
                    {isDone ? <CheckIcon className="h-3 w-3" /> : position}
                  </span>
                  <span
                    className={cn(
                      'text-2xs',
                      isActive ? 'font-medium text-brand' : 'text-ink-500'
                    )}>
                    
                    {label}
                  </span>
                </li>);

            })}
          </ol>

          <div className="px-4 py-4">
            {/* Doctor */}
            <div className="flex items-start gap-3 rounded-card border border-line bg-brand-tint2 p-3">
              <Avatar name={currentDoctor.name} src={currentDoctor.photo} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-navy">
                  {currentDoctor.name}
                </p>
                <p className="mt-0.5 text-2xs text-ink-500">
                  {currentDoctor.specialization}
                </p>
                <p className="text-2xs text-ink-500">{currentDoctor.qualifications}</p>
                <p className="text-2xs text-ink-400">{currentDoctor.hospital}</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <Rating
                    value={currentDoctor.rating}
                    reviews={currentDoctor.reviews} />
                  
                  <span className="text-2xs text-ink-400">
                    {currentDoctor.experienceYears} yrs experience
                  </span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-2xs font-medium text-ink-500">Select Date</p>
                <p className="text-2xs text-ink-400">May 2024</p>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1.5">
                {bookingDates.map((item) => {
                  const isActive = item.day === date;
                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => {
                        setDate(item.day);
                        setStep(2);
                      }}
                      aria-pressed={isActive}
                      className={cn(
                        'flex flex-col items-center rounded-chip border py-2 transition-colors duration-150 ease-out',
                        isActive ?
                        'border-brand bg-brand text-white' :
                        'border-line bg-white text-navy hover:border-brand/30 hover:bg-brand-tint2'
                      )}>
                      
                      <span className="text-xs font-semibold">{item.day}</span>
                      <span
                        className={cn(
                          'text-[10px]',
                          isActive ? 'text-white/80' : 'text-ink-400'
                        )}>
                        
                        {item.weekday}
                      </span>
                    </button>);

                })}
              </div>
            </div>

            {/* Time */}
            <div className="mt-5">
              <p className="text-2xs font-medium text-ink-500">Select Time</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                {bookingSlots.map((item) => {
                  const isActive = item === slot;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setSlot(item);
                        setStep(2);
                      }}
                      aria-pressed={isActive}
                      className={cn(
                        'rounded-chip border py-2 text-2xs font-medium transition-colors duration-150 ease-out',
                        isActive ?
                        'border-brand bg-brand text-white' :
                        'border-line bg-white text-navy hover:border-brand/30 hover:bg-brand-tint2'
                      )}>
                      
                      {item}
                    </button>);

                })}
              </div>
            </div>

            <div className="mt-5">
              {step < 3 ?
              <Button size="lg" fullWidth onClick={() => setStep(3)}>
                  Continue
                </Button> :

              <div className="rounded-card border border-brand/30 bg-brand-tint px-3 py-3">
                  <p className="text-xs font-semibold text-brand">
                    Appointment ready to confirm
                  </p>
                  <p className="mt-1 text-2xs text-navy">
                    {currentDoctor.name} · {selectedDate?.day} May 2024 ·{' '}
                    {selectedDate?.weekday} · {slot}
                  </p>
                  <p className="mt-1 text-2xs text-ink-500">
                    This is a demo flow — no booking is actually created.
                  </p>
                  <Button
                  className="mt-3"
                  variant="secondary"
                  onClick={() => setStep(2)}>
                  
                    Change time
                  </Button>
                </div>
              }
            </div>
          </div>
        </Panel>

        <Panel
          title="Your Appointments"
          subtitle="Upcoming and past demo appointments.">
          
          <div className="space-y-2">
            {patientAppointments.map((appointment) =>
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              perspective="patient"
              showTimeRail={false} />

            )}
          </div>
        </Panel>
      </div>
    </div>);

}