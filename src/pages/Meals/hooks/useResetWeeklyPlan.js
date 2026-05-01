import { useCallback, useState } from 'react';
import { formatDateToString } from '../../../utils/getWeekDates';

/**
 * Custom hook to reset the weekly meal plan via API.
 * Makes a DELETE request to /api/v2/weekly-plan to clear all meals for the week.
 *
 * @param {Date} startDate - The start date (Monday) of the week to reset
 * @returns {Object} Object with resetWeeklyPlan function and isResetting state
 */
export const useResetWeeklyPlan = () => {
  const [isResetting, setIsResetting] = useState(false);

  const resetWeeklyPlan = useCallback(async (startDate) => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/v2/weekly-plan', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start_date: formatDateToString(startDate),
        }),
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
    } catch (err) {
      console.error('Error resetting weekly plan:', err);
      throw err;
    } finally {
      setIsResetting(false);
    }
  }, []);

  return { resetWeeklyPlan, isResetting };
};
