import MealForm from '../MealForm/MealForm';

import { useHandleAddMeal } from '../hooks/useHandleAddMeal';

const NewMeals = () => {
  const { handleAddMeal, isSuccessful, formResetKey } = useHandleAddMeal();

  return (
    <MealForm
      key={formResetKey}
      title="Add New Meal"
      submitButtonLabel={isSuccessful ? '✓ Added!' : 'Add Meal'}
      onSubmit={handleAddMeal}
      showCancelButton={false}
      isSubmitSuccess={isSuccessful}
    />
  );
};

export default NewMeals;
