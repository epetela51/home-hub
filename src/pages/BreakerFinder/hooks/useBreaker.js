import { useBreakerSelection } from '../useBreakerSelection';
import { useBreakerFiltering } from './useBreakerFiltering';
import { useBreakerLookup } from './useBreakerLookup';

/**
 * Wrapper hook that combines selection state with filtering and lookup logic
 * Provides a single hook for BreakerFinder to call, keeping the orchestrator clean
 * Handlers are already memoized in useBreakerSelection
 */
export const useBreaker = () => {
  // Selection state and handlers (handlers are already memoized)
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
    // Selections and handlers (from useBreakerSelection - handlers already memoized)
    selectedFloor,
    selectedRoom,
    selectedType,
    selectedItem,
    handleFloorChange,
    handleRoomChange,
    handleTypeChange,
    handleItemChange,
    resetSelections,
    // Filtering results (memoized in useBreakerFiltering)
    floors,
    rooms,
    types,
    items,
    floorHasRooms,
    // Lookup result
    breakerInfo,
  };
};
