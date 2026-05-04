import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router';

import Home from './pages/Home/Home';
import BreakerFinder from './pages/BreakerFinder/BreakerFinder';
import Meals from './pages/Meals/WeeklyPlan/WeeklyPlan';
import MealsLibrary from './pages/Meals/MealsLibrary/MealsLibrary/MealsLibrary';

import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/breaker" element={<BreakerFinder />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/meals/library" element={<MealsLibrary />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
