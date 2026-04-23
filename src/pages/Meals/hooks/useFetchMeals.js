import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook to fetch meals data from the API.
 * Manages state and fetching on mount, returns meals data and a refetch function.
 *
 * @returns {Object} Object containing { meals, weeklyPlan, isLoading, refetch }
 */
export const useFetchMeals = () => {
  const [meals, setMeals] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchMealsData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/meals');
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      setMeals(data.meals);
      setWeeklyPlan(data.weeklyPlan);
    } catch (err) {
      console.error('Error fetching meals:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMealsData();
  }, [fetchMealsData]);

  return { meals, weeklyPlan, isLoading, refetch: fetchMealsData };
};
