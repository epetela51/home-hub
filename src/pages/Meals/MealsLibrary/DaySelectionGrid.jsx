import { formatDateToString, formatDayAndDate } from '../../../utils/getWeekDates';
import { DAYS_OF_WEEK } from '../constants';

/**
 * DaySelectionGrid - 7-day calendar for selecting the assignment date.
 */
const DaySelectionGrid = ({ selectedDateString, weekDates, onSelectDate, successMessage }) => {
  if (successMessage) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {DAYS_OF_WEEK.map((dayName) => {
        const date = weekDates[dayName];
        const dateString = formatDateToString(date);
        const { day: dayAbbrev, date: dayOfMonth } = formatDayAndDate(date);
        const isSelected = selectedDateString === dateString;

        return (
          <button
            key={dayName}
            onClick={() => onSelectDate(dayName)}
            className={`p-3 rounded border-2 transition-all ${
              isSelected
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } text-center`}
          >
            <div className="text-xs font-semibold text-gray-600">{dayAbbrev}</div>
            <div className="text-xl font-bold text-gray-900">{dayOfMonth}</div>
          </button>
        );
      })}
    </div>
  );
};

export default DaySelectionGrid;
