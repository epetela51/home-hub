import React from 'react';
import { Zap, Power, Lightbulb } from 'lucide-react';

/**
 * Presentational component for displaying breaker information
 * Shows the result card with type icon and breaker location
 */
const BreakerDisplay = ({ breakerInfo, selectedType, selectedItem }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'outlets':
        return <Power className="w-4 h-4" />;
      case 'lights':
        return <Lightbulb className="w-4 h-4" />;
      case 'appliances':
        return <Zap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (!breakerInfo) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getTypeIcon(selectedType)}
          <span className="ml-2 text-sm text-gray-600">{selectedItem}</span>
        </div>
      </div>
      <div className="mt-3 p-3 bg-white rounded-md">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Breaker Location</p>
        <p className="text-2xl font-bold text-indigo-600 mt-1">{breakerInfo}</p>
      </div>
    </div>
  );
};

export default React.memo(BreakerDisplay);
