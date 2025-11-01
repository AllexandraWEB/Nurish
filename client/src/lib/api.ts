export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = (data && (data.message || data.error)) || 'Request failed';
    throw new Error(message);
  }
  return data;
}


