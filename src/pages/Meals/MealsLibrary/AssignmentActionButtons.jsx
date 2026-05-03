/**
 * AssignmentActionButtons - Cancel and Assign action buttons.
 */
const AssignmentActionButtons = ({ selectedDateString, onSubmit, onCancel, successMessage }) => {
  if (successMessage) return null;

  return (
    <div className="flex gap-2 pt-2">
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition font-medium"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        disabled={!selectedDateString}
        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
      >
        Assign
      </button>
    </div>
  );
};

export default AssignmentActionButtons;
