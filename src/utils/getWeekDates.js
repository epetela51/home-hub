/**
 * Get the Monday of the current week
 * @param {Date} date - optional date to calculate from (defaults to today)
 * @returns {Date} Monday of the week
 */
const getMondayOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  return new Date(d.setDate(diff));
};

/**
 * Get all dates for the week (Monday-Sunday)
 * @param {Date} startDate - optional date to calculate from (defaults to today)
 * @returns {Object} object mapping day names to Date objects
 */
export const getWeekDates = (startDate = new Date()) => {
  const monday = getMondayOfWeek(startDate);
  const dates = {};
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  dayNames.forEach((day, index) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + index);
    dates[day] = date;
  });

  return dates;
};

/**
 * Format abbreviated day with date
 * @param {Date} date - the date to format
 * @returns {Object} object with 'day' (abbreviated, e.g., "Sun") and 'date' (number, e.g., 26)
 */
export const formatDayAndDate = (date) => {
  const abbreviatedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayAbbrev = abbreviatedDays[date.getDay()];
  const dayOfMonth = date.getDate();

  return {
    day: dayAbbrev,
    date: dayOfMonth,
  };
};
