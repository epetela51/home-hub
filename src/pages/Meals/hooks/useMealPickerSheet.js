import { useState } from 'react';

/**
 * Custom hook to manage meal picker sheet visibility state.
 * Provides open/close state and functions to control the sheet.
 *
 * @returns {Object} Object containing { isOpen, openSheet, closeSheet }
 */
export const useMealPickerSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => {
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openSheet,
    closeSheet,
  };
};
