import { useCallback, useState } from 'react';

export const useMealPlan = ({ initialMealPlan = {} }) => {
  const [mealChange, setmealChange] = useState({});

  // Merge initialMealPlan with user mealChange (mealChange override initial)
  const mealPlan = { ...initialMealPlan, ...mealChange };

  const handlePlanChange = useCallback((day, mealId) => {
    setmealChange((prev) => ({
      ...prev,
      [day]: mealId,
    }));
  }, []);

  const resetMealPlan = useCallback(() => {
    setmealChange({});
  }, []);

  return { mealPlan, handlePlanChange, resetMealPlan };
};
