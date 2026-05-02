import { callMealMutationAPI } from '../utils/callMealMutationAPI';

/**
 * Custom hook to add a new meal via API.
 * Returns a handler function that makes a POST /api/v2/meals call.
 *
 * @returns {Function} Handler function that takes {meal, note} and adds the meal
 */
export const useAddMeal = () => {
  const addMeal = async (mealData) => {
    const { meal, note } = mealData;

    const payload = {
      meal,
      note: note || null,
    };

    const data = await callMealMutationAPI('/api/v2/meals', 'POST', payload);
    return data?.meal;
  };

  return addMeal;
};
