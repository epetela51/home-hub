import TextInput from '../../../components/TextInput/TextInput';
import CloseButton from '../../../components/CloseButton/CloseButton';
import MealList from './MealList';

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
 * @param {Object} currentMeal - The currently selected meal object (null if none selected)
 * @param {Function} onClearMeal - Callback to clear the meal for the current day
 */
const MealPickerSheet = ({
  isOpen,
  onClose,
  filteredMeals,
  searchQuery,
  onSearchChange,
  onSelectMeal,
  currentMeal,
  onClearMeal,
}) => {
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

        {/* Clear Day Button - Only show if a meal is currently selected */}
        {currentMeal && (
          <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
            <button
              onClick={onClearMeal}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Clear Day
            </button>
          </div>
        )}

        {/* Meal List */}
        <div className="overflow-y-auto flex-1">
          <MealList meals={filteredMeals} onSelectMeal={onSelectMeal} />
        </div>
      </div>
    </>
  );
};

export default MealPickerSheet;
