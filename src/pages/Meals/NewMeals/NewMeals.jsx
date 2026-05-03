import { useAddMealFlow } from '../hooks/useAddMealFlow';

import MealForm from '../MealForm/MealForm';

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
