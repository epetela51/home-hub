import { useEffect } from 'react';

/**
 * Custom hook to manage state synchronization in MealsLibrary.
 * Resolves UI bug where opening the add meal form while a meal is expanded causes the expanded meal to remain open, leading to a confusing UI state.
 *
 * @param {boolean} isFormOpen - Whether add meal form is open
 * @param {string | null} expandedMealId - ID of currently expanded meal
 * @param {Function} handleToggleMeal - Callback to toggle meal expansion
 */
export const useMealLibraryStateSync = (isFormOpen, expandedMealId, handleToggleMeal) => {
  useEffect(() => {
    if (isFormOpen && expandedMealId) {
      handleToggleMeal(expandedMealId);
    }
  }, [isFormOpen, expandedMealId, handleToggleMeal]);
};
