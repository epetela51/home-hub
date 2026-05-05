import { callMealMutationAPI } from '../../../utils/callMealMutationAPI';
import { getApiBaseUrl } from '@/config/apiConfig';

/**
 * Custom hook to edit an existing meal via API.
 * Returns a handler function that makes a PUT /api/v2/meals/<meal-id> call.
 *
 * @returns {Function} Handler function that takes { mealId, meal, note } and edits the meal
 */
export const useEditMeal = () => {
  const editMeal = async (mealData) => {
    const { mealId, meal, note } = mealData;

    const payload = {
      meal,
      note: note || null,
    };

    const apiBaseUrl = getApiBaseUrl();
    const data = await callMealMutationAPI(`${apiBaseUrl}/v2/meals/${mealId}`, 'PUT', payload);
    return data?.meal;
  };

  return editMeal;
};
