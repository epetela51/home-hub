import { useCallback, useState } from 'react';
import { formatDateToString } from '../../../utils/getWeekDates';
import { callMealMutationAPI } from '../utils/callMealMutationAPI';

/**
 * Custom hook to reset the entire weekly meal plan.
 * Combines API call + local state updates into a single orchestrated action.
 *
 * @param {Function} resetMealPlan - Function to reset local meal plan state
 * @param {Function} setWeeklyPlan - State setter for weekly plan
 * @param {Object} weekDates - Object with Date objects for each day
 * @param {Array} daysOfWeek - Array of day names ['Monday', 'Tuesday', ...]
 * @returns {Object} { handleResetWeek, isResetting }
 */
export const useWeekReset = (resetMealPlan, setWeeklyPlan, weekDates, daysOfWeek) => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetWeek = useCallback(
    async (startDate) => {
      setIsResetting(true);
      try {
        // Make API call
        await callMealMutationAPI('/api/v2/weekly-plan', 'DELETE', {
          start_date: formatDateToString(startDate),
        });

        // Update local state
        setWeeklyPlan((prev) => {
          const updated = { ...prev };
          daysOfWeek.forEach((day) => {
            const dateString = formatDateToString(weekDates[day]);
            delete updated[dateString];
          });
          return updated;
        });

        resetMealPlan();
      } catch (err) {
        console.error('Error resetting weekly plan:', err);
        throw err;
      } finally {
        setIsResetting(false);
      }
    },
    [resetMealPlan, setWeeklyPlan, weekDates, daysOfWeek]
  );

  return { handleResetWeek, isResetting };
};
