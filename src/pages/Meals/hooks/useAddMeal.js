import { useCallback } from 'react';

/**
 * Custom hook to add a new meal via API.
 * Returns a handler function that makes a POST /api/v2/meals call.
 *
 * @returns {Function} Handler function that takes {meal, note} and adds the meal
 */
export const useAddMeal = () => {
  const addMeal = useCallback(async (mealData) => {
    const { meal, note } = mealData;

    const payload = {
      meal,
      note: note || null,
    };

    try {
      const res = await fetch('/api/v2/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      return data?.meal;
    } catch (err) {
      console.error('Error adding meal:', err);
      throw err;
    }
  }, []);

  return addMeal;
};
