/**
 * Parse a date string (YYYY-MM-DD) as a local date, not UTC.
 *
 * CRITICAL TIMEZONE FIX: new Date('YYYY-MM-DD') parses as UTC, causing timezone offset issues.
 * Example without this fix:
 *   User in EDT (UTC-4): new Date('2026-04-28') → April 27, 8:00 PM EDT (WRONG - previous day!)
 *
 * This function ensures dates are parsed in the user's local timezone.
 * Example with this fix:
 *   User in EDT: parseLocalDate('2026-04-28') → April 28, 12:00 AM EDT (CORRECT)
 *
 * @param {string} dateString - Date string in format YYYY-MM-DD (e.g., '2026-04-28')
 * @returns {Date} Date object at midnight in user's local timezone
 */
export const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Get the Monday of the current week
 * @param {Date} date - optional date to calculate from (defaults to today)
 * @returns {Date} Monday of the week
 */
const getMondayOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  // Calculate days to go back to Monday: Sunday (0)→-6, Mon (1)→0, Tue (2)→-1, etc.
  const daysToGoBack = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - daysToGoBack);
  return d;
};

/**
 * Get all dates for the week (Monday-Sunday)
 * @param {Date} startDate - optional date to calculate from (defaults to today)
 * @param {number} weekOffset - number of weeks to offset (e.g., -1 for last week, 1 for next week, 0 for current)
 * @returns {Object} object mapping day names to Date objects
 */
export const getWeekDates = (startDate = new Date(), weekOffset = 0) => {
  let monday = getMondayOfWeek(startDate);

  // Apply week offset
  if (weekOffset !== 0) {
    monday = new Date(monday);
    monday.setDate(monday.getDate() + weekOffset * 7);
  }

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
 * Format date as YYYY-MM-DD string
 * @param {Date} date - the date to format
 * @returns {string} date formatted as YYYY-MM-DD (e.g., "2026-04-27")
 */
export const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

/**
 * Get week label based on week offset
 * @param {number} weekOffset - offset from current week (-1, 0, 1, etc.)
 * @returns {string} label for the week
 */
export const getWeekLabel = (weekOffset) => {
  switch (weekOffset) {
    case 0:
      return 'This Week';
    case -1:
      return 'Previous Week';
    case 1:
      return 'Next Week';
    default:
      return `Week ${weekOffset > 0 ? '+' : ''}${weekOffset}`;
  }
};

/**
 * Format date range for display in the week navigation header
 * @param {Object} weekDates - object with Monday and Sunday Date objects
 * @returns {string} formatted date range (e.g., "Apr 21-27" or "Mar 31 - Apr 2")
 */
export const getFormattedDateRange = (weekDates) => {
  const monday = weekDates.Monday;
  const sunday = weekDates.Sunday;
  const mondayMonth = monday?.toLocaleDateString('en-US', { month: 'short' });
  const sundayMonth = sunday?.toLocaleDateString('en-US', { month: 'short' });
  const startDay = monday?.getDate();
  const endDay = sunday?.getDate();

  if (mondayMonth === sundayMonth) {
    return `${mondayMonth} ${startDay}-${endDay}`;
  } else {
    return `${mondayMonth} ${startDay} - ${sundayMonth} ${endDay}`;
  }
};
