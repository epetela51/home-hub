import { getWeekLabel, getFormattedDateRange } from '../../../../utils/getWeekDates';

const WeekNavigationBar = ({ weekOffset, setWeekOffset, weekDates }) => {
  const handlePreviousWeek = () => {
    setWeekOffset(Math.max(weekOffset - 1, -1));
  };

  const handleNextWeek = () => {
    setWeekOffset(Math.min(weekOffset + 1, 1));
  };

  const BUTTON_CLASSES =
    'text-2xl text-blue-500 hover:text-blue-600 transition disabled:text-gray-300 disabled:cursor-not-allowed px-2';

  return (
    <div className="flex items-center justify-center gap-6 my-8">
      <button onClick={handlePreviousWeek} disabled={weekOffset === -1} className={BUTTON_CLASSES}>
        &lt;
      </button>
      <div className="text-center min-w-max">
        <p className="text-4xl font-semibold text-gray-900">{getWeekLabel(weekOffset)}</p>
        <p className="text-xl text-gray-600">{getFormattedDateRange(weekDates)}</p>
      </div>
      <button onClick={handleNextWeek} disabled={weekOffset === 1} className={BUTTON_CLASSES}>
        &gt;
      </button>
    </div>
  );
};

export default WeekNavigationBar;
