import { useCallback } from 'react';
import { useSaveMealSelection } from '../../hooks/useSaveMealSelection';

/**
 * Custom hook to handle meal assignment to a specific date.
 * Wraps useSaveMealSelection with error handling.
 *
 * @returns {Function} assignMealToDate handler
 *   Signature: (mealId: string, dateString: string) => Promise
 *   @param {string} mealId - ID of the meal to assign
 *   @param {string} dateString - Date in YYYY-MM-DD format
 */
export const useAssignMealToDate = () => {
  const saveMeal = useSaveMealSelection(null);

  const assignMealToDate = useCallback(
    async (mealId, dateString) => {
      try {
        await saveMeal(dateString, mealId, null);
      } catch (err) {
        console.error('Failed to assign meal:', err);
        // Error alert is already shown in useSaveMealSelection
      }
    },
    [saveMeal]
  );

  return assignMealToDate;
};
