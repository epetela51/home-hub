import { useState } from 'react';

import { useAddMeal } from './useAddMeal';

/**
 * Custom hook for managing meal add modal logic.
 * Handles form submission, success state, form reset, and closing logic.
 *
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onMealAdded - Callback when a new meal is successfully added with (newMeal)
 * @returns {Object} Object containing:
 *   - isSubmitSuccess: Boolean indicating if form was just submitted successfully
 *   - handleSubmit: Function to handle form submission
 *   - handleCancel: Function to handle cancel button click
 *   - formResetKey: Key to reset the form when changed
 */
export const useAddMealModal = (onClose, onMealAdded) => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const addMeal = useAddMeal();

  const handleSubmit = async ({ title, note }) => {
    try {
      // POST the new meal and capture the response with the meal ID
      const newMeal = await addMeal({ meal: title, note });

      // Add the new meal to parent state
      if (onMealAdded) {
        onMealAdded(newMeal);
      }

      // Show success state on button for 2 seconds
      setIsSubmitSuccess(true);
      setTimeout(() => {
        setIsSubmitSuccess(false);
      }, 2000);

      // Reset the form by changing the key
      setFormResetKey((prev) => prev + 1);

      // Close modal after a short delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      console.error('Failed to add meal:', err);
      setIsSubmitSuccess(false);
    }
  };

  const handleCancel = () => {
    setIsSubmitSuccess(false);
    onClose();
  };

  return {
    isSubmitSuccess,
    handleSubmit,
    handleCancel,
    formResetKey,
  };
};
