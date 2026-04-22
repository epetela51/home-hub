import { useState } from 'react';
import { useAddMeal } from './useAddMeal';

/**
 * Custom hook to handle the add meal form submission flow.
 * Manages form reset, success state, and button feedback.
 *
 * @returns {Object} Object containing { handleAddMeal, isSuccessful, formResetKey }
 */
export const useHandleAddMeal = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const addMeal = useAddMeal();

  const handleAddMeal = async ({ title, note }) => {
    try {
      await addMeal({ meal: title, note });

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
