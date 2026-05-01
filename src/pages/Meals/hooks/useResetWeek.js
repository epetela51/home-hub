import { useCallback } from 'react';
import { formatDateToString } from '../../../utils/getWeekDates';

/**
 * Custom hook that encapsulates week reset logic.
 * Handles resetting the weekly meal plan via API and updating local state.
 *
 * @param {Function} setMeals - State setter for the meals array
 * @param {Function} resetWeeklyPlan - Function to reset the weekly plan on API
 * @param {Function} resetMealPlan - Function to reset the local meal plan state
 * @param {Function} setWeeklyPlan - State setter for the weekly plan
 * @param {Object} weekDates - Object with Date objects for each day of the week
 * @param {Array} daysOfWeek - Array of day names
 * @returns {Object} Object containing handleResetWeek
 */
export const useResetWeek = (
  setMeals,
  resetWeeklyPlan,
  resetMealPlan,
  setWeeklyPlan,
  weekDates,
  daysOfWeek
) => {
  const handleResetWeek = useCallback(
    async (startDate) => {
      try {
        await resetWeeklyPlan(startDate);
        // Update the weekly plan state to remove meals for the week being reset
        setWeeklyPlan((prev) => {
          const updated = { ...prev };
          // Remove meals for all 7 days of the week
          daysOfWeek.forEach((day) => {
            const dateString = formatDateToString(weekDates[day]);
            delete updated[dateString];
          });
          return updated;
        });
        resetMealPlan();
      } catch {
        // Error already logged in useResetWeeklyPlan hook
      }
    },
    [resetWeeklyPlan, resetMealPlan, setWeeklyPlan, weekDates, daysOfWeek]
  );

  return {
    handleResetWeek,
  };
};
