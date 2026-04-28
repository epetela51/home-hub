import TextInput from '../../../components/TextInput/TextInput';
import CloseButton from '../../../components/CloseButton/CloseButton';
import MealListItem from './MealListItem';

/**
 * MealPickerSheet - Bottom sheet component for selecting meals.
 * Presentational component (UI only, logic is in parent/hooks).
 *
 * @param {boolean} isOpen - Whether the sheet is currently open
 * @param {Function} onClose - Callback when the sheet should close (X button clicked)
 * @param {Array} filteredMeals - Pre-filtered array of meals to display
 * @param {string} searchQuery - Current search query value
 * @param {Function} onSearchChange - Callback when search input changes
 * @param {Function} onSelectMeal - Callback when a meal is selected
 */
const MealPickerSheet = ({
  isOpen,
  onClose,
  filteredMeals,
  searchQuery,
  onSearchChange,
  onSelectMeal,
}) => {
  const renderMealList = () => {
    if (filteredMeals.length > 0) {
      return filteredMeals.map((meal) => (
        <MealListItem key={meal.id} meal={meal} onClick={() => onSelectMeal(meal.id)} />
      ));
    }

    return (
      <div className="flex items-center justify-center py-8 text-center">
        <p className="text-gray-500">No meals found</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/50 transition-opacity" />

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: '90vh', top: '10vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Select a Meal</h2>
          <CloseButton onClick={onClose} />
        </div>

        {/* Search Input */}
        <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <TextInput value={searchQuery} onChange={onSearchChange} placeholder="Search meals..." />
        </div>

        {/* Meal List */}
        <div className="overflow-y-auto flex-1">{renderMealList()}</div>
      </div>
    </>
  );
};

export default MealPickerSheet;
