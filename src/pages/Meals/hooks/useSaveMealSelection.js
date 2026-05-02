/**
 * Custom hook to save meal selection via API with optimistic update rollback.
 * Accepts callback to revert state if API fails.
 *
 * @param {Function} onMealSaved - Callback to revert meal selection on API failure: (dateString, mealId) => void
 * @returns {Function} Handler function that takes (dateString, mealId, previousMealId) and returns a promise
 */
export const useSaveMealSelection = (onMealSaved) => {
  const saveMeal = async (dateString, mealId, previousMealId) => {
    const payload = {
      date: dateString,
      meal_id: mealId,
    };

    /**
     * Uses try/catch here (vs. other hooks) because we have specific error handling:
     * 1. Rollback optimistic update on failure (onMealSaved callback)
     * 2. Show error alert to user
     * Still throws error so caller can handle if needed.
     */
    try {
      const res = await fetch('/api/v2/daily-meal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(`Error saving meal for ${dateString}:`, err);
      // Rollback optimistic update on failure
      if (onMealSaved) {
        onMealSaved(dateString, previousMealId);
      }
      alert('Failed to save meal selection');
      throw err;
    }
  };

  return saveMeal;
};
