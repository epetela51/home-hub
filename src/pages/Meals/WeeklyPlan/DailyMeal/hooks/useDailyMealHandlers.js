import { useCallback } from 'react';

/**
 * Custom hook for DailyMeal component handlers.
 * Centralizes meal selection, clearing, and sheet management logic.
 *
 * @param {string} dateString - The date string (YYYY-MM-DD format)
 * @param {string} mealId - The current meal ID for the date
 * @param {Function} onMealSelected - Callback to update meal plan (from parent)
 * @param {Function} saveMeal - Async function to save meal to API (from useSaveMealSelection)
 * @param {Function} closeSheet - Function to close the meal selection sheet (from useMealSelectionSheet)
 * @param {Function} setSearchQuery - Function to clear search query (from useMealSearch)
 *
 * @returns {Object} { handleSelectMeal, handleClearMeal }
 */
export const useDailyMealHandlers = (
  dateString,
  mealId,
  onMealSelected,
  saveMeal,
  closeSheet,
  setSearchQuery
) => {
  const closeAndReset = useCallback(() => {
    closeSheet();
    setSearchQuery('');
  }, [closeSheet, setSearchQuery]);

  const handleSelectMeal = useCallback(
    (selectedMealId) => {
      onMealSelected(dateString, selectedMealId);
      saveMeal(dateString, selectedMealId, mealId).catch(() => {});
      closeAndReset();
    },
    [onMealSelected, dateString, mealId, saveMeal, closeAndReset]
  );

  const handleClearMeal = useCallback(() => {
    onMealSelected(dateString, null);
    saveMeal(dateString, null, mealId).catch(() => {});
    closeAndReset();
  }, [onMealSelected, dateString, mealId, saveMeal, closeAndReset]);

  return { handleSelectMeal, handleClearMeal };
};
