import React from 'react';
import { Home } from 'lucide-react';

import { useBreaker } from './hooks/useBreaker';
import { useSelectionVisibility } from './SelectionPanel/useSelectionVisibility';

import AppHeader from '../../components/AppHeader/AppHeader';
import SelectionPanel from './SelectionPanel/SelectionPanel';
import BreakerDisplay from './BreakerDisplay/BreakerDisplay';
import SafetyWarning from './SafetyWarning/SafetyWarning';
import UnknownBreakersSection from './UnknownBreakersSection/UnknownBreakersSection';

/**
 * BreakerFinder page component
 * Orchestrates the breaker selection flow by coordinating hooks and child components
 * All state management and business logic is delegated to custom hooks
 */
const BreakerFinder = () => {
  // Combined hook that provides selections, handlers, filtering, and lookup
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
    floors,
    rooms,
    types,
    items,
    floorHasRooms,
    breakerInfo,
  } = useBreaker();

  // Determine which selectors should be visible
  const { showRoom, showType, showItem } = useSelectionVisibility(
    selectedFloor,
    selectedRoom,
    selectedType,
    floorHasRooms
  );

  const hasSelection = selectedFloor || selectedRoom || selectedType || selectedItem;

  return (
    <>
      <AppHeader />
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
            <div className="flex items-center justify-center mb-6">
              <Home className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Find That Breaker</h1>
            </div>

            <SelectionPanel
              selectedFloor={selectedFloor}
              selectedRoom={selectedRoom}
              selectedType={selectedType}
              selectedItem={selectedItem}
              floors={floors}
              rooms={rooms}
              types={types}
              items={items}
              handleFloorChange={handleFloorChange}
              handleRoomChange={handleRoomChange}
              handleTypeChange={handleTypeChange}
              handleItemChange={handleItemChange}
              showRoom={showRoom}
              showType={showType}
              showItem={showItem}
            />

            <BreakerDisplay
              breakerInfo={breakerInfo}
              selectedType={selectedType}
              selectedItem={selectedItem}
            />

            {hasSelection && (
              <button
                onClick={resetSelections}
                className="w-full mt-4 px-4 py-2 bg-green-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <UnknownBreakersSection />

          <SafetyWarning />
        </div>
      </div>
    </>
  );
};

export default BreakerFinder;
