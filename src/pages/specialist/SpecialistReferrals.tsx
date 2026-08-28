import React, { useState } from 'react';
import { Panel } from '../../components/common/Panel';
import { Tabs } from '../../components/common/Tabs';
import { ReferralCard } from '../../components/healthcare/ReferralCard';
import { receivedReferrals, sentReferrals } from '../../data/demoReferrals';

const tabs = ['Received Referrals', 'Onward Referrals'];

export function SpecialistReferrals() {
  const [tab, setTab] = useState(tabs[0]);
  const referrals = tab === tabs[0] ? receivedReferrals : sentReferrals.slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
            Referrals
          </h1>
          <p className="mt-0.5 text-2xs text-ink-500">
            Referrals sent to you by treating doctors.
          </p>
        </div>
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <Panel>
        <div className="space-y-2">
          {referrals.map((referral) =>
          <ReferralCard key={referral.id} referral={referral} showReason />
          )}
        </div>
      </Panel>

      <p className="text-2xs text-ink-400">
        Referral records shown are illustrative demonstration data.
      </p>
    </div>);

}