import MealSelector from '../MealSelector/MealSelector';
import MealForm from '../MealForm/MealForm';
import MealOptions from '../MealOptions/MealOptions';
import useEditMealsFlow from '../hooks/useEditMealsFlow';

const EditMeals = ({ meals = [], onMealDeleted }) => {
  const {
    mode,
    selectedMeal,
    selectedMealId,
    handleMealSelect,
    handleEditClick,
    handleDeleteClick,
    handleBackClick,
    handleSaveMeal,
    handleCancelEdit,
  } = useEditMealsFlow(meals, onMealDeleted);

  // Dropdown to choose meal
  if (mode === 'select' && !selectedMeal) {
    return <MealSelector meals={meals} onSelect={handleMealSelect} />;
  }

  // Meal selected, show details + buttons to edit or delete
  if (mode === 'select' && selectedMeal) {
    return (
      <MealOptions
        meal={selectedMeal}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onBack={handleBackClick}
      />
    );
  }

  // Show Meal input fields with prefilled data
  if (mode === 'edit' && selectedMeal) {
    return (
      <MealForm
        key={selectedMealId}
        initialTitle={selectedMeal.meal}
        initialNote={selectedMeal.note || ''}
        title="Edit Meal"
        submitButtonLabel="Save Meal"
        onSubmit={handleSaveMeal}
        showCancelButton={true}
        onCancel={handleCancelEdit}
      />
    );
  }

  return null;
};

export default EditMeals;
