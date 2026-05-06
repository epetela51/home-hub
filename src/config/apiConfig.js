/**
 * Get the API base URL based on the current environment.
 *
 * Development: Uses proxy endpoint (/api)
 * Production: Uses full embedded API URL from .env.production
 *
 * @returns {string} The API base URL
 */
export const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    // In dev, use proxy to avoid CORS issues
    return '/api';
  }
  // In production, use the full embedded URL
  return import.meta.env.VITE_API_URL;
};
