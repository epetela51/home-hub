import { useCallback } from 'react';

/**
 * Custom hook to save meal selection via API.
 * Returns a handler function that makes a PUT /api/v2/daily-meal call when invoked.
 *
 * @returns {Function} Handler function that takes (day, mealId) and saves the selection
 */
export const useSaveMealSelection = () => {
  const saveMeal = useCallback((day, mealId) => {
    const payload = {
      day,
      meal_id: mealId,
    };

    fetch('/api/v2/daily-meal', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(`Error saving meal for ${day}:`, err);
      });
  }, []);

  return saveMeal;
};
