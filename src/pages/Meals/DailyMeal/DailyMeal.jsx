import React from 'react';
import { formatDayAndDate, parseLocalDate } from '../../../utils/getWeekDates';
import { useDailyMeal } from '../hooks/useDailyMeal';
import { useNoteModal } from '../hooks/useNoteModal';

import MealPickerSheet from '../MealPickerSheet/MealPickerSheet';
import NoteModal from '../components/NoteModal';
import DateBox from './DateBox';
import MealDisplay from './MealDisplay';

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
        <DateBox formattedDate={formattedDate} />
        <MealDisplay
          selectedMeal={selectedMeal}
          dayAbbreviation={formattedDate.day}
          onNoteButtonClick={handleNoteButtonClick}
        />
      </div>

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

      <NoteModal isOpen={noteModalOpen} noteContent={noteContent} onClose={closeNote} />
    </>
  );
};

export default React.memo(DailyMeal);
