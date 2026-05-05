import { callMealMutationAPI } from '../../utils/callMealMutationAPI';
import { getApiBaseUrl } from '@/config/apiConfig';

/**
 * Custom hook to delete a meal from the API.
 * Makes a DELETE request to /api/v2/meals/<meal-id>
 *
 * @returns {Function} deleteMeal function that takes a meal ID and returns a promise with response data
 */
export const useDeleteMeal = () => {
  const deleteMeal = async (mealId) => {
    const apiBaseUrl = getApiBaseUrl();
    return await callMealMutationAPI(`${apiBaseUrl}/v2/meals/${mealId}`, 'DELETE');
  };

  return deleteMeal;
};
