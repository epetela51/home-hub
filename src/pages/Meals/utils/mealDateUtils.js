import { formatDayAndDate, formatDateAsMonthDay } from '../../../utils/getWeekDates';

/**
 * Create a map of meal IDs to meal names for quick lookup.
 * @param {Array} meals - Array of meal objects with id and meal properties
 * @returns {Object} Object mapping meal IDs to meal names
 */
const getMealMap = (meals) => {
  return meals.reduce((acc, meal) => {
    acc[meal.id] = meal.meal;
    return acc;
  }, {});
};

/**
 * Find the day name for a given date string.
 * @param {string} selectedDateString - Date in YYYY-MM-DD format
 * @param {Object} weekDates - Object mapping day names to Date objects
 * @returns {string} The day name (e.g., 'Monday', 'Tuesday')
 */
const getSelectedDayName = (selectedDateString, weekDates) => {
  return Object.keys(weekDates).find((day) => {
    const date = weekDates[day];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day_num = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day_num}` === selectedDateString;
  });
};

/**
 * Get all the information needed to display selected date info.
 * @param {string} selectedDateString - Date in YYYY-MM-DD format
 * @param {Object} weekDates - Object mapping day names to Date objects
 * @param {Object} weeklyPlan - Object mapping date strings to meal IDs
 * @param {Array} meals - Array of meal objects with id and meal properties
 * @returns {Object|null} Object with dayAbbrev, formattedDate, and mealName, or null if no date selected
 */
export const getSelectedDateInfo = (selectedDateString, weekDates, weeklyPlan, meals) => {
  if (!selectedDateString) return null;

  const mealMap = getMealMap(meals);
  const selectedDayName = getSelectedDayName(selectedDateString, weekDates);
  const selectedDate = weekDates[selectedDayName];
  const { day: dayAbbrev } = formatDayAndDate(selectedDate);
  const formattedDate = formatDateAsMonthDay(selectedDate);
  const mealId = weeklyPlan?.[selectedDateString];
  const mealName = mealId ? mealMap[mealId] : null;

  return {
    dayAbbrev,
    formattedDate,
    mealName,
  };
};
