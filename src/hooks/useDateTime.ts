import { useEffect, useState } from 'react';

/**
 * Returns the current local date/time, refreshed every second.
 * Because it is purely client-side (uses the device clock), it keeps
 * working offline — no network round-trip is involved.
 */
export function useDateTime(refreshMs = 1000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), refreshMs);
    return () => window.clearInterval(id);
  }, [refreshMs]);

  return now;
}