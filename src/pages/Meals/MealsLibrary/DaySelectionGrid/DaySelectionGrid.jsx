import { DAYS_OF_WEEK } from '../../constants';
import SelectedDateInfo from './SelectedDateInfo/SelectedDateInfo';
import DayCard from './DayCard/DayCard';

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
        {DAYS_OF_WEEK.map((dayName) => (
          <DayCard
            key={dayName}
            dayName={dayName}
            date={weekDates[dayName]}
            selectedDateString={selectedDateString}
            onSelectDate={onSelectDate}
            weeklyPlan={weeklyPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default DaySelectionGrid;
