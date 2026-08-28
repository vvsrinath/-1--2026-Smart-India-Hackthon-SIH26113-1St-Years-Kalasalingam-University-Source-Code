import React from 'react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { HealthcareCard } from '../../components/healthcare/HealthcareCard';
import { services } from '../../data/siteContent';

export function Services() {
  return (
    <div className="mx-auto max-w-shell px-6 py-12">
      <SectionHeading
        as="h1"
        title="Our Services"
        subtitle="Everything you need for a complete care journey." />
      

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) =>
        <HealthcareCard
          key={service.title}
          icon={service.icon}
          title={service.title}
          description={service.description}
          to={service.to}
          className="p-4" />

        )}
      </div>

      <p className="mt-6 text-2xs text-ink-400">
        Service screens shown in this prototype use illustrative sample data.
      </p>
    </div>);

}