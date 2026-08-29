import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { howItWorksSteps } from '../../data/siteContent';

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-shell px-6 py-12">
      <SectionHeading
        as="h1"
        title="How Swastya Sathi Works"
        subtitle="Simple steps for continuous care." />
      

      <ol className="mt-8 max-w-2xl">
        {howItWorksSteps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === howItWorksSteps.length - 1;
          return (
            <li key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand-tint text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                {!isLast && <span className="w-px flex-1 bg-line" />}
              </div>
              <div className={isLast ? 'pb-0 pt-0.5' : 'pb-7 pt-0.5'}>
                <p className="text-2xs font-medium tracking-[0.08em] text-ink-400">
                  {step.number}
                </p>
                <h2 className="mt-1 text-[13px] font-semibold text-navy">
                  {step.title}
                </h2>
                <p className="mt-1 max-w-md text-2xs leading-[18px] text-ink-500">
                  {step.description}
                </p>
              </div>
            </li>);

        })}
      </ol>
    </div>);

}