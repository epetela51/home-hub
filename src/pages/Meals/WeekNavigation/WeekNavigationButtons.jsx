const BUTTON_CLASSES =
  'px-4 py-2 text-2xl text-blue-500 hover:text-blue-600 transition disabled:text-gray-400 disabled:cursor-not-allowed';

const WeekNavigationButtons = ({ weekOffset, onPreviousWeek, onNextWeek }) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <button onClick={onPreviousWeek} disabled={weekOffset === -1} className={BUTTON_CLASSES}>
        &lt;
      </button>
      <button onClick={onNextWeek} disabled={weekOffset === 1} className={BUTTON_CLASSES}>
        &gt;
      </button>
    </div>
  );
};

export default WeekNavigationButtons;
