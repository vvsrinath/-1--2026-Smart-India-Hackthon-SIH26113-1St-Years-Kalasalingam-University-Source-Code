import { WorkspaceLayout } from './WorkspaceLayout';
import { adminNav } from '../data/navigation';

export function AdminLayout() {
  return (
    <WorkspaceLayout
      items={adminNav}
      workspaceLabel="Admin workspace"
      basePath="/admin"
      userName="Ministry Admin"
      userMeta="Government oversight · Demo mode"
    />
  );
}
