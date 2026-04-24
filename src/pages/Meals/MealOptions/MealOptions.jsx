const MealOptions = ({ meal, onEdit, onDelete, onBack }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Edit or Delete Meal</h3>

      <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <div className="mb-2">
          <p className="text-sm text-gray-600">Selected Meal:</p>
          <p className="text-lg font-semibold text-gray-900">{meal.meal}</p>
        </div>
        {meal.note && (
          <div>
            <p className="text-sm text-gray-600">Note:</p>
            <p className="text-gray-700">{meal.note}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MealOptions;
