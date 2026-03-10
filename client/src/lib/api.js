const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiUrl = (path) => {
  if (!path.startsWith('/')) {
    return `${API_BASE}/${path}`;
  }
  return `${API_BASE}${path}`;
};

