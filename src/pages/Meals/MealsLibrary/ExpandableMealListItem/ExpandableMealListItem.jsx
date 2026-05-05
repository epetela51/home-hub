import React from 'react';

/**
 * ExpandableMealListItem - A meal item that expands to reveal Edit/Delete/Assign action buttons.
 * Presentational component (UI only, parent handles state and callbacks).
 *
 * @param {Object} meal - Meal object with { id, meal, note }
 * @param {boolean} isExpanded - Whether this item is currently expanded
 * @param {Function} onToggle - Callback when the item is clicked to expand/collapse
 * @param {Function} onEdit - Callback when the Edit button is clicked
 * @param {Function} onDelete - Callback when the Delete button is clicked
 * @param {Function} onAssign - Callback when the Assign to Date button is clicked
 */
const ExpandableMealListItem = ({ meal, isExpanded, onToggle, onEdit, onDelete, onAssign }) => {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Main meal row - clickable to expand */}
      <div
        onClick={onToggle}
        className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
      >
        {/* Meal name and note */}
        <div className="flex-1 min-w-0">
          <div className="text-base font-medium text-gray-900 truncate">{meal.meal}</div>
          {meal.note && <div className="text-sm text-gray-500 truncate mt-0.5">{meal.note}</div>}
        </div>

        {/* Chevron icon - rotates when expanded */}
        <div
          className={`flex-shrink-0 text-gray-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        >
          ▼
        </div>
      </div>

      {/* Expanded buttons - Edit, Assign, and Delete in a grid */}
      {isExpanded && (
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 grid grid-cols-3 gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={onAssign}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium text-sm"
          >
            Assign
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-medium text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ExpandableMealListItem);
