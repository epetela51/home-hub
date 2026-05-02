import { useEditMealModal } from '../hooks/useEditMealModal';

import MealForm from '../MealForm/MealForm';

/**
 * MealEditModal - Modal dialog for editing a meal.
 * Purely presentational component that renders the edit form in a modal overlay.
 * All logic is handled by useEditMealModal hook.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Object} meal - Meal object being edited with { id, meal, note }
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onMealUpdated - Callback when meal is successfully updated with (updatedMeal)
 */
const MealEditModal = ({ isOpen, meal, onClose, onMealUpdated }) => {
  if (!isOpen) return null;
  if (!meal) return null;

  const { isSubmitSuccess, handleSubmit, handleCancel } = useEditMealModal(
    meal,
    onClose,
    onMealUpdated
  );

  return (
    <>
      {/* Backdrop overlay */}
      <div onClick={handleCancel} className="fixed inset-0 z-40 bg-black/50 transition-opacity" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <MealForm
              initialTitle={meal.meal}
              initialNote={meal.note || ''}
              title="Edit Meal"
              submitButtonLabel="Save Meal"
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              showCancelButton={true}
              isSubmitSuccess={isSubmitSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MealEditModal;
