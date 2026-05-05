import Modal from '../../../../../components/Modal/Modal';

/**
 * NoteModal - Modal dialog for displaying meal notes.
 * Purely presentational component that renders the note content in a modal overlay.
 *
 * @param {boolean} isOpen - Whether the modal is open
 * @param {string} noteContent - The note text to display
 * @param {Function} onClose - Callback when modal should close
 */
const NoteModal = ({ isOpen, noteContent, onClose }) => {
  return (
    <Modal isOpen={isOpen} onBackdropClick={onClose}>
      <div className="space-y-4">
        <div className="relative flex justify-center">
          <h2 className="text-xl font-semibold text-gray-900">Note</h2>
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-500 hover:text-gray-700 transition-colors text-2xl leading-none"
            aria-label="Close note"
          >
            ×
          </button>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{noteContent}</p>
      </div>
    </Modal>
  );
};

export default NoteModal;
