import { getSelectedDateInfo } from '../../../utils/mealDateUtils';

/**
 * SelectedDateInfo - Displays information about the selected date.
 * Shows whether a meal is assigned to the selected date and displays the meal name if available.
 *
 * @param {string} selectedDateString - The selected date in YYYY-MM-DD format, or null
 * @param {Object} weekDates - Object mapping day names to Date objects
 * @param {Object} weeklyPlan - Object mapping date strings to meal IDs
 * @param {Array} meals - Array of meal objects with id and meal properties
 */
const SelectedDateInfo = ({ selectedDateString, weekDates, weeklyPlan, meals }) => {
  const dateInfo = getSelectedDateInfo(selectedDateString, weekDates, weeklyPlan, meals);

  if (!dateInfo) return null;

  const { dayAbbrev, formattedDate, mealName } = dateInfo;

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm text-gray-600 mb-1">Selected date:</p>
      <p className="text-lg font-semibold text-gray-900 mb-2">
        {dayAbbrev}: {formattedDate}
      </p>
      {mealName ? (
        <div className="text-sm text-green-700">
          <span className="font-semibold">✓ Meal assigned:</span> {mealName}
        </div>
      ) : (
        <div className="text-sm text-red-700">
          <span className="font-semibold">✗ No meal assigned</span>
        </div>
      )}
    </div>
  );
};

export default SelectedDateInfo;
