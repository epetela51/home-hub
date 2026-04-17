const SelectField = ({ value, onChange, options }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <select
        value={value || ''}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option value="">Choose a meal...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.meal}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
