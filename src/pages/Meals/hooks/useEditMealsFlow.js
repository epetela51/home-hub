import { useState } from 'react';
import { useHandleDeleteMeal } from './useHandleDeleteMeal';

const useEditMealsFlow = (meals = [], onMealDeleted) => {
  const [mode, setMode] = useState('select'); // 'select' or 'edit'
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const handleDeleteMeal = useHandleDeleteMeal(onMealDeleted);

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

  const handleSaveMeal = ({ title, note }) => {
    console.log(`Saving meal: { id: ${selectedMealId}, title: "${title}", note: "${note}" }`);
    // TODO: Add API call to save meal when ready
    // For now, just log to console
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
