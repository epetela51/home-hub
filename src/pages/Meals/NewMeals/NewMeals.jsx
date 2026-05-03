import MealForm from '../MealForm/MealForm';

import { useAddMealFlow } from '../hooks/useAddMealFlow';

const NewMeals = ({ onMealAdded }) => {
  const { handleAddMeal, isSuccessful, formResetKey } = useAddMealFlow(onMealAdded);

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
