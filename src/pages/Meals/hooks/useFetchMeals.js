import { useEffect, useState } from "react";

export const useFetchMeals = () => {
  const [meals, setMeals] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        console.log("Meals from Flask:", data);
        setMeals(data.meals);
        setWeeklyPlan(data.weeklyPlan);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meals:", err);
        setIsLoading(false);
      });
  }, []);

  return { meals, weeklyPlan, isLoading };
};
