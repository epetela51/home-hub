import React from 'react';

import {
  formatDateToString,
  formatDayAndDate,
  getWeekLabel,
  getFormattedDateRange,
} from '../../../utils/getWeekDates';
import { DAYS_OF_WEEK } from '../constants';
import { useAssignMealModalState } from '../hooks/useAssignMealModalState';

import Modal from '../../../components/Modal/Modal';

/**
 * AssignMealModal - Modal for assigning a meal to a specific day/date.
 * Displays week navigation and a 7-day calendar for date selection.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {string} mealId - ID of the meal being assigned
 * @param {string} mealName - Name of the meal being assigned (for display)
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onAssign - Callback when a date is selected and submitted
 *   Signature: (mealId: string, dateString: string) => void
 */
const AssignMealModal = ({ isOpen, mealId, mealName, onClose, onAssign }) => {
  const {
    weekOffset,
    selectedDateString,
    weekDates,
    handlePreviousWeek,
    handleNextWeek,
    handleSelectDate,
    handleSubmit,
    handleCancel,
  } = useAssignMealModalState(mealId, onAssign, onClose);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onBackdropClick={handleCancel}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assign Meal</h2>
          <p className="text-base text-gray-600 mt-1">{mealName}</p>
        </div>

        {/* Week Navigation */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{getWeekLabel(weekOffset)}</p>
            <p className="text-sm text-gray-600">{getFormattedDateRange(weekDates)}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handlePreviousWeek}
              disabled={weekOffset === -1}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextWeek}
              disabled={weekOffset === 1}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Day Selection Grid */}
        <div className="grid grid-cols-2 gap-2">
          {DAYS_OF_WEEK.map((dayName) => {
            const date = weekDates[dayName];
            const dateString = formatDateToString(date);
            const { day: dayAbbrev, date: dayOfMonth } = formatDayAndDate(date);
            const isSelected = selectedDateString === dateString;

            return (
              <button
                key={dayName}
                onClick={() => handleSelectDate(dayName)}
                className={`p-3 rounded border-2 transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } text-center`}
              >
                <div className="text-xs font-semibold text-gray-600">{dayAbbrev}</div>
                <div className="text-xl font-bold text-gray-900">{dayOfMonth}</div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedDateString}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          >
            Assign
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignMealModal;
