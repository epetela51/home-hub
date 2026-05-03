/**
 * Modal - Generic reusable modal component for dialog content.
 * Handles backdrop, centering, and lifecycle (isOpen).
 *
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onBackdropClick - Callback when backdrop is clicked
 * @param {React.ReactNode} children - Modal content
 */
const Modal = ({ isOpen, onBackdropClick, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onBackdropClick}
        className="fixed inset-0 z-40 bg-black/70 transition-opacity"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
