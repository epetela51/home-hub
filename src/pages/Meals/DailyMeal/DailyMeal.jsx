import { formatDayAndDate } from '../../../utils/getWeekDates';

// import SelectField from '../../../components/SelectField/SelectField';

const DailyMeal = ({ dateString, mealId, meals }) => {
  const selectedMeal = meals.find((meal) => meal.id === mealId);

  // Parse dateString (YYYY-MM-DD) to Date object for formatting
  const date = new Date(dateString);
  const formattedDate = formatDayAndDate(date);

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Left Column: Day and Date Box */}
      <div className="w-14 flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg py-1">
        <div className="text-sm font-bold text-gray-700">{formattedDate.day}</div>
        <div className="text-xl font-semibold text-gray-900">{formattedDate.date}</div>
      </div>

      {/* Right Column: Meal Display */}
      <div className="flex-1 flex flex-col justify-center">
        <h3
          className={`text-lg font-semibold text-left ${selectedMeal ? 'text-green-600' : 'text-red-600'}`}
        >
          {selectedMeal ? selectedMeal.meal : `Nothing planned for ${formattedDate.day}`}
        </h3>
        {/* <SelectField value={mealId || ''} onChange={handleChange} options={meals} /> */}
      </div>
    </div>
  );
};

export default DailyMeal;
