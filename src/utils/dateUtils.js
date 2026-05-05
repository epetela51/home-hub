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
 * Format date as MM/DD string
 * @param {Date} date - the date to format
 * @returns {string} date formatted as MM/DD (e.g., "05/15")
 */
export const formatDateAsMonthDay = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};
