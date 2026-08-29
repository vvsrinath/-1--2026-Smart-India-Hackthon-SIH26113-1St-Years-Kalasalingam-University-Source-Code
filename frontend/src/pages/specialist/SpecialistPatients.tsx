import React from 'react';
import { Panel } from '../../components/common/Panel';
import { Avatar } from '../../components/common/Avatar';
import { StatusBadge } from '../../components/common/StatusBadge';
import { receivedReferrals } from '../../data/demoReferrals';
import { getPatientById } from '../../data/demoPatients';

export function SpecialistPatients() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          Patients
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          Patients referred to you — demonstration list only.
        </p>
      </div>

      <Panel>
        <ul className="space-y-2">
          {receivedReferrals.map((referral) => {
            const patient = getPatientById(referral.patientId);
            return (
              <li
                key={referral.id}
                className="flex items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5">
                
                <Avatar name={referral.patientName} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium text-navy">
                    {referral.patientName}
                  </span>
                  <span className="block truncate text-2xs text-ink-500">
                    {patient ?
                    `${patient.gender} · ${patient.age} yrs · MRN ${patient.mrn}` :
                    referral.facility}
                  </span>
                </span>
                <span className="hidden text-2xs text-ink-400 sm:block">
                  {referral.date}
                </span>
                <StatusBadge status={referral.status} />
              </li>);

          })}
        </ul>
      </Panel>
    </div>);

}