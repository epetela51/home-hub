import { formatDateToString, formatDayAndDate } from '../../../../utils/getWeekDates';
import { DAYS_OF_WEEK } from '../../constants';
import SelectedDateInfo from './SelectedDateInfo/SelectedDateInfo';

/**
 * DaySelectionGrid - 7-day calendar for selecting the assignment date.
 * Shows color indicators for meal assignment status: green for assigned, red for unassigned.
 */
const DaySelectionGrid = ({
  selectedDateString,
  weekDates,
  onSelectDate,
  successMessage,
  weeklyPlan,
  meals,
}) => {
  if (successMessage) return null;

  return (
    <div className="space-y-4">
      <SelectedDateInfo
        selectedDateString={selectedDateString}
        weekDates={weekDates}
        weeklyPlan={weeklyPlan}
        meals={meals}
      />
      <div className="grid grid-cols-2 gap-2">
        {DAYS_OF_WEEK.map((dayName) => {
          const date = weekDates[dayName];
          const dateString = formatDateToString(date);
          const { day: dayAbbrev, date: dayOfMonth } = formatDayAndDate(date);
          const isSelected = selectedDateString === dateString;
          const isMealAssigned = weeklyPlan && weeklyPlan[dateString];

          // Determine background color based on meal assignment status
          let baseBackgroundClass = 'bg-white';
          if (isMealAssigned) {
            baseBackgroundClass = 'bg-green-100';
          } else {
            baseBackgroundClass = 'bg-red-100';
          }

          return (
            <button
              key={dayName}
              onClick={() => onSelectDate(dayName)}
              className={`p-3 rounded border-2 transition-all ${
                isSelected ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'
              } ${baseBackgroundClass} text-center`}
            >
              <div className="text-xs font-semibold text-gray-600">{dayAbbrev}</div>
              <div className="text-xl font-bold text-gray-900">{dayOfMonth}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelectionGrid;
