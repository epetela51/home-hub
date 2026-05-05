import homeData from '../../../data/breakerData.json';

/**
 * Looks up the breaker information based on selected options
 * Handles both data structures (with and without room hierarchy)
 */
export const useBreakerLookup = (
  selectedFloor,
  selectedRoom,
  selectedType,
  selectedItem,
  floorHasRooms
) => {
  // Breaker info: handle both cases (with and without rooms)
  const breakerInfo =
    selectedFloor && selectedType && selectedItem
      ? floorHasRooms && selectedRoom
        ? homeData[selectedFloor][selectedRoom][selectedType][selectedItem]
        : !floorHasRooms
          ? homeData[selectedFloor][selectedType][selectedItem]
          : null
      : null;

  return breakerInfo;
};
