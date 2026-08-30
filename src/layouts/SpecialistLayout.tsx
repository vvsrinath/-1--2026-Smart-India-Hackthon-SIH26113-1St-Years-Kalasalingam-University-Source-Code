import { WorkspaceLayout } from './WorkspaceLayout';
import { specialistNav } from '../data/navigation';
import { currentSpecialist } from '../data/demoSpecialists';

export function SpecialistLayout() {
  return (
    <WorkspaceLayout
      items={specialistNav}
      workspaceLabel="Specialist workspace"
      basePath="/specialist"
      userName={currentSpecialist.name}
      userMeta={`${currentSpecialist.specialization} · ${currentSpecialist.hospital}`} />);


}