import React from 'react';
import SelectField from '../../../../../components/SelectField/SelectField';

/**
 * Presentational component for type selection (outlets, lights, appliances)
 * Conditionally shown when floor is selected and ready for type filtering
 */
const TypeSelector = ({ value, options, onChange }) => {
  return (
    <SelectField
      label="Select Type"
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Choose type..."
      formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
    />
  );
};

export default React.memo(TypeSelector);
