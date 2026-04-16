import { useEffect, useState } from "react";
import { useMealPlan } from "./hooks/useMealPlan";

import Button from "../../components/Button/Button";
import DailyMeal from "./DailyMeal/DailyMeal";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [weeklyMealPlan, setweeklyMealPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { mealPlan, handlePlanChange } = useMealPlan({
    initialMealPlan: weeklyMealPlan,
  });

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        console.log("Meals from Flask:", data);
        setMeals(data.meals);
        setweeklyMealPlan(data.weeklyPlan);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meals:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <Button url="/" text="Go Home" />
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Meal Plan</h2>
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
