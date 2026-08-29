import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { Tabs } from '../../components/common/Tabs';
import { ReferralCard } from '../../components/healthcare/ReferralCard';
import { EmptyState } from '../../components/common/EmptyState';
import { receivedReferrals, sentReferrals } from '../../data/demoReferrals';

const tabs = ['Sent Referrals', 'Received Referrals'];

export function DoctorReferrals() {
  const [tab, setTab] = useState(tabs[0]);
  const referrals = tab === tabs[0] ? sentReferrals : receivedReferrals;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
            Referral Management
          </h1>
          <p className="mt-0.5 text-2xs text-ink-500">
            Track referrals you have raised and those sent to you.
          </p>
        </div>
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <Panel>
        {referrals.length === 0 ?
        <EmptyState
          title="Nothing here yet"
          description="Referrals will appear in this list as they are created." /> :


        <div className="space-y-2">
            {referrals.map((referral) =>
          <ReferralCard key={referral.id} referral={referral} showReason />
          )}
          </div>
        }
      </Panel>

      <p className="text-2xs text-ink-400">
        Referral records shown are illustrative demonstration data.
      </p>
    </div>);

}