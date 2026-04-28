import { useState, useCallback } from 'react';

/**
 * Custom hook to manage meal search/filter functionality.
 * Provides search query state and a filter function for meals.
 *
 * @returns {Object} Object containing { searchQuery, setSearchQuery, filteredMeals }
 */
export const useMealSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filters meals based on search query (case-insensitive).
   * @param {Array} meals - Array of meal objects with { id, meal, note }
   * @returns {Array} Filtered meals matching the search query
   */
  const filteredMeals = useCallback(
    (meals) => {
      if (!searchQuery.trim()) {
        return meals;
      }
      return meals.filter((meal) => meal.meal.toLowerCase().includes(searchQuery.toLowerCase()));
    },
    [searchQuery]
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredMeals,
  };
};
