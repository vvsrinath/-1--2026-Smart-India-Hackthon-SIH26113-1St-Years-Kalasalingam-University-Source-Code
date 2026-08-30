import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { Panel } from '../../components/common/Panel';
import { SearchBar } from '../../components/common/SearchBar';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { demoPatients } from '../../data/demoPatients';

export function DoctorPatients() {
  const [query, setQuery] = useState('');

  const patients = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return demoPatients;
    return demoPatients.filter(
      (patient) =>
      patient.name.toLowerCase().includes(term) ||
      patient.mrn.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
            Patients
          </h1>
          <p className="mt-0.5 text-2xs text-ink-500">
            Demonstration patient list — no real records.
          </p>
        </div>
        <SearchBar
          className="w-full max-w-xs"
          value={query}
          onChange={setQuery}
          placeholder="Search by name or MRN"
          ariaLabel="Search patients" />
        
      </div>

      <Panel>
        {patients.length === 0 ?
        <EmptyState
          title="No patients match your search"
          description="Try another name or MRN." /> :


        <ul className="space-y-2">
            {patients.map((patient) =>
          <li key={patient.id}>
                <Link
              to={`/doctor/patients/${patient.id}`}
              className="flex items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5 transition-colors duration-150 ease-out hover:border-brand/30 hover:bg-brand-tint2">
              
                  <Avatar name={patient.name} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-navy">
                      {patient.name}
                    </span>
                    <span className="block truncate text-2xs text-ink-500">
                      {patient.gender} · {patient.age} yrs · MRN {patient.mrn}
                    </span>
                  </span>
                  <span className="hidden text-2xs text-ink-400 sm:block">
                    {patient.city}
                  </span>
                  <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-400" />
                </Link>
              </li>
          )}
          </ul>
        }
      </Panel>
    </div>);

}