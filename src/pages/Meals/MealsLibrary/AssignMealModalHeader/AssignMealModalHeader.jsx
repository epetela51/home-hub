/**
 * AssignMealModalHeader - Displays either the success message or the modal title.
 */
const AssignMealModalHeader = ({ mealName, successMessage }) => {
  if (successMessage) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">{successMessage}</p>
        <p className="text-base text-gray-600 mt-2">{mealName}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Assign Meal</h2>
      <p className="text-base text-gray-600 mt-1">{mealName}</p>
    </div>
  );
};

export default AssignMealModalHeader;
