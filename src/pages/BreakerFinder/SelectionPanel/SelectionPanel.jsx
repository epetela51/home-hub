import React from 'react';

import FloorSelector from './Selectors/FloorSelector/FloorSelector';
import RoomSelector from './Selectors/RoomSelector/RoomSelector';
import TypeSelector from './Selectors/TypeSelector/TypeSelector';
import ItemSelector from './Selectors/ItemSelector/ItemSelector';

/**
 * Presentational component for the selection form
 * Orchestrates 4 cascading dropdown selectors based on data structure
 * Delegates rendering to specialized selector components
 */
const SelectionPanel = ({
  selectedFloor,
  selectedRoom,
  selectedType,
  selectedItem,
  floors,
  rooms,
  types,
  items,
  handleFloorChange,
  handleRoomChange,
  handleTypeChange,
  handleItemChange,
  showRoom,
  showType,
  showItem,
}) => {
  return (
    <div className="space-y-4">
      <FloorSelector value={selectedFloor} options={floors} onChange={handleFloorChange} />

      {showRoom && (
        <RoomSelector value={selectedRoom} options={rooms} onChange={handleRoomChange} />
      )}

      {showType && (
        <TypeSelector value={selectedType} options={types} onChange={handleTypeChange} />
      )}

      {showItem && (
        <ItemSelector value={selectedItem} options={items} onChange={handleItemChange} />
      )}
    </div>
  );
};

export default React.memo(SelectionPanel);
