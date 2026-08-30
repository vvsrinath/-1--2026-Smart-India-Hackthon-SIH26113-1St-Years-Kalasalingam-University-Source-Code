import { WorkspaceLayout } from './WorkspaceLayout';
import { patientNav } from '../data/navigation';
import { currentPatient } from '../data/demoPatients';

export function PatientLayout() {
  return (
    <WorkspaceLayout
      items={patientNav}
      workspaceLabel="Patient workspace"
      basePath="/patient"
      userName={currentPatient.name}
      userMeta={`Patient · ${currentPatient.city}`} />);


}