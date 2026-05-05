/**
 * Determines which selection fields should be visible based on user selections
 * Handles conditional rendering for room, type, and item selectors
 */
export const useSelectionVisibility = (
  selectedFloor,
  selectedRoom,
  selectedType,
  floorHasRooms
) => {
  // Show room selector only if floor is selected and has rooms
  const showRoom = selectedFloor && floorHasRooms;

  // Show type selector if:
  // - floor is selected AND
  // - (floor has no rooms OR (floor has rooms AND room is selected))
  const showType = selectedFloor && ((floorHasRooms && selectedRoom) || !floorHasRooms);

  // Show item selector only if type is selected
  const showItem = selectedType;

  return {
    showRoom,
    showType,
    showItem,
  };
};
