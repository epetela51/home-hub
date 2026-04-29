import { useFetchMeals } from '../hooks/useFetchMeals';
import { useMealSearch } from '../hooks/useMealSearch';
import { useMealsLibraryForm } from '../hooks/useMealsLibraryForm';

import TextInput from '../../../components/TextInput/TextInput';
import Button from '../../../components/Button/Button';
import MealList from '../MealPickerSheet/MealList';
import NewMeals from '../NewMeals/NewMeals';

/**
 * MealsLibrary - Full-page view for browsing all meals with search functionality.
 * Allows users to view and search the complete meals library independently
 * from the weekly meal planner.
 *
 * Now includes a dynamic collapsible form to add new meals without leaving the page.
 */
const MealsLibrary = () => {
  const { meals, setMeals, isLoading } = useFetchMeals();
  const { searchQuery, setSearchQuery, filteredMeals } = useMealSearch();
  const { isFormOpen, handleToggleForm, handleMealAdded } = useMealsLibraryForm(setMeals);

  const displayedMeals = filteredMeals(meals);

  if (isLoading) {
    return (
      <div className="sm:px-4 py-6 max-w-5xl mx-auto">
        <p className="text-2xl text-gray-600">Loading meals...</p>
      </div>
    );
  }

  return (
    <div className="sm:px-4 py-6 max-w-5xl mx-auto space-y-6">
      <Button url="/meals" text="Back to Meals" />

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Meals Library</h1>

        <div className="mb-6">
          <TextInput value={searchQuery} onChange={setSearchQuery} placeholder="Search meals..." />
        </div>

        <button
          onClick={handleToggleForm}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          {isFormOpen ? '✕ Cancel' : '+ Add New Meal'}
        </button>

        {isFormOpen && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <NewMeals onMealAdded={handleMealAdded} />
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <MealList meals={displayedMeals} />
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {displayedMeals.length} of {meals.length} meals
        </div>
      </div>
    </div>
  );
};

export default MealsLibrary;
