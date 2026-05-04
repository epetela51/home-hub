import React from 'react';

const MealDisplay = ({ selectedMeal, dayAbbreviation, onNoteButtonClick }) => {
  return (
    <div className="flex-1 flex items-center justify-between gap-4">
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold text-left ${selectedMeal ? 'text-green-600' : 'text-red-600'}`}
        >
          {selectedMeal ? selectedMeal.meal : `Nothing planned for ${dayAbbreviation}`}
        </h3>
      </div>
      {selectedMeal?.note && (
        <button
          onClick={onNoteButtonClick}
          className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 hover:bg-green-600 transition-colors"
          title="View note"
          aria-label="View meal note"
        />
      )}
    </div>
  );
};

export default React.memo(MealDisplay);
