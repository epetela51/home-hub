import React from 'react';
import SelectField from '../../../../../components/SelectField/SelectField';

/**
 * Presentational component for item selection (specific outlet, light, appliance)
 * Conditionally shown when a type is selected
 */
const ItemSelector = ({ value, options, onChange }) => {
  return (
    <SelectField
      label="Select Item"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Choose item..."
    />
  );
};

export default ItemSelector;
