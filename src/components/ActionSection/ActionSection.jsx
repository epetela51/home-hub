import { useState } from 'react';

/**
 * ActionSection - Collapsible section for action buttons
 * Combines collapsible UI with pill-styled button container
 *
 * @param {string} title - Section header title (e.g., "Week Actions") or icon (e.g., "⋮")
 * @param {ReactNode} children - Button(s) to display inside
 * @param {boolean} defaultOpen - Whether section is open by default (default: false)
 * @param {boolean} isIcon - If true, title is treated as icon and centered (default: false)
 */
const ActionSection = ({ title, children, defaultOpen = false, isIcon = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-center items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition font-medium text-sm ${
          isIcon ? 'text-lg' : 'w-full'
        }`}
        title={isIcon ? 'More options' : undefined}
      >
        <span>{title}</span>
        {!isIcon && (
          <span
            className="text-xs transition-transform"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▼
          </span>
        )}
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-3 pl-4 space-y-3">
          {/* Pill-styled button container */}
          <div className="inline-flex flex-col gap-3 md:flex-row md:gap-3">{children}</div>
        </div>
      )}
    </div>
  );
};

export default ActionSection;
