import { useState } from 'react';

import { useAddMeal } from '../../hooks/useAddMeal';

/**
 * Custom hook to handle the add meal form submission flow.
 * Manages form reset, success state, and button feedback.
 * Calls onMealAdded callback with the newly created meal to update parent state.
 *
 * @param {Function} onMealAdded - Callback that receives the new meal object with ID
 * @returns {Object} Object containing { handleAddMeal, isSuccessful, formResetKey }
 */
export const useAddMealFlow = (onMealAdded) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const addMeal = useAddMeal();

  const handleAddMeal = async ({ title, note }) => {
    try {
      // POST the new meal and capture the response with the meal ID
      const newMeal = await addMeal({ meal: title, note });

      /**
       * Add the new meal to parent state (dropdown options updated silently)
       * This allows a new meal to be added to the drop down without needing to make another refetch API call
       */
      if (onMealAdded) {
        onMealAdded(newMeal);
      }

      // Show success state on button for 2 seconds
      setIsSuccessful(true);
      setTimeout(() => {
        setIsSuccessful(false);
      }, 2000);

      // Reset the form by changing the key
      setFormResetKey((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to add meal:', err);
    }
  };

  return { handleAddMeal, isSuccessful, formResetKey };
};
