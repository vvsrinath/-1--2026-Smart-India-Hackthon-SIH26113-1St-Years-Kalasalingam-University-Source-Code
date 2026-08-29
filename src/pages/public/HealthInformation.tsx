import React, { useMemo, useState } from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Tabs } from '../../components/common/Tabs';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { HealthTipCard } from '../../components/healthcare/HealthTipCard';
import { healthTips, tipTabs } from '../../data/healthTips';
import type { HealthTip } from '../../types';

export function HealthInformation() {
  const [activeTab, setActiveTab] = useState(tipTabs[0]);
  const [openTip, setOpenTip] = useState<HealthTip | null>(null);

  const visibleTips = useMemo(() => {
    if (activeTab === 'All Tips') return healthTips;
    return healthTips.filter((tip) => tip.category === activeTab);
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-shell px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          as="h1"
          title="Health Tips"
          subtitle="General wellbeing information to help you stay informed." />
        
        <Tabs tabs={tipTabs} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {visibleTips.map((tip) =>
        <HealthTipCard key={tip.id} tip={tip} onRead={setOpenTip} />
        )}
      </div>

      <p className="mt-6 text-2xs leading-5 text-ink-400">
        This information is general in nature and is not medical advice. For any
        health concern, please consult a qualified healthcare professional.
      </p>

      <Modal
        open={Boolean(openTip)}
        onClose={() => setOpenTip(null)}
        title={openTip?.title ?? ''}
        description={openTip ? `${openTip.category} · ${openTip.readTime}` : undefined}
        footer={
        <Button variant="secondary" onClick={() => setOpenTip(null)}>
            Close
          </Button>
        }>
        
        <p className="leading-5">{openTip?.description}</p>
        <p className="mt-3 text-2xs text-ink-400">
          Full articles are not part of this prototype. Always speak to a qualified
          healthcare professional about your specific situation.
        </p>
      </Modal>
    </div>);

}