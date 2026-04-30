import { useCallback } from 'react';

/**
 * Custom hook that encapsulates meal reset logic.
 *
 * @param {Function} setMeals - State setter for the meals array
 * @param {Function} resetWeeklyPlan - Function to reset the weekly plan on API
 * @param {Function} resetMealPlan - Function to reset the local meal plan state
 * @returns {Object} Object containing handleResetWeek
 */
export const useMealActions = (setMeals, resetWeeklyPlan, resetMealPlan) => {
  const handleResetWeek = useCallback(async () => {
    try {
      await resetWeeklyPlan();
      resetMealPlan();
    } catch {
      // Error already logged in useResetWeeklyPlan hook
    }
  }, [resetWeeklyPlan, resetMealPlan]);

  return {
    handleResetWeek,
  };
};
