import React from 'react';
import { WorkspaceLayout } from './WorkspaceLayout';
import { phcNav } from '../data/navigation';

export function PHCLayout() {
  return (
    <WorkspaceLayout
      items={phcNav}
      workspaceLabel="PHC workspace"
      basePath="/phc"
      userName="Dr. Nisha Kumar"
      userMeta="PHC In-charge · Sadar Clinic"
    />
  );
}
