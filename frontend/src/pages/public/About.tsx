import React from 'react';
import { aboutPoints, aboutValues, doctorImage } from '../../data/siteContent';

export function About() {
  return (
    <div className="mx-auto max-w-shell px-6 py-12">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div>
          <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.02em] text-navy">
            About Swastya Sathi
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-6 text-ink-500">
            Swastya Sathi is a digital platform designed to improve healthcare
            accessibility and continuity, especially for rural and underserved
            communities. It brings finding care, consulting a doctor, referrals and
            follow-ups into a single, simple journey.
          </p>

          <dl className="mt-8 space-y-5">
            {aboutPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
                    <Icon className="h-[15px] w-[15px]" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold text-navy">{point.title}</dt>
                    <dd className="mt-1 max-w-md text-2xs leading-[18px] text-ink-500">
                      {point.description}
                    </dd>
                  </div>
                </div>);

            })}
          </dl>
        </div>

        <div className="overflow-hidden rounded-card border border-line bg-brand-tint2">
          <img
            src={doctorImage}
            alt="A doctor in a white coat with a stethoscope"
            className="h-[380px] w-full object-cover object-top" />
          
        </div>
      </div>

      <section
        aria-label="What we stand for"
        className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {aboutValues.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="flex items-center gap-2.5 rounded-card border border-line bg-white p-3.5 shadow-card">
              
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
                <Icon className="h-[15px] w-[15px]" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-navy">
                  {value.title}
                </span>
                <span className="block text-2xs text-ink-500">
                  {value.description}
                </span>
              </span>
            </div>);

        })}
      </section>
    </div>);

}