import { useCallback, useEffect, useRef, useState } from 'react';

export type GeoStatus =
  | 'idle'        // not requested yet
  | 'requesting'  // permission prompt / waiting for a fix
  | 'granted'     // permission given, live position available
  | 'denied'      // user blocked permission
  | 'unavailable' // geolocation not supported by this browser/device
  | 'error';      // temporary error (timeout, no signal, etc.)

export interface GeoCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface UseGeolocationOptions {
  autoRequest?: boolean;
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

/**
 * Requests the browser location permission, then keeps a live watch on the
 * position (watchPosition) so the coordinates update as the user moves.
 * The watch itself is local to the device, so once granted it still works
 * while offline.
 */
export function useGeolocation(options: UseGeolocationOptions = {}) {
  const {
    autoRequest = false,
    enableHighAccuracy = true,
    maximumAge = 10000,
    timeout = 15000,
  } = options;

  const hasGeo =
    typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const [status, setStatus] = useState<GeoStatus>(hasGeo ? 'idle' : 'unavailable');
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [error, setError] = useState('');
  const watchId = useRef<number | null>(null);

  const stopWatch = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const applyPosition = useCallback((position: GeolocationPosition) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    });
    setStatus('granted');
    setError('');
  }, []);

  const applyError = useCallback(
    (err: GeolocationPositionError) => {
      setError(err.message);
      if (err.code === err.PERMISSION_DENIED) setStatus('denied');
      else setStatus('error');
      stopWatch();
    },
    [stopWatch],
  );

  const request = useCallback(() => {
    if (!hasGeo) {
      setStatus('unavailable');
      return;
    }
    setStatus('requesting');
    setError('');

    // One-shot gets the permission prompt going and returns an immediate fix.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        applyPosition(position);
        // Live updates from here on:
        if (watchId.current === null) {
          watchId.current = navigator.geolocation.watchPosition(
            applyPosition,
            applyError,
            { enableHighAccuracy, maximumAge, timeout },
          );
        }
      },
      applyError,
      { enableHighAccuracy, maximumAge, timeout },
    );
  }, [applyPosition, applyError, enableHighAccuracy, maximumAge, timeout, hasGeo]);

  // Auto-request once on mount if the caller asks for it.
  useEffect(() => {
    if (autoRequest && hasGeo) request();
  }, [autoRequest, hasGeo, request]);

  // Listen to permission state changes and clean up the watch on unmount.
  useEffect(() => {
    if (!hasGeo) return undefined;

    let permission: PermissionStatus | null = null;

    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((p) => {
          permission = p;
          p.onchange = () => {
            if (p.state === 'denied') {
              stopWatch();
              setCoords(null);
              setStatus('denied');
            } else if (p.state === 'granted') {
              setStatus('idle');
            }
          };
        })
        .catch(() => undefined);
    }

    return () => {
      stopWatch();
      if (permission) permission.onchange = null;
    };
  }, [hasGeo, stopWatch]);

  return { status, coords, error, request, stop: stopWatch };
}