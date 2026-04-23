import { useCallback, useMemo } from 'react';
import { useMealPlan } from '../hooks/useMealPlan';
import { useResetWeeklyPlan } from '../hooks/useResetWeeklyPlan';
import { useFetchMeals } from '../hooks/useFetchMeals';

import Button from '../../../components/Button/Button';
import DailyMeal from '../DailyMeal/DailyMeal';
import NewMeals from '../NewMeals/NewMeals';
import EditMeals from '../EditMeals/EditMeals';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Meals = () => {
  const { meals, setMeals, weeklyPlan, isLoading } = useFetchMeals();

  const { mealPlan, handlePlanChange, resetMealPlan } = useMealPlan({
    initialMealPlan: weeklyPlan,
  });
  const { resetWeeklyPlan, isResetting } = useResetWeeklyPlan();

  // Memoize meals array so it only changes when content actually changes
  const memoizedMeals = useMemo(() => meals, [meals]);

  const handleMealAdded = useCallback(
    (newMeal) => {
      setMeals((prevMeals) => [...prevMeals, newMeal]);
    },
    [setMeals]
  );

  const handleResetWeek = useCallback(async () => {
    try {
      await resetWeeklyPlan();
      resetMealPlan();
    } catch {
      // Error already logged in useResetWeeklyPlan hook
    }
  }, [resetWeeklyPlan, resetMealPlan]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <Button url="/" text="Go Home" />
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Plan</h2>

        <button
          onClick={handleResetWeek}
          disabled={isResetting}
          className="px-4 py-2 my-6 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:bg-red-300 disabled:cursor-not-allowed"
        >
          {isResetting ? 'Resetting...' : 'Reset Week'}
        </button>
        {isLoading ? (
          <p className="text-2xl text-gray-600">Loading meal plan for the week...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DAYS_OF_WEEK.map((day) => (
                <DailyMeal
                  key={day}
                  day={day}
                  mealId={mealPlan[day]}
                  meals={memoizedMeals}
                  onMealChange={handlePlanChange}
                />
              ))}
            </div>
            <div className="mt-8">
              <NewMeals onMealAdded={handleMealAdded} />
            </div>
            <div className="mt-8">
              <EditMeals meals={meals} />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Meals;
