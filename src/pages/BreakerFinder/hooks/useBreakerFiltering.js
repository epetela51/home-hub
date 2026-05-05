import homeData from '../../../data/breakerData.json';

const KNOWN_TYPES = ['outlets', 'lights', 'appliances'];

/**
 * Derives available filtering options based on selected floor and room
 * Returns arrays of available floors, rooms, types, and items
 * Also determines if the selected floor has a room structure
 */
export const useBreakerFiltering = (selectedFloor, selectedRoom, selectedType) => {
  // Check if a floor has rooms or goes directly to types
  const hasRooms = (floor) => {
    if (!floor || !homeData[floor]) return false;
    const floorData = homeData[floor];
    const floorKeys = Object.keys(floorData);
    // If any direct child is a known type, there are no rooms
    return !floorKeys.some((key) => KNOWN_TYPES.includes(key));
  };

  const floors = Object.keys(homeData).filter((floor) => floor !== 'Unknowns');
  const floorHasRooms = selectedFloor ? hasRooms(selectedFloor) : false;

  const rooms = selectedFloor && floorHasRooms ? Object.keys(homeData[selectedFloor]) : [];

  // Types: if no rooms, get from floor directly; otherwise from room
  const types = selectedFloor
    ? floorHasRooms && selectedRoom
      ? Object.keys(homeData[selectedFloor][selectedRoom])
      : floorHasRooms
        ? []
        : Object.keys(homeData[selectedFloor])
    : [];

  // Items: handle both cases (with and without rooms)
  const items =
    selectedFloor && selectedType
      ? floorHasRooms && selectedRoom
        ? Object.keys(homeData[selectedFloor][selectedRoom][selectedType])
        : !floorHasRooms
          ? Object.keys(homeData[selectedFloor][selectedType])
          : []
      : [];

  return {
    floors,
    rooms,
    types,
    items,
    floorHasRooms,
  };
};
