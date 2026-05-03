import { useState } from 'react';

export const useMealPlan = ({ initialMealPlan = {} }) => {
  const [mealChange, setMealChange] = useState({});

  // Merge initialMealPlan with user mealChange (mealChange override initial)
  const mealPlan = { ...initialMealPlan, ...mealChange };

  const handlePlanChange = (day, mealId) => {
    setMealChange((prev) => ({
      ...prev,
      [day]: mealId,
    }));
  };

  const resetMealPlan = () => {
    setMealChange({});
  };

  return { mealPlan, handlePlanChange, resetMealPlan };
};
