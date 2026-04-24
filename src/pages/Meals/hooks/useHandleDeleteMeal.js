import { useDeleteMeal } from './useDeleteMeal';

/**
 * Orchestrates the delete meal flow: calls the API, parses response data,
 * and triggers onMealDeleted callback so parent can update state.
 *
 * @param {Function} onMealDeleted - Callback that receives (meal_id, weeklyPlan)
 * @returns {Function} handleDeleteMeal function
 */
export const useHandleDeleteMeal = (onMealDeleted) => {
  const deleteMeal = useDeleteMeal();

  const handleDeleteMeal = async (mealId) => {
    try {
      const response = await deleteMeal(mealId);
      const { meal_id, weeklyPlan } = response;

      // Call the callback with the deleted meal ID and updated weekly plan
      if (onMealDeleted) {
        onMealDeleted(meal_id, weeklyPlan);
      }
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
  };

  return handleDeleteMeal;
};
