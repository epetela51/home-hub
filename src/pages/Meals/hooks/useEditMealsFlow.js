import { useState } from 'react';

const useEditMealsFlow = (meals = []) => {
  const [mode, setMode] = useState('select'); // 'select' or 'edit'
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);

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

  const handleDeleteClick = () => {
    console.log(`Deleting meal ID ${selectedMealId}: ${selectedMeal.meal}`);
    // TODO: Add API call to delete meal when ready
    // For now, just log to console
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
