import React, { useState } from 'react';
import { formatDayAndDate, parseLocalDate } from '../../../utils/getWeekDates';
import { useDailyMeal } from '../hooks/useDailyMeal';

import MealPickerSheet from '../MealPickerSheet/MealPickerSheet';
import Modal from '../../../components/Modal/Modal';

const DailyMeal = ({ dateString, mealId, meals, onMealSelected, onMealAdded }) => {
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');

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
      setNoteContent(selectedMeal.note);
      setNoteModalOpen(true);
    }
  };

  const handleCloseNoteModal = () => {
    setNoteModalOpen(false);
    setNoteContent('');
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
      <Modal isOpen={noteModalOpen} onBackdropClick={handleCloseNoteModal}>
        <div className="space-y-4">
          <div className="relative flex justify-center">
            <h2 className="text-xl font-semibold text-gray-900">Note</h2>
            <button
              onClick={handleCloseNoteModal}
              className="absolute right-0 text-gray-500 hover:text-gray-700 transition-colors text-2xl leading-none"
              aria-label="Close note"
            >
              ×
            </button>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap">{noteContent}</p>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(DailyMeal);
