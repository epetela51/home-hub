import MealForm from '../MealForm/MealForm';

import { useHandleAddMeal } from '../hooks/useHandleAddMeal';

const NewMeals = ({ onMealAdded }) => {
  const { handleAddMeal, isSuccessful, formResetKey } = useHandleAddMeal(onMealAdded);

  return (
    <MealForm
      key={formResetKey}
      title=""
      submitButtonLabel={isSuccessful ? '✓ Added!' : 'Add Meal'}
      onSubmit={handleAddMeal}
      showCancelButton={false}
      isSubmitSuccess={isSuccessful}
    />
  );
};

export default NewMeals;
