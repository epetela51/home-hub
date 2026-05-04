import { useMemo, useState } from 'react';
import { useMealPlan } from '../hooks/useMealPlan';
import { useWeekReset } from '../hooks/useWeekReset';
import { useFetchMeals } from '../hooks/useFetchMeals';
import { getWeekDates, formatDateToString } from '../../../utils/getWeekDates';
import { DAYS_OF_WEEK } from '../constants';

import AppHeader from '../../../components/AppHeader/AppHeader';
import MealsSubNav from '../components/MealsSubNav';
import WeekNavigationBar from '../components/WeekNavigationBar';
import DailyMeal from '../DailyMeal/DailyMeal';

const Meals = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const { meals, setMeals, weeklyPlan, setWeeklyPlan, isLoading } = useFetchMeals();

  const { mealPlan, handlePlanChange, resetMealPlan } = useMealPlan({
    initialMealPlan: weeklyPlan,
  });

  const handleMealAdded = (newMeal) => {
    setMeals((prev) => [...prev, newMeal]);
  };

  // Get dates for the selected week
  const weekDates = useMemo(() => getWeekDates(new Date(), weekOffset), [weekOffset]);

  const { handleResetWeek, isResetting } = useWeekReset(
    resetMealPlan,
    setWeeklyPlan,
    weekDates,
    DAYS_OF_WEEK
  );

  return (
    <>
      <AppHeader />
      <MealsSubNav />
      <div className="sm:px-4 py-6 max-w-5xl mx-auto space-y-8">
        <section>
          <WeekNavigationBar
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
            weekDates={weekDates}
          />
          <button
            onClick={() => handleResetWeek(weekDates.Monday)}
            disabled={isResetting}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isResetting ? 'Resetting...' : 'Reset Week'}
          </button>
          {isLoading ? (
            <p className="text-2xl text-gray-600">Loading meal plan for the week...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {DAYS_OF_WEEK.map((day) => {
                  const dateString = formatDateToString(weekDates[day]);
                  return (
                    <DailyMeal
                      key={day}
                      dateString={dateString}
                      mealId={mealPlan[dateString]}
                      meals={meals}
                      onMealSelected={handlePlanChange}
                      onMealAdded={handleMealAdded}
                    />
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Meals;
