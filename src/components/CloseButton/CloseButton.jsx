/**
 * CloseButton - Reusable close button component with X icon.
 * Can be used to close modals, sheets, dialogs, etc.
 *
 * @param {Function} onClick - Callback when the button is clicked
 */
const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* This path element draws the actual X */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
