import { useMemo, useState } from 'react';
import { useMealPlan } from '../hooks/useMealPlan';
import { useWeekReset } from '../hooks/useWeekReset';
import { useFetchMeals } from '../hooks/useFetchMeals';
import { getWeekDates, formatDateToString } from '../../../utils/getWeekDates';

import Button from '../../../components/Button/Button';
import DailyMeal from '../DailyMeal/DailyMeal';
import WeekNavigation from '../WeekNavigation/WeekNavigation';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Meals = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const { meals, weeklyPlan, setWeeklyPlan, isLoading } = useFetchMeals();

  const { mealPlan, handlePlanChange, resetMealPlan } = useMealPlan({
    initialMealPlan: weeklyPlan,
  });

  // Get dates for the selected week
  const weekDates = useMemo(() => getWeekDates(new Date(), weekOffset), [weekOffset]);

  const { handleResetWeek, isResetting } = useWeekReset(
    resetMealPlan,
    setWeeklyPlan,
    weekDates,
    DAYS_OF_WEEK
  );

  return (
    <div className="sm:px-4 py-6 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col gap-4 w-fit mx-auto">
        <Button url="/" text="Go Home" />
        <Button url="/meals/library" text="Meals Library" />
      </div>
      <section className="mt-20">
        <WeekNavigation
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          weekDates={weekDates}
        />

        <button
          onClick={() => handleResetWeek(weekDates.Monday)}
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
              {DAYS_OF_WEEK.map((day) => {
                const dateString = formatDateToString(weekDates[day]);
                return (
                  <DailyMeal
                    key={day}
                    dateString={dateString}
                    mealId={mealPlan[dateString]}
                    meals={meals}
                    onMealSelected={handlePlanChange}
                  />
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Meals;
