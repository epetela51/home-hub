import { useState, useCallback } from 'react';

export const useBreakerSelection = () => {
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  // Memoize handlers to prevent unnecessary re-renders of child components
  const handleFloorChange = useCallback((value) => {
    setSelectedFloor(value);
    setSelectedRoom('');
    setSelectedType('');
    setSelectedItem('');
  }, []);

  const handleRoomChange = useCallback((value) => {
    setSelectedRoom(value);
    setSelectedType('');
    setSelectedItem('');
  }, []);

  const handleTypeChange = useCallback((value) => {
    setSelectedType(value);
    setSelectedItem('');
  }, []);

  const handleItemChange = useCallback((value) => {
    setSelectedItem(value);
  }, []);

  const resetSelections = useCallback(() => {
    setSelectedFloor('');
    setSelectedRoom('');
    setSelectedType('');
    setSelectedItem('');
  }, []);

  return {
    selectedFloor,
    selectedRoom,
    selectedType,
    selectedItem,
    handleFloorChange,
    handleRoomChange,
    handleTypeChange,
    handleItemChange,
    resetSelections,
  };
};
