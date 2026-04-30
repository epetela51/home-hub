import { useState } from 'react';

export const useMealPlan = ({ initialMealPlan = {} }) => {
  const [mealChange, setmealChange] = useState({});

  // Merge initialMealPlan with user mealChange (mealChange override initial)
  const mealPlan = { ...initialMealPlan, ...mealChange };

  const handlePlanChange = (day, mealId) => {
    setmealChange((prev) => ({
      ...prev,
      [day]: mealId,
    }));
  };

  const resetMealPlan = () => {
    setmealChange({});
  };

  return { mealPlan, handlePlanChange, resetMealPlan };
};
