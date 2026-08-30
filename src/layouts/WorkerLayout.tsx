import { WorkspaceLayout } from './WorkspaceLayout';
import { workerNav } from '../data/navigation';

export function WorkerLayout() {
  return (
    <WorkspaceLayout
      items={workerNav}
      workspaceLabel="Health worker workspace"
      basePath="/worker"
      userName="Sunita Devi"
      userMeta="Frontline Worker · Patna"
    />
  );
}
