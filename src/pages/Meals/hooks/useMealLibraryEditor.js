import { useState } from 'react';

/**
 * Custom hook for managing the meal library editor state and actions.
 * Handles state management for expanded rows, edit modal, and all related actions.
 *
 * @param {Array} meals - Array of all meals
 * @param {Function} setMeals - Setter for meals array
 * @param {Function} performDelete - Function to delete a meal from API
 * @returns {Object} Object containing:
 *   State:
 *   - expandedMealId: ID of the currently expanded meal (null if none)
 *   - selectedMealForEdit: Meal object being edited (null if none)
 *   - isModalOpen: Whether the edit modal is open
 *   Handlers:
 *   - handleToggleMeal: Toggle expand/collapse for a meal row
 *   - handleEditMeal: Open edit modal for a meal
 *   - handleDeleteMealClick: Delete a meal
 *   - handleMealUpdated: Update meal data after successful edit
 *   - handleModalClose: Close the edit modal
 */
export const useMealLibraryEditor = (meals, setMeals, performDelete) => {
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [selectedMealForEdit, setSelectedMealForEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleMeal = (mealId) => {
    if (expandedMealId === mealId) {
      setExpandedMealId(null);
    } else {
      setExpandedMealId(mealId);
    }
  };

  const handleEditMeal = (meal) => {
    setSelectedMealForEdit(meal);
    setIsModalOpen(true);
  };

  const handleDeleteMealClick = async (mealId) => {
    try {
      await performDelete(mealId);
      // Remove deleted meal from list
      setMeals((prevMeals) => prevMeals.filter((m) => m.id !== mealId));
      setExpandedMealId(null);
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
  };

  const handleMealUpdated = (updatedMeal) => {
    // Update the meal in the list with the updated data
    setMeals((prevMeals) =>
      prevMeals.map((m) =>
        m.id === updatedMeal.id ? { ...m, meal: updatedMeal.meal, note: updatedMeal.note } : m
      )
    );
    setExpandedMealId(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMealForEdit(null);
  };

  return {
    expandedMealId,
    selectedMealForEdit,
    isModalOpen,
    handleToggleMeal,
    handleEditMeal,
    handleDeleteMealClick,
    handleMealUpdated,
    handleModalClose,
  };
};
