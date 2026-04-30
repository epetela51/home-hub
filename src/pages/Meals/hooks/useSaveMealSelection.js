/**
 * Custom hook to save meal selection via API with optimistic update rollback.
 * Accepts callback to revert state if API fails.
 *
 * @param {Function} onMealSaved - Callback to revert meal selection on API failure: (dateString, mealId) => void
 * @returns {Function} Handler function that takes (dateString, mealId, previousMealId) and saves the selection
 */
export const useSaveMealSelection = (onMealSaved) => {
  const saveMeal = (dateString, mealId, previousMealId) => {
    const payload = {
      date: dateString,
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
        console.error(`Error saving meal for ${dateString}:`, err);
        // Rollback optimistic update on failure
        if (onMealSaved) {
          onMealSaved(dateString, previousMealId);
        }
        alert('Failed to save meal selection');
      });
  };

  return saveMeal;
};
