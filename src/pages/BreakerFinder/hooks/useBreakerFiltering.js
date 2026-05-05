import { useMemo } from 'react';

import homeData from '../../../data/breakerData.json';

const KNOWN_TYPES = ['outlets', 'lights', 'appliances'];

/**
 * Derives available filtering options based on selected floor and room
 * Returns memoized arrays of available floors, rooms, types, and items
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

  const floorHasRooms = selectedFloor ? hasRooms(selectedFloor) : false;

  const floors = useMemo(() => Object.keys(homeData).filter((floor) => floor !== 'Unknowns'), []);

  const rooms = useMemo(
    () => (selectedFloor && floorHasRooms ? Object.keys(homeData[selectedFloor]) : []),
    [selectedFloor, floorHasRooms]
  );

  const types = useMemo(
    () =>
      selectedFloor
        ? floorHasRooms && selectedRoom
          ? Object.keys(homeData[selectedFloor][selectedRoom])
          : floorHasRooms
            ? []
            : Object.keys(homeData[selectedFloor])
        : [],
    [selectedFloor, selectedRoom, floorHasRooms]
  );

  const items = useMemo(
    () =>
      selectedFloor && selectedType
        ? floorHasRooms && selectedRoom
          ? Object.keys(homeData[selectedFloor][selectedRoom][selectedType])
          : !floorHasRooms
            ? Object.keys(homeData[selectedFloor][selectedType])
            : []
        : [],
    [selectedFloor, selectedRoom, selectedType, floorHasRooms]
  );

  return {
    floors,
    rooms,
    types,
    items,
    floorHasRooms,
  };
};
