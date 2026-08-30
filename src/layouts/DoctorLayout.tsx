import { WorkspaceLayout } from './WorkspaceLayout';
import { doctorNav } from '../data/navigation';
import { currentDoctor } from '../data/demoDoctors';

export function DoctorLayout() {
  return (
    <WorkspaceLayout
      items={doctorNav}
      workspaceLabel="Doctor workspace"
      basePath="/doctor"
      userName={currentDoctor.name}
      userMeta={`${currentDoctor.specialization} · ${currentDoctor.hospital}`} />);


}