import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LocationBadge } from '../../components/common/LocationBadge';
import { HealthcareCard } from '../../components/healthcare/HealthcareCard';
import { HealthcareMap } from '../../components/maps/HealthcareMap';
import { heroImage, quickActions, trustStats } from '../../data/siteContent';
import { demoIndiaMarkers } from '../../data/demoFacilities';

export function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-shell px-6">
      {/* Hero */}
      <section className="grid items-center gap-8 pb-10 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <div>
          <h1 className="text-[40px] font-semibold leading-[1.12] tracking-[-0.02em] text-navy xl:text-[44px]">
            Connecting People to
            <br />
            <span className="text-brand">Better Healthcare</span>
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-6 text-ink-500">
            Swastya Sathi helps people find the right healthcare services, manage
            referrals and follow-up care, and stay informed about their healthcare
            journey.
          </p>
          <SearchBar
            className="mt-6 max-w-xl"
            size="lg"
            value={query}
            onChange={setQuery}
            onSubmit={() => navigate('/patient/find-healthcare')}
            ariaLabel="Search healthcare services"
            placeholder="Search for hospitals, clinics, doctors, services..."
            action={
            <Button size="lg" onClick={() => navigate('/patient/find-healthcare')}>
                Find Services
              </Button>
            } />
          
        </div>

        <div className="overflow-hidden rounded-card border border-line bg-white">
          <img
            src={heroImage}
            alt="Illustration of healthcare locations across India, connecting rural and urban communities"
            className="h-full w-full object-cover" />
          
        </div>
      </section>

      {/* Live location */}
      <section aria-label="Live location" className="pb-10">
        <div className="rounded-card border border-line bg-white p-3.5 sm:p-4">
          <LocationBadge />
        </div>
      </section>

      {/* Quick actions */}
      <section aria-label="Quick actions" className="grid gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-5">
        {quickActions.map((action) =>
        <HealthcareCard
          key={action.title}
          icon={action.icon}
          title={action.title}
          description={action.description}
          to={action.to} />

        )}
      </section>

      {/* Illustrative trust strip */}
      <section className="border-y border-line py-6">
        <p className="text-center text-2xs font-medium text-ink-400">
          Trusted by Communities Across India
        </p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {trustStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <dt className="text-sm font-semibold leading-tight text-navy">
                    {stat.value}
                  </dt>
                  <dd className="text-2xs text-ink-500">{stat.label}</dd>
                </span>
              </div>);

          })}
        </dl>
        <p className="mt-5 text-center text-2xs text-ink-400">
          Illustrative demo figures shown to demonstrate the interface — not actual
          platform statistics.
        </p>
      </section>

      {/* India healthcare coverage */}
      <section className="py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Healthcare Across India"
            subtitle="Rural and urban care centres on one connected map. Markers below are demo locations." />
          
          <Button variant="secondary" to="/patient/find-healthcare">
            Open full map
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <HealthcareMap
            className="h-[360px]"
            center={[22.4, 79.5]}
            zoom={4}
            ariaLabel="Demo healthcare centres across India"
            markers={demoIndiaMarkers.map((marker) => ({
              id: marker.id,
              name: marker.name,
              position: marker.position,
              meta: 'Illustrative coverage marker'
            }))} />
          
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-card border border-line bg-white p-3.5">
              <p className="text-xs font-semibold text-navy">Rural connectivity</p>
              <p className="mt-1 text-2xs leading-[17px] text-ink-500">
                Sub-centres and rural health posts appear alongside city hospitals, so
                people can start care close to home.
              </p>
            </div>
            <div className="rounded-card border border-line bg-white p-3.5">
              <p className="text-xs font-semibold text-navy">Referral continuity</p>
              <p className="mt-1 text-2xs leading-[17px] text-ink-500">
                When a specialist is needed, the referral travels with the patient
                record instead of restarting the journey.
              </p>
            </div>
            <div className="rounded-card border border-line bg-white p-3.5">
              <p className="text-xs font-semibold text-navy">Follow-up support</p>
              <p className="mt-1 text-2xs leading-[17px] text-ink-500">
                Reminders keep follow-up visits and report reviews from slipping
                through after the first consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>);

}