import MealForm from '../MealForm/MealForm';

const NewMeals = () => {
  const handleAddMeal = ({ title, note }) => {
    console.log('Adding new meal:', { title, note });
    // TODO: Send POST request to save meal when API is ready
  };

  return (
    <MealForm
      title="Add New Meal"
      submitButtonLabel="Add Meal"
      onSubmit={handleAddMeal}
      showCancelButton={false}
    />
  );
};

export default NewMeals;
