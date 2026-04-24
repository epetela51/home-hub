import { memo } from 'react';

const SelectField = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Choose an option...',
  formatOption,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // Detect if options are objects with id/meal properties or simple strings
  const isMealFormat = options.length > 0 && typeof options[0] === 'object' && 'id' in options[0];

  const renderOptions = () => {
    if (isMealFormat) {
      // For meal objects: use id and meal properties
      return options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.meal}
        </option>
      ));
    } else {
      // For string arrays: render directly, optionally format them
      return options.map((option) => (
        <option key={option} value={option}>
          {formatOption ? formatOption(option) : option}
        </option>
      ));
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <select
        value={value || ''}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="">{placeholder}</option>
        {renderOptions()}
      </select>
    </div>
  );
};

export default memo(SelectField);
