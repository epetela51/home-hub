const TextInput = ({ value, onChange, placeholder, isTextarea = false }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const baseClassName = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  const commonAttributes = {
    value: value || "",
    onChange: handleChange,
    placeholder,
  };

  return <div>{isTextarea ? <textarea {...commonAttributes} className={`${baseClassName} resize-none`} rows={3} /> : <input type="text" {...commonAttributes} className={baseClassName} />}</div>;
};

export default TextInput;
