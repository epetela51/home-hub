import { useEditMeal } from './useEditMeal';

/**
 * Orchestrates the edit meal flow: calls the API, parses response data,
 * and triggers onMealEdited callback so parent can update state.
 *
 * @param {Function} onMealEdited - Callback that receives (updatedMeal, originalMeal)
 * @returns {Function} handleEditMeal function
 */
export const useHandleEditMeal = (onMealEdited) => {
  const editMeal = useEditMeal();

  const handleEditMeal = async (mealId, originalMeal, mealData) => {
    try {
      const response = await editMeal({
        mealId,
        meal: mealData.meal,
        note: mealData.note,
      });

      // Call the callback with the updated meal and original meal for comparison
      if (onMealEdited) {
        onMealEdited(response, originalMeal);
      }
    } catch (err) {
      console.error('Failed to edit meal:', err);
    }
  };

  return handleEditMeal;
};
