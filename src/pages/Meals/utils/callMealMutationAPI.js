/**
 * Generic API mutation utility for meal CRUD operations (POST, PUT, DELETE).
 * Handles consistent fetch, error handling, and logging.
 *
 * @param {string} url - The API endpoint URL
 * @param {string} method - HTTP method (POST, PUT, DELETE)
 * @param {Object} [payload] - Request body data
 * @returns {Promise} The JSON response from the API
 */
export const callMealMutationAPI = async (url, method, payload) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`API error on ${method} ${url}:`, err);
    throw err;
  }
};
