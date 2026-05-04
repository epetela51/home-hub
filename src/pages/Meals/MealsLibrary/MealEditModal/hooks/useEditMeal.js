import { callMealMutationAPI } from '../../../utils/callMealMutationAPI';

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

    const data = await callMealMutationAPI(`/api/v2/meals/${mealId}`, 'PUT', payload);
    return data?.meal;
  };

  return editMeal;
};
