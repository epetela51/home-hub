import { useCallback, useState } from 'react';

/**
 * Custom hook to reset the weekly meal plan via API.
 * Makes a DELETE request to /api/weekly-plan to clear all meals for the week.
 *
 * @returns {Object} Object with resetWeeklyPlan function and isResetting state
 */
export const useResetWeeklyPlan = () => {
  const [isResetting, setIsResetting] = useState(false);

  const resetWeeklyPlan = useCallback(async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/weekly-plan', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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
