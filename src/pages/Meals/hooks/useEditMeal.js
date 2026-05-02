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

    try {
      const res = await fetch(`/api/v2/meals/${mealId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      return data?.meal;
    } catch (err) {
      console.error('Error editing meal:', err);
      throw err;
    }
  };

  return editMeal;
};
