import { useState } from 'react';
import { useHandleDeleteMeal } from './useHandleDeleteMeal';
import { useHandleEditMeal } from './useHandleEditMeal';

const useEditMealsFlow = (meals = [], onMealDeleted, onMealEdited) => {
  const [mode, setMode] = useState('select'); // 'select' or 'edit'
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const handleDeleteMeal = useHandleDeleteMeal(onMealDeleted);
  const handleEditMeal = useHandleEditMeal(onMealEdited);

  const handleMealSelect = (mealIdStr) => {
    const mealId = mealIdStr ? Number(mealIdStr) : null;
    if (mealId !== null) {
      const meal = meals.find((m) => m.id === mealId);
      setSelectedMealId(mealId);
      setSelectedMeal(meal);
    }
  };

  const handleEditClick = () => {
    setMode('edit');
  };

  const handleDeleteClick = async () => {
    if (selectedMealId) {
      await handleDeleteMeal(selectedMealId);
      // Reset UI back to select mode and clear selection
      setMode('select');
      setSelectedMealId(null);
      setSelectedMeal(null);
    }
  };

  const handleBackClick = () => {
    setSelectedMealId(null);
    setSelectedMeal(null);
  };

  const handleSaveMeal = async ({ title, note }) => {
    if (selectedMealId) {
      await handleEditMeal(selectedMealId, selectedMeal, {
        meal: title,
        note,
      });
      // Reset UI back to select mode and clear selection
      setMode('select');
      setSelectedMealId(null);
      setSelectedMeal(null);
    }
  };

  const handleCancelEdit = () => {
    setMode('select');
  };

  return {
    mode,
    selectedMealId,
    selectedMeal,
    handleMealSelect,
    handleEditClick,
    handleDeleteClick,
    handleBackClick,
    handleSaveMeal,
    handleCancelEdit,
  };
};

export default useEditMealsFlow;
