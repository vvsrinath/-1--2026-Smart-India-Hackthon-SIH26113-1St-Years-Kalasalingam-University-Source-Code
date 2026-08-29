import React, { useMemo, useState } from 'react';
import { MapPinIcon, SlidersHorizontalIcon } from 'lucide-react';
import { SearchBar } from '../../components/common/SearchBar';
import { Dropdown } from '../../components/common/Dropdown';
import { FacilityCard } from '../../components/healthcare/FacilityCard';
import { HealthcareMap } from '../../components/maps/HealthcareMap';
import { EmptyState } from '../../components/common/EmptyState';
import { cn } from '../../utils/cn';
import { demoFacilities, facilityFilters } from '../../data/demoFacilities';

export function FindHealthcare() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeId, setActiveId] = useState(demoFacilities[0].id);
  const [showFilters, setShowFilters] = useState(false);

  const facilities = useMemo(() => {
    const term = query.trim().toLowerCase();
    return demoFacilities.filter((facility) => {
      const matchesFilter = filter === 'All' || facility.type === filter;
      const matchesTerm =
      !term ||
      facility.name.toLowerCase().includes(term) ||
      facility.type.toLowerCase().includes(term) ||
      facility.services.some((service) => service.toLowerCase().includes(term));
      return matchesFilter && matchesTerm;
    });
  }, [query, filter]);

  const active =
  facilities.find((facility) => facility.id === activeId) ?? facilities[0];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 rounded-card border border-line bg-white px-3 py-2.5">
        <SearchBar
          className="min-w-0 flex-1"
          value={query}
          onChange={setQuery}
          placeholder="Search hospital, clinic, service..."
          ariaLabel="Search healthcare facilities" />
        
        <Dropdown
          className="w-[168px]"
          ariaLabel="Location"
          icon={<MapPinIcon className="h-3.5 w-3.5 text-ink-400" />}
          value="patna"
          onChange={() => undefined}
          options={[{ value: 'patna', label: 'Patna, Bihar' }]} />
        
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          aria-expanded={showFilters}
          className={cn(
            'inline-flex h-9 items-center gap-1.5 rounded-chip border px-3 text-xs transition-colors duration-150 ease-out',
            showFilters ?
            'border-brand/40 bg-brand-tint text-brand' :
            'border-line text-ink-500 hover:text-navy'
          )}>
          
          <SlidersHorizontalIcon className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>

      {showFilters &&
      <div
        role="group"
        aria-label="Facility type"
        className="flex flex-wrap gap-1.5 rounded-card border border-line bg-white px-3 py-2.5">
        
          {facilityFilters.map((item) =>
        <button
          key={item}
          type="button"
          onClick={() => setFilter(item)}
          aria-pressed={filter === item}
          className={cn(
            'rounded-[4px] border px-2.5 py-1 text-2xs font-medium transition-colors duration-150 ease-out',
            filter === item ?
            'border-brand/30 bg-brand-tint text-brand' :
            'border-line text-ink-500 hover:text-navy'
          )}>
          
              {item}
            </button>
        )}
        </div>
      }

      <div className="grid gap-3 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <p className="text-2xs font-medium text-ink-500">
              {facilities.length} demo facilities
            </p>
            {filter !== 'All' &&
            <button
              type="button"
              onClick={() => setFilter('All')}
              className="text-2xs font-medium text-brand">
              
                Clear filter
              </button>
            }
          </div>

          {facilities.length === 0 ?
          <EmptyState
            title="No facilities match your search"
            description="Try a different service name, or clear the filters to see all demo facilities." /> :


          <div className="ss-scroll max-h-[520px] space-y-2 overflow-y-auto pr-1">
              {facilities.map((facility) =>
            <FacilityCard
              key={facility.id}
              facility={facility}
              active={facility.id === active?.id}
              onSelect={setActiveId} />

            )}
            </div>
          }
        </div>

        <div className="space-y-2">
          <HealthcareMap
            className="h-[520px]"
            center={active?.position ?? [25.6, 85.14]}
            zoom={active ? 14 : 12}
            activeId={active?.id}
            onMarkerClick={setActiveId}
            markers={facilities.map((facility) => ({
              id: facility.id,
              name: facility.name,
              position: facility.position,
              meta: `${facility.type} · ${facility.distanceKm} km`,
              tone: facility.isOpen ? 'brand' : 'info'
            }))} />
          
          <p className="px-1 text-2xs text-ink-400">
            Map data © OpenStreetMap contributors. Facility markers, distances and
            opening hours are illustrative demo data.
          </p>
        </div>
      </div>
    </div>);

}