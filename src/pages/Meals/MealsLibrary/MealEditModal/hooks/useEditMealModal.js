import { useState } from 'react';

import { useEditMeal } from './useEditMeal';

/**
 * Custom hook for managing meal edit modal logic.
 * Handles state, form submission, and closing logic.
 *
 * @param {Object} meal - Meal object being edited with { id, meal, note }
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onMealUpdated - Callback when meal is successfully updated with (updatedMeal)
 * @returns {Object} Object containing:
 *   - isSubmitSuccess: Boolean indicating if form was just submitted successfully
 *   - handleSubmit: Function to handle form submission
 *   - handleCancel: Function to handle cancel button click
 */
export const useEditMealModal = (meal, onClose, onMealUpdated) => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const editMeal = useEditMeal();

  const handleSubmit = async ({ title, note }) => {
    try {
      const updatedMeal = await editMeal({
        mealId: meal.id,
        meal: title,
        note,
      });

      setIsSubmitSuccess(true);
      if (onMealUpdated) {
        onMealUpdated(updatedMeal);
      }

      setTimeout(() => {
        setIsSubmitSuccess(false);
        onClose();
      }, 500);
    } catch (err) {
      console.error('Failed to edit meal:', err);
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
  };
};
