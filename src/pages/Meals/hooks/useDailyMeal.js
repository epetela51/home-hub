import { useMemo } from 'react';
import { useMealPickerSheet } from './useMealPickerSheet';
import { useMealSearch } from './useMealSearch';
import { useSaveMealSelection } from './useSaveMealSelection';
import { useDailyMealHandlers } from './useDailyMealHandlers';

/**
 * Custom hook that orchestrates all DailyMeal logic.
 * Bundles related hooks together to reduce prop drilling and improve clarity.
 *
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @param {string | null} mealId - Current meal ID for the day
 * @param {Array} meals - Array of all available meals
 * @param {Function} onMealSelected - Callback when meal is selected/cleared
 * @returns {Object} All state and handlers needed by DailyMeal component
 */
export const useDailyMeal = (dateString, mealId, meals, onMealSelected) => {
  const { isOpen, openSheet, closeSheet } = useMealPickerSheet();
  const { searchQuery, setSearchQuery, filteredMeals } = useMealSearch();
  const saveMeal = useSaveMealSelection(onMealSelected);
  const { handleSelectMeal, handleClearMeal } = useDailyMealHandlers(
    dateString,
    mealId,
    onMealSelected,
    saveMeal,
    closeSheet,
    setSearchQuery
  );

  const selectedMeal = useMemo(() => meals.find((meal) => meal.id === mealId), [meals, mealId]);
  const filteredMealList = useMemo(() => filteredMeals(meals), [meals, filteredMeals]);

  return {
    isOpen,
    openSheet,
    closeSheet,
    searchQuery,
    setSearchQuery,
    filteredMealList,
    handleSelectMeal,
    handleClearMeal,
    selectedMeal,
  };
};
