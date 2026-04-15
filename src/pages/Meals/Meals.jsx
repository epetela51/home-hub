import { useEffect, useState } from "react";

import Button from "../../components/Button/Button";

import DailyMeal from "./DailyMeal/DailyMeal";

const Meals = () => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        console.log("Meals from Flask:", data);
        console.log("week days: ", Object.keys(data.weeklyPlan));
      })
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <Button url="/" text="Go Home" />
      <section className="mt-20">
        <DailyMeal />
      </section>
    </div>
  );
};

export default Meals;
