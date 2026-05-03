import React from 'react';

import { getWeekLabel, getFormattedDateRange } from '../../../utils/getWeekDates';

import WeekNavigationButtons from './WeekNavigationButtons';

const WeekNavigation = ({ weekOffset, setWeekOffset, weekDates }) => {
  const handlePreviousWeek = () => {
    setWeekOffset(Math.max(weekOffset - 1, -1));
  };

  const handleNextWeek = () => {
    setWeekOffset(Math.min(weekOffset + 1, 1));
  };

  return (
    <div className="flex flex-col gap-4 my-6">
      {/* Top Row: Week Label and Date */}
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-900">{getWeekLabel(weekOffset)}</p>
        <p className="text-base text-gray-600">{getFormattedDateRange(weekDates)}</p>
      </div>

      {/* Navigation Buttons */}
      <WeekNavigationButtons
        weekOffset={weekOffset}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
    </div>
  );
};

export default WeekNavigation;
