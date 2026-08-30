import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Panel } from '../../components/common/Panel';
import { StatusBadge } from '../../components/common/StatusBadge';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  status: 'Active' | 'Completed' | 'Stopped';
  refillsRemaining: number;
}

const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily after meals',
    prescribedBy: 'Dr. Rajesh Kumar',
    startDate: 'Jan 15, 2026',
    status: 'Active',
    refillsRemaining: 2
  },
  {
    id: '2',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily in the morning',
    prescribedBy: 'Dr. Rajesh Kumar',
    startDate: 'Dec 1, 2025',
    status: 'Active',
    refillsRemaining: 1
  },
  {
    id: '3',
    name: 'Aspirin',
    dosage: '75 mg',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Rajesh Kumar',
    startDate: 'Nov 1, 2025',
    endDate: 'Aug 15, 2026',
    status: 'Completed',
    refillsRemaining: 0
  },
  {
    id: '4',
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once daily',
    prescribedBy: 'Dr. Priya Singh',
    startDate: 'Feb 1, 2026',
    status: 'Active',
    refillsRemaining: 3
  }
];

export function Medicines() {
  const activeMedicines = medicines.filter(m => m.status === 'Active');
  const completedMedicines = medicines.filter(m => m.status === 'Completed');

  return (
    <div className="space-y-5">
      <SectionHeading
        title="Medicines"
        subtitle="Medications prescribed and recommended for your care"
      />

      {activeMedicines.length > 0 && (
        <Panel title="Currently Taking" subtitle={`${activeMedicines.length} active medication${activeMedicines.length !== 1 ? 's' : ''}`}>
          <div className="space-y-3">
            {activeMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="rounded-card border border-line bg-white p-3 hover:bg-brand-tint2 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-navy">{medicine.name}</h3>
                      <StatusBadge status="Upcoming" />
                    </div>
                    <p className="mt-1 text-xs font-medium text-brand">{medicine.dosage}</p>
                    <p className="mt-0.5 text-2xs text-ink-500">{medicine.frequency}</p>
                    <p className="mt-1 text-2xs text-ink-400">Prescribed by {medicine.prescribedBy}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2 py-1">
                    <CheckCircleIcon className="h-3 w-3 text-emerald-700" />
                    <span className="text-2xs font-medium text-emerald-700">
                      {medicine.refillsRemaining} refill{medicine.refillsRemaining !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {completedMedicines.length > 0 && (
        <Panel title="Completed" subtitle={`${completedMedicines.length} medication${completedMedicines.length !== 1 ? 's' : ''}`}>
          <div className="space-y-2">
            {completedMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="rounded-card border border-line bg-white p-3 opacity-75"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-ink-400">{medicine.name}</h3>
                    <p className="mt-0.5 text-2xs text-ink-400">{medicine.dosage}</p>
                  </div>
                  <span className="text-2xs text-ink-400">
                    Ended {medicine.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      <Panel title="Tips for Medicine Safety">
        <div className="space-y-2">
          <div className="flex gap-2 rounded-card border border-line bg-blue-50 p-3">
            <AlertCircleIcon className="h-4 w-4 flex-shrink-0 text-blue-700 mt-0.5" />
            <div className="text-2xs text-blue-900">
              <p className="font-semibold">Take medicines on time</p>
              <p className="mt-0.5">Set a reminder on your phone to take medicines at the same time every day.</p>
            </div>
          </div>
          <div className="flex gap-2 rounded-card border border-line bg-amber-50 p-3">
            <AlertCircleIcon className="h-4 w-4 flex-shrink-0 text-amber-700 mt-0.5" />
            <div className="text-2xs text-amber-900">
              <p className="font-semibold">Do not stop abruptly</p>
              <p className="mt-0.5">Do not stop any medicine without talking to your doctor first.</p>
            </div>
          </div>
          <div className="flex gap-2 rounded-card border border-line bg-emerald-50 p-3">
            <AlertCircleIcon className="h-4 w-4 flex-shrink-0 text-emerald-700 mt-0.5" />
            <div className="text-2xs text-emerald-900">
              <p className="font-semibold">Keep records updated</p>
              <p className="mt-0.5">Tell your doctor about any side effects or changes in how you feel.</p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
