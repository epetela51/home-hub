import SelectField from '../../../components/SelectField/SelectField';

const MealSelector = ({ meals = [], onSelect }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Edit or Delete Meal</h3>
      <SelectField value={''} onChange={onSelect} options={meals} />
    </div>
  );
};

export default MealSelector;
