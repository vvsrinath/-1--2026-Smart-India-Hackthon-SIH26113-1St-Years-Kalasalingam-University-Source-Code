import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusIcon, ShieldAlertIcon } from 'lucide-react';
import { Panel } from '../../components/common/Panel';
import { Tabs } from '../../components/common/Tabs';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import { Dropdown } from '../../components/common/Dropdown';
import { StatusBadge } from '../../components/common/StatusBadge';
import { HealthRecordCard } from '../../components/healthcare/HealthRecordCard';
import { ReferralCard } from '../../components/healthcare/ReferralCard';
import { EmptyState } from '../../components/common/EmptyState';
import { getPatientById, currentPatient } from '../../data/demoPatients';
import { consultationPrescription, demoRecords } from '../../data/demoRecords';
import { sentReferrals, specialistOptions } from '../../data/demoReferrals';

const tabs = ['Consultation', 'History', 'Lab Reports', 'Prescriptions', 'Referrals'];

function Field({
  label,
  value,
  onChange,
  rows = 3,
  placeholder






}: {label: string;value: string;onChange: (value: string) => void;rows?: number;placeholder?: string;}) {
  return (
    <div>
      <label className="mb-1.5 block text-2xs font-medium text-ink-500">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-chip border border-line bg-white px-3 py-2 text-xs leading-5 text-navy placeholder:text-ink-400 transition-colors duration-150 ease-out focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15" />
      
    </div>);

}

export function PatientConsultation() {
  const { id } = useParams();
  const patient = getPatientById(id ?? '') ?? currentPatient;
  const [tab, setTab] = useState(tabs[0]);
  const [complaint, setComplaint] = useState(
    'Fever, body pain and headache since 2 days.'
  );
  const [symptoms, setSymptoms] = useState('Fever\nHeadache\nBody pain');
  const [diagnosis, setDiagnosis] = useState('Viral fever');
  const [notes, setNotes] = useState('Rest, hydration and monitoring advised.');
  const [specialist, setSpecialist] = useState('');

  const patientRecords = demoRecords.filter(
    (record) => record.category === 'Lab Reports' || record.category === 'Imaging'
  );
  const patientPrescriptions = demoRecords.filter(
    (record) => record.category === 'Prescriptions'
  );
  const patientReferralHistory = sentReferrals.filter(
    (referral) => referral.patientId === patient.id
  );

  return (
    <div className="space-y-4">
      {/* Patient header */}
      <div className="flex flex-wrap items-center gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-card">
        <Avatar name={patient.name} size="md" />
        <div className="min-w-0">
          <h1 className="truncate text-[13px] font-semibold text-navy">
            {patient.name}
          </h1>
          <p className="mt-0.5 text-2xs text-ink-500">
            {patient.gender} · {patient.age} Yrs · MRN {patient.mrn} ·{' '}
            {patient.bloodGroup}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StatusBadge status="Consulting" />
          <Button variant="secondary" size="sm" to="/doctor/patients">
            All patients
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} active={tab} onChange={setTab} variant="underline" />

      {tab === 'Consultation' &&
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Panel title="Consultation notes" subtitle="Recorded by the attending doctor.">
            <div className="space-y-3.5">
              <Field
              label="Chief Complaint"
              value={complaint}
              onChange={setComplaint}
              rows={2} />
            
              <Field label="Symptoms" value={symptoms} onChange={setSymptoms} rows={3} />
              <Field
              label="Diagnosis"
              value={diagnosis}
              onChange={setDiagnosis}
              rows={2}
              placeholder="Clinical impression recorded by the doctor" />
            
              <Field label="Notes" value={notes} onChange={setNotes} rows={3} />
            </div>
          </Panel>

          <div className="space-y-3">
            <Panel
            title="Prescription"
            action={
            <Button variant="secondary" size="sm">
                  <PlusIcon className="h-3 w-3" />
                  Add
                </Button>
            }>
            
              <ul className="space-y-2">
                {consultationPrescription.map((item) =>
              <li
                key={item.id}
                className="rounded-card border border-line px-3 py-2.5">
                
                    <p className="text-xs font-medium text-navy">{item.medication}</p>
                    <p className="mt-0.5 text-2xs text-ink-500">
                      {item.dosage} · {item.frequency}
                    </p>
                  </li>
              )}
              </ul>
            </Panel>

            <Panel title="Referral (If Required)">
              <Dropdown
              options={specialistOptions.map((option) => ({
                value: option,
                label: option
              }))}
              value={specialist}
              onChange={setSpecialist}
              placeholder="Select specialist"
              ariaLabel="Refer to specialist" />
            
              <p className="mt-2 text-2xs text-ink-400">
                A referral shares this consultation record with the selected
                specialist.
              </p>
            </Panel>

            <div className="flex items-center gap-2">
              <Button variant="secondary" className="flex-1" size="lg">
                Save &amp; Close
              </Button>
              <Button className="flex-1" size="lg">
                Create Referral
              </Button>
            </div>

            <div className="flex gap-2.5 rounded-card border border-line bg-brand-tint2 px-3 py-2.5">
              <ShieldAlertIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              <p className="text-2xs leading-[17px] text-ink-500">
                Prototype interface. All clinical decisions are recorded by the
                attending doctor — nothing here diagnoses or substitutes a qualified
                healthcare professional.
              </p>
            </div>
          </div>
        </div>
      }

      {tab === 'History' &&
      <Panel title="History" subtitle="Illustrative background information.">
          <ul className="space-y-2">
            {patient.conditions.map((condition) =>
          <li
            key={condition}
            className="rounded-card border border-line px-3 py-2.5 text-xs text-navy">
            
                {condition}
              </li>
          )}
          </ul>
        </Panel>
      }

      {tab === 'Lab Reports' &&
      <Panel title="Lab Reports">
          <div className="space-y-2">
            {patientRecords.map((record) =>
          <HealthRecordCard key={record.id} record={record} />
          )}
          </div>
        </Panel>
      }

      {tab === 'Prescriptions' &&
      <Panel title="Prescriptions">
          <div className="space-y-2">
            {patientPrescriptions.map((record) =>
          <HealthRecordCard key={record.id} record={record} />
          )}
          </div>
        </Panel>
      }

      {tab === 'Referrals' &&
      <Panel title="Referrals">
          {patientReferralHistory.length === 0 ?
        <EmptyState
          title="No referrals for this patient"
          description="Referrals created from this consultation will be listed here." /> :


        <div className="space-y-2">
              {patientReferralHistory.map((referral) =>
          <ReferralCard key={referral.id} referral={referral} showReason />
          )}
            </div>
        }
        </Panel>
      }
    </div>);

}