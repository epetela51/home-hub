import { useEditMeal } from './useEditMeal';

/**
 * Orchestrates the edit meal API call.
 * Returns a promise that resolves with the updated meal from the API.
 *
 * @returns {Function} handleEditMeal function
 */
export const useHandleEditMeal = () => {
  const editMeal = useEditMeal();

  const handleEditMeal = async (mealId, originalMeal, mealData) => {
    const response = await editMeal({
      mealId,
      meal: mealData.meal,
      note: mealData.note,
    });
    return response;
  };

  return handleEditMeal;
};
