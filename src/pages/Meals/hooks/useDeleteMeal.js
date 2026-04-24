import { useCallback } from 'react';

/**
 * Custom hook to delete a meal from the API.
 * Makes a DELETE request to /api/meals/<meal-id>
 *
 * @returns {Function} deleteMeal function that takes a meal ID and returns a promise with response data
 */
export const useDeleteMeal = () => {
  const deleteMeal = useCallback(async (mealId) => {
    const res = await fetch(`/api/meals/${mealId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return await res.json();
  }, []);

  return deleteMeal;
};
