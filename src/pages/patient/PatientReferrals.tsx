import { Panel } from '../../components/common/Panel';
import { Timeline } from '../../components/common/Timeline';
import { ReferralCard } from '../../components/healthcare/ReferralCard';
import { EmptyState } from '../../components/common/EmptyState';
import { patientReferrals } from '../../data/demoReferrals';
import { careJourney } from '../../data/demoRecords';

export function PatientReferrals() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          My Referrals
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">
          Track referrals raised by your doctor and their current status.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel title="Referrals" subtitle="Demo referral records.">
          {patientReferrals.length === 0 ?
          <EmptyState
            title="No referrals yet"
            description="If your doctor refers you to a specialist, it will appear here." /> :


          <div className="space-y-2">
              {patientReferrals.map((referral) =>
            <ReferralCard key={referral.id} referral={referral} showReason />
            )}
            </div>
          }
        </Panel>

        <Panel title="Referral progress" subtitle="Current care request.">
          <Timeline steps={careJourney} orientation="vertical" />
        </Panel>
      </div>
    </div>);

}