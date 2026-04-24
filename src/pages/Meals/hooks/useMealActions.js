import { useCallback } from 'react';

/**
 * Custom hook that encapsulates all meal management callbacks.
 * Handles adding, deleting, editing meals and resetting the weekly plan.
 *
 * @param {Function} setMeals - State setter for the meals array
 * @param {Function} resetWeeklyPlan - Function to reset the weekly plan on API
 * @param {Function} resetMealPlan - Function to reset the local meal plan state
 * @returns {Object} Object containing all meal action handlers
 */
export const useMealActions = (setMeals, resetWeeklyPlan, resetMealPlan) => {
  const handleMealAdded = useCallback(
    (newMeal) => {
      setMeals((prevMeals) => [...prevMeals, newMeal]);
    },
    [setMeals]
  );

  const handleMealDeleted = useCallback(
    (deletedMealId) => {
      // Filter out the deleted meal from the meals array
      setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== deletedMealId));
    },
    [setMeals]
  );

  const handleMealEdited = useCallback(
    (updatedMeal) => {
      // Always update the meals array with the new meal data
      setMeals((prevMeals) =>
        prevMeals.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal))
      );
    },
    [setMeals]
  );

  const handleResetWeek = useCallback(async () => {
    try {
      await resetWeeklyPlan();
      resetMealPlan();
    } catch {
      // Error already logged in useResetWeeklyPlan hook
    }
  }, [resetWeeklyPlan, resetMealPlan]);

  return {
    handleMealAdded,
    handleMealDeleted,
    handleMealEdited,
    handleResetWeek,
  };
};
