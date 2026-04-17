import { useState } from 'react';

import TextInput from '../../../components/TextInput/TextInput';

const NewMeals = () => {
  const [mealTitle, setMealTitle] = useState('');
  const [mealNotes, setMealNotes] = useState('');

  const handleAddMeal = () => {
    console.log('Adding new meal:', { title: mealTitle, notes: mealNotes });
    // TODO: Send POST request to save meal when API is ready
  };

  const handleReset = () => {
    setMealTitle('');
    setMealNotes('');
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Add New Meal</h3>

      <div className="space-y-4">
        <TextInput value={mealTitle} onChange={setMealTitle} placeholder="Meal name..." />

        <TextInput
          value={mealNotes}
          onChange={setMealNotes}
          placeholder="Notes (optional)..."
          isTextarea={true}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleAddMeal}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Add Meal
          </button>
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Reset Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMeals;
