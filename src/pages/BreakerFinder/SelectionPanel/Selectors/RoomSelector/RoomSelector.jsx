import React from 'react';
import SelectField from '../../../../../components/SelectField/SelectField';

/**
 * Presentational component for room selection
 * Conditionally shown when selected floor has a room structure
 */
const RoomSelector = ({ value, options, onChange }) => {
  return (
    <SelectField
      label="Select Room"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Choose a room..."
    />
  );
};

export default React.memo(RoomSelector);
