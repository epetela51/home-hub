import { formatDayAndDate } from '../../../utils/getWeekDates';

// import SelectField from '../../../components/SelectField/SelectField';

const DailyMeal = ({ day, date, mealId, meals }) => {
  const selectedMeal = meals.find((meal) => meal.id === mealId);
  const formattedDate = date ? formatDayAndDate(date) : { day: '?', date: '?' };

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Left Column: Day and Date Box */}
      <div className="w-20 flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg py-3">
        <div className="text-sm font-bold text-gray-700">{formattedDate.day}</div>
        <div className="text-xl font-semibold text-gray-900">{formattedDate.date}</div>
      </div>

      {/* Right Column: Meal Display */}
      <div className="flex-1 flex flex-col justify-center">
        <h3
          className={`text-lg font-semibold text-left ${selectedMeal ? 'text-green-600' : 'text-red-600'}`}
        >
          {selectedMeal ? selectedMeal.meal : `Nothing planned for ${day}`}
        </h3>
        {/* <SelectField value={mealId || ''} onChange={handleChange} options={meals} /> */}
      </div>
    </div>
  );
};

export default DailyMeal;
