import { useAddMealModal } from '../../hooks/useAddMealModal';

import Modal from '../../../../components/Modal/Modal';
import MealForm from '../MealForm/MealForm';

/**
 * MealAddModal - Modal dialog for adding a new meal.
 * Purely presentational component that renders the add form in a modal overlay.
 * All logic is handled by useAddMealModal hook.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {Function} onClose - Callback when modal should close
 * @param {Function} onMealAdded - Callback when a new meal is successfully added with (newMeal)
 */
const MealAddModal = ({ isOpen, onClose, onMealAdded }) => {
  const { isSubmitSuccess, handleSubmit, handleCancel, formResetKey } = useAddMealModal(
    onClose,
    onMealAdded
  );

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onBackdropClick={handleCancel}>
      <MealForm
        key={formResetKey}
        initialTitle=""
        initialNote=""
        title="Add Meal"
        submitButtonLabel={isSubmitSuccess ? '✓ Added!' : 'Add Meal'}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        showCancelButton={true}
        isSubmitSuccess={isSubmitSuccess}
      />
    </Modal>
  );
};

export default MealAddModal;
