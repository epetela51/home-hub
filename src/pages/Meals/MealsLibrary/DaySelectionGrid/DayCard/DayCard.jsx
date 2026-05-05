import {
  getDateString,
  getDateDisplay,
  isDateSelected,
  getMealAssignmentClass,
} from './dayCardUtils';

/**
 * DayCard - Individual day selector button with meal assignment status color.
 * Presentational component that delegates logic to dayCardUtils.
 */
const DayCard = ({ dayName, date, selectedDateString, onSelectDate, weeklyPlan }) => {
  const dateString = getDateString(date);
  const { day: dayAbbrev, date: dayOfMonth } = getDateDisplay(date);
  const selected = isDateSelected(selectedDateString, dateString);
  const backgroundClass = getMealAssignmentClass(weeklyPlan, dateString);

  return (
    <button
      key={dayName}
      onClick={() => onSelectDate(dayName)}
      className={`p-3 rounded border-2 transition-all ${
        selected ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'
      } ${backgroundClass} text-center`}
    >
      <div className="text-xs font-semibold text-gray-600">{dayAbbrev}</div>
      <div className="text-xl font-bold text-gray-900">{dayOfMonth}</div>
    </button>
  );
};

export default DayCard;
