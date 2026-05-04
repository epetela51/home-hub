import React from 'react';

const DateBox = ({ formattedDate }) => {
  return (
    <div className="w-14 flex flex-col items-center justify-center bg-gray-50 border border-gray-300 rounded-lg py-1">
      <div className="text-sm font-bold text-gray-700">{formattedDate.day}</div>
      <div className="text-xl font-semibold text-gray-900">{formattedDate.date}</div>
    </div>
  );
};

export default React.memo(DateBox);
