import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch meals data from the API.
 * Manages state and fetching on mount.
 *
 * @returns {Object} Object containing { meals, setMeals, weeklyPlan, isLoading }
 */
export const useFetchMeals = () => {
  const [meals, setMeals] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMealsData = async () => {
      try {
        const res = await fetch('/api/v2/meals');
        const data = await res.json();
        setMeals(data.meals);
        setWeeklyPlan(data.weeklyPlan);
      } catch (err) {
        console.error('Error fetching meals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealsData();
  }, []);

  return { meals, setMeals, weeklyPlan, isLoading };
};
