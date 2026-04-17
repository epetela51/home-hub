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

  const handleResetWeek = useCallback(() => {
    // Set all days to null to override initialMealPlan
    const resetValues = Object.keys(initialMealPlan).reduce((acc, day) => {
      acc[day] = null;
      return acc;
    }, {});
    setmealChange(resetValues);
  }, [initialMealPlan]);

  return { mealPlan, handlePlanChange, handleResetWeek };
};
