import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '../../utils/cn';

export interface MapMarker {
  id: string;
  name: string;
  position: [number, number];
  meta?: string;
  tone?: 'brand' | 'info';
}

function pinIcon(tone: 'brand' | 'info', active: boolean) {
  const fill = tone === 'info' ? '#2563eb' : '#0b6b3a';
  const scale = active ? 1.18 : 1;
  return L.divIcon({
    className: 'ss-marker',
    html: `<div style="transform:scale(${scale});transform-origin:bottom center;filter:drop-shadow(0 1px 2px rgba(15,41,66,0.25))">
      <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 29c0 0 10-11.2 10-18A10 10 0 1 0 1 11c0 6.8 10 18 10 18Z" fill="${fill}"/>
        <circle cx="11" cy="11" r="3.6" fill="#ffffff"/>
      </svg>
    </div>`,
    iconSize: [22, 30],
    iconAnchor: [11, 30],
    popupAnchor: [0, -28]
  });
}

function ViewController({
  center,
  zoom



}: {center: [number, number];zoom: number;}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.3 });
  }, [center, zoom, map]);
  return null;
}

interface HealthcareMapProps {
  markers: MapMarker[];
  center: [number, number];
  zoom?: number;
  activeId?: string;
  onMarkerClick?: (id: string) => void;
  className?: string;
  scrollWheelZoom?: boolean;
  ariaLabel?: string;
}

export function HealthcareMap({
  markers,
  center,
  zoom = 13,
  activeId,
  onMarkerClick,
  className,
  scrollWheelZoom = false,
  ariaLabel = 'Healthcare facilities map'
}: HealthcareMapProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn('overflow-hidden rounded-card border border-line', className)}>
      
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        zoomControl
        className="h-full w-full">
        
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        
        <ViewController center={center} zoom={zoom} />
        {markers.map((marker) =>
        <Marker
          key={marker.id}
          position={marker.position}
          icon={pinIcon(marker.tone ?? 'brand', marker.id === activeId)}
          eventHandlers={{ click: () => onMarkerClick?.(marker.id) }}>
          
            <Popup>
              <span className="block text-xs font-semibold text-navy">
                {marker.name}
              </span>
              {marker.meta &&
            <span className="mt-0.5 block text-2xs text-ink-500">
                  {marker.meta}
                </span>
            }
              <span className="mt-1 block text-[10px] text-ink-400">
                Demo location
              </span>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>);

}