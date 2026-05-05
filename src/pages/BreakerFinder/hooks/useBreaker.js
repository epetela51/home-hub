import { useBreakerSelection } from '../useBreakerSelection';
import { useBreakerFiltering } from './useBreakerFiltering';
import { useBreakerLookup } from './useBreakerLookup';

/**
 * Wrapper hook that combines selection state with filtering and lookup logic
 * Provides a single hook for BreakerFinder to call, keeping the orchestrator clean
 */
export const useBreaker = () => {
  // Selection state and handlers
  const {
    selectedFloor,
    selectedRoom,
    selectedType,
    selectedItem,
    handleFloorChange,
    handleRoomChange,
    handleTypeChange,
    handleItemChange,
    resetSelections,
  } = useBreakerSelection();

  // Filtering logic
  const { floors, rooms, types, items, floorHasRooms } = useBreakerFiltering(
    selectedFloor,
    selectedRoom,
    selectedType
  );

  // Lookup logic
  const breakerInfo = useBreakerLookup(
    selectedFloor,
    selectedRoom,
    selectedType,
    selectedItem,
    floorHasRooms
  );

  return {
    // Selections
    selectedFloor,
    selectedRoom,
    selectedType,
    selectedItem,
    // Handlers
    handleFloorChange,
    handleRoomChange,
    handleTypeChange,
    handleItemChange,
    resetSelections,
    // Filtering results
    floors,
    rooms,
    types,
    items,
    floorHasRooms,
    // Lookup result
    breakerInfo,
  };
};
