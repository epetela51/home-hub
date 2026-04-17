import { useMealPlan } from "./hooks/useMealPlan";
import { useFetchMeals } from "./hooks/useFetchMeals";

import Button from "../../components/Button/Button";
import DailyMeal from "./DailyMeal";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Meals = () => {
  const { meals, weeklyPlan, isLoading } = useFetchMeals();

  const { mealPlan, handlePlanChange, handleResetWeek } = useMealPlan({
    initialMealPlan: weeklyPlan,
  });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <Button url="/" text="Go Home" />
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900">Weekly Meal Plan</h2>

        <button onClick={handleResetWeek} className="px-4 py-2 my-6 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Reset Week
        </button>
        {isLoading ? (
          <p className="text-2xl text-gray-600">Loading meal plan for the week...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS_OF_WEEK.map((day) => (
              <DailyMeal key={day} day={day} mealId={mealPlan[day]} meals={meals} onMealChange={handlePlanChange} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Meals;
