import SelectField from '../../../components/SelectField/SelectField';

const DailyMeal = ({ day, mealId, meals, onMealChange }) => {
  const handleChange = (selectedMealId) => {
    const mealIdValue = selectedMealId === '' ? null : Number(selectedMealId);
    onMealChange(day, mealIdValue);
  };

  // Find the selected meal to display next to the day
  const selectedMeal = meals.find((meal) => meal.id === mealId);
  const dayDisplay = selectedMeal ? `${day} - ${selectedMeal.meal}` : day;

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3
        className={`text-lg font-semibold mb-3 ${selectedMeal ? 'text-green-600' : 'text-red-600'}`}
      >
        {dayDisplay}
      </h3>
      <SelectField value={mealId || ''} onChange={handleChange} options={meals} />
    </div>
  );
};

export default DailyMeal;
