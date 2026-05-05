import { formatDateToString, formatDayAndDate } from '../../../../../utils/getWeekDates';

/**
 * Get the formatted date string (YYYY-MM-DD) for display and comparison
 */
export const getDateString = (date) => {
  return formatDateToString(date);
};

/**
 * Get formatted day abbreviation and day of month for display
 */
export const getDateDisplay = (date) => {
  return formatDayAndDate(date);
};

/**
 * Check if the given date string matches the selected date
 */
export const isDateSelected = (selectedDateString, dateString) => {
  return selectedDateString === dateString;
};

/**
 * Get the background color class based on meal assignment status
 */
export const getMealAssignmentClass = (weeklyPlan, dateString) => {
  if (weeklyPlan && weeklyPlan[dateString]) {
    return 'bg-green-100';
  }
  return 'bg-red-100';
};
