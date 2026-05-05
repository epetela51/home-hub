import React from 'react';

/**
 * Presentational component for the safety warning
 * Displays a static warning message about electrical safety
 */
const SafetyWarning = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
      <p className="font-semibold mb-1">⚠️ Safety Reminder</p>
      <p>
        Always turn off the main breaker before working on electrical systems or face the
        consequences.
      </p>
    </div>
  );
};

export default SafetyWarning;
