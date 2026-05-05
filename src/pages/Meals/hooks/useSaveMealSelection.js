import { getApiBaseUrl } from '@/config/apiConfig';

/**
 * Custom hook to save meal selection via API with optimistic update rollback.
 * Implements optimistic update pattern: assumes success, reverts on API failure via callback.
 *
 * @param {Function} onSaveFailed - Callback invoked on API failure to revert optimistic update.
 *   Signature: (dateString: string, previousMealId: string | null) => void
 *   Called with the PREVIOUS meal ID to restore state to pre-update condition.
 *   Example: If user changed 2026-04-28 from Pasta (id:5) to Salad (id:8), and API fails,
 *   this is called as onSaveFailed('2026-04-28', 5) to restore Pasta.
 *
 * @returns {Function} Handler function
 *   Signature: (dateString: string, mealId: string | null, previousMealId: string | null) => Promise
 *   @param {string} dateString - Date in YYYY-MM-DD format
 *   @param {string | null} mealId - New meal ID to save (null to clear meal)
 *   @param {string | null} previousMealId - Previous meal ID (used for rollback)
 *   @throws {Error} If API request fails
 */
export const useSaveMealSelection = (onSaveFailed) => {
  const saveMeal = async (dateString, mealId, previousMealId) => {
    const payload = {
      date: dateString,
      meal_id: mealId,
    };

    /**
     * Uses try/catch here (vs. other hooks) because we have specific error handling:
     * 1. Rollback optimistic update on failure (onMealSaved callback)
     * 2. Show error alert to user
     * Still throws error so caller can handle if needed.
     */
    try {
      const apiBaseUrl = getApiBaseUrl();
      const res = await fetch(`${apiBaseUrl}/v2/daily-meal`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(`Error saving meal for ${dateString}:`, err);
      // Rollback optimistic update on failure
      if (onSaveFailed) {
        onSaveFailed(dateString, previousMealId);
      }
      alert('Failed to save meal selection');
      throw err;
    }
  };

  return saveMeal;
};
