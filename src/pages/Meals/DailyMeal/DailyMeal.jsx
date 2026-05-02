import React from 'react';
import { useMemo } from 'react';
import { formatDayAndDate, parseLocalDate } from '../../../utils/getWeekDates';
import { useMealPickerSheet } from '../hooks/useMealPickerSheet';
import { useMealSearch } from '../hooks/useMealSearch';
import { useSaveMealSelection } from '../hooks/useSaveMealSelection';
import { useDailyMealHandlers } from '../hooks/useDailyMealHandlers';

import MealPickerSheet from '../MealPickerSheet/MealPickerSheet';

const DailyMeal = ({ dateString, mealId, meals, onMealSelected }) => {
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

  const selectedMeal = meals.find((meal) => meal.id === mealId);

  // Parse as local date to avoid timezone offset (parseLocalDate handles YYYY-MM-DD correctly)
  const date = parseLocalDate(dateString);
  const formattedDate = formatDayAndDate(date);

  const memoizedFilteredMeals = useMemo(() => filteredMeals(meals), [meals, filteredMeals]);

  return (
    <>
      <div
        onClick={openSheet}
        className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        {/* Left Column: Day and Date Box */}
        <div className="w-14 flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg py-1">
          <div className="text-sm font-bold text-gray-700">{formattedDate.day}</div>
          <div className="text-xl font-semibold text-gray-900">{formattedDate.date}</div>
        </div>

        {/* Right Column: Meal Display */}
        <div className="flex-1 flex flex-col justify-center">
          <h3
            className={`text-lg font-semibold text-left ${selectedMeal ? 'text-green-600' : 'text-red-600'}`}
          >
            {selectedMeal ? selectedMeal.meal : `Nothing planned for ${formattedDate.day}`}
          </h3>
        </div>
      </div>

      {/* Meal Picker Sheet */}
      <MealPickerSheet
        isOpen={isOpen}
        onClose={closeSheet}
        filteredMeals={memoizedFilteredMeals}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectMeal={handleSelectMeal}
        currentMeal={selectedMeal}
        onClearMeal={handleClearMeal}
      />
    </>
  );
};

export default React.memo(DailyMeal);
