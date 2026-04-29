import MealListItem from './MealListItem';

/**
 * MealList - Reusable component for rendering a list of meals.
 * Used by both MealPickerSheet and MealsLibrary to avoid duplication.
 *
 * @param {Array} meals - Array of meal objects to display
 * @param {Function} onSelectMeal - Callback when a meal is selected (optional)
 * @param {string} emptyMessage - Custom message when no meals are found (optional)
 */
const MealList = ({ meals, onSelectMeal = () => {}, emptyMessage = 'No meals found' }) => {
  if (meals.length > 0) {
    return (
      <div>
        {meals.map((meal) => (
          <MealListItem key={meal.id} meal={meal} onClick={() => onSelectMeal(meal.id)} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-gray-500 text-lg">{emptyMessage}</p>
    </div>
  );
};

export default MealList;
