import { useState } from 'react';
import { useAddMeal } from './useAddMeal';

/**
 * Custom hook to handle the add meal form submission flow.
 * Manages form reset, success state, and button feedback.
 * Triggers refetch of meals after successful add to update dropdowns.
 *
 * @param {Function} refetch - Function to refetch meals list from API
 * @returns {Object} Object containing { handleAddMeal, isSuccessful, formResetKey }
 */
export const useHandleAddMeal = (refetch) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const addMeal = useAddMeal();

  const handleAddMeal = async ({ title, note }) => {
    try {
      await addMeal({ meal: title, note });

      // Refetch meals to show new meal in dropdowns
      if (refetch) {
        refetch();
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
