import React from 'react';
import SelectField from '../../../../../components/SelectField/SelectField';

/**
 * Presentational component for floor/area selection
 * Always shown as the first step in the breaker selection flow
 */
const FloorSelector = ({ value, options, onChange }) => {
  return (
    <SelectField
      label="Select Area"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="choose an area..."
    />
  );
};

export default FloorSelector;
