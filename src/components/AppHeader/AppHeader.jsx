import { useLocation, Link } from 'react-router';

const AppHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine which section we're in
  const isHome = currentPath === '/';
  const isMeals = currentPath === '/meals' || currentPath === '/meals/library';
  const isBreaker = currentPath === '/breaker';

  const navItems = [
    { label: 'Home', path: '/', isActive: isHome },
    { label: 'Meals', path: '/meals', isActive: isMeals },
    { label: 'Breaker Finder', path: '/breaker', isActive: isBreaker },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded transition ${
                item.isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AppHeader;
