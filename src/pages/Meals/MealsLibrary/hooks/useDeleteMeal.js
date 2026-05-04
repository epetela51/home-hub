import { callMealMutationAPI } from '../../utils/callMealMutationAPI';

/**
 * Custom hook to delete a meal from the API.
 * Makes a DELETE request to /api/v2/meals/<meal-id>
 *
 * @returns {Function} deleteMeal function that takes a meal ID and returns a promise with response data
 */
export const useDeleteMeal = () => {
  const deleteMeal = async (mealId) => {
    return await callMealMutationAPI(`/api/v2/meals/${mealId}`, 'DELETE');
  };

  return deleteMeal;
};
