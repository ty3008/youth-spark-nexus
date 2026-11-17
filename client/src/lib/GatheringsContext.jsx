import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import seed from '../data/gatherings.json';
import { apiUrl } from './api';
import { normalizeGathering, newestFirst } from './gatherings';

const seeded = seed.map(normalizeGathering).filter(Boolean).sort(newestFirst);

const GatheringsContext = createContext({ items: seeded });

// The site opens with the six canonical gatherings so it is never blank.
// If the API answers with gatherings, the API list replaces the seed (so the admin can edit and delete).
// Records without a slug and program are legacy events and are ignored.
export function GatheringsProvider({ children }) {
  const [items, setItems] = useState(seeded);

  useEffect(() => {
    const controller = new AbortController();
    fetch(apiUrl('/events'), { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad status'))))
      .then((data) => {
        if (!Array.isArray(data)) return;
        const fromApi = data.map(normalizeGathering).filter(Boolean).sort(newestFirst);
        if (fromApi.length) setItems(fromApi);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ items }), [items]);
  return <GatheringsContext.Provider value={value}>{children}</GatheringsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGatherings = () => useContext(GatheringsContext);
