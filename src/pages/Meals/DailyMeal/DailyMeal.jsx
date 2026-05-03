import React from 'react';
import { formatDayAndDate, parseLocalDate } from '../../../utils/getWeekDates';
import { useDailyMeal } from '../hooks/useDailyMeal';
import { useNoteModal } from '../hooks/useNoteModal';

import MealPickerSheet from '../MealPickerSheet/MealPickerSheet';
import NoteModal from '../components/NoteModal';

const DailyMeal = ({ dateString, mealId, meals, onMealSelected, onMealAdded }) => {
  const { isOpen: noteModalOpen, noteContent, openNote, closeNote } = useNoteModal();

  const {
    isOpen,
    openSheet,
    closeSheet,
    searchQuery,
    setSearchQuery,
    filteredMealList,
    handleSelectMeal,
    handleClearMeal,
    selectedMeal,
    isAddMealModalOpen,
    openAddMealModal,
    closeAddMealModal,
    handleMealAdded,
  } = useDailyMeal(dateString, mealId, meals, onMealSelected, onMealAdded);

  // Parse as local date to avoid timezone offset (parseLocalDate handles YYYY-MM-DD correctly)
  const date = parseLocalDate(dateString);
  const formattedDate = formatDayAndDate(date);

  const handleNoteButtonClick = (e) => {
    e.stopPropagation();
    if (selectedMeal?.note) {
      openNote(selectedMeal.note);
    }
  };

  return (
    <>
      <div
        onClick={openSheet}
        className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        {/* Left Column: Day and Date Box */}
        <div className="w-14 flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg py-1">
          <div className="text-sm font-bold text-gray-700">{formattedDate.day}</div>
          <div className="text-xl font-semibold text-gray-900">{formattedDate.date}</div>
        </div>

        {/* Right Column: Meal Display */}
        <div className="flex-1 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold text-left ${selectedMeal ? 'text-green-600' : 'text-red-600'}`}
            >
              {selectedMeal ? selectedMeal.meal : `Nothing planned for ${formattedDate.day}`}
            </h3>
          </div>
          {selectedMeal?.note && (
            <button
              onClick={handleNoteButtonClick}
              className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 hover:bg-green-600 transition-colors"
              title="View note"
              aria-label="View meal note"
            />
          )}
        </div>
      </div>

      {/* Meal Picker Sheet */}
      <MealPickerSheet
        isOpen={isOpen}
        onClose={closeSheet}
        filteredMeals={filteredMealList}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectMeal={handleSelectMeal}
        currentMeal={selectedMeal}
        onClearMeal={handleClearMeal}
        isAddMealModalOpen={isAddMealModalOpen}
        onOpenAddMealModal={openAddMealModal}
        onCloseAddMealModal={closeAddMealModal}
        handleMealAdded={handleMealAdded}
      />

      {/* Note Modal */}
      <NoteModal isOpen={noteModalOpen} noteContent={noteContent} onClose={closeNote} />
    </>
  );
};

export default React.memo(DailyMeal);
