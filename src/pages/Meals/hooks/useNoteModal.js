import { useState } from 'react';

/**
 * Custom hook for managing note modal logic.
 * Handles opening/closing the note modal and managing note content state.
 *
 * @returns {Object} Object containing:
 *   - isOpen: Boolean indicating if modal is open
 *   - noteContent: String containing the note text
 *   - openNote: Function to open modal with note content
 *   - closeNote: Function to close modal
 */
export const useNoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const openNote = (note) => {
    setNoteContent(note);
    setIsOpen(true);
  };

  const closeNote = () => {
    setIsOpen(false);
    setNoteContent('');
  };

  return {
    isOpen,
    noteContent,
    openNote,
    closeNote,
  };
};
