import { useLocation, Link } from 'react-router';

const MealsSubNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isWeeklyPlan = currentPath === '/meals';
  const isLibrary = currentPath === '/meals/library';

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <Link
            to="/meals"
            className={`px-3 py-2 text-sm font-medium rounded transition ${
              isWeeklyPlan
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly Plan
          </Link>
          <Link
            to="/meals/library"
            className={`px-3 py-2 text-sm font-medium rounded transition ${
              isLibrary
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Library
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealsSubNav;
