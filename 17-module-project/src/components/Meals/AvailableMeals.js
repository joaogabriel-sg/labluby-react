import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      setError(null);
      try {
        const response = await fetch(
          "https://react-http-ec9e7-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) throw new Error("Something went wrong!");

        const data = await response.json();
        const mealsData = Object.entries(data).map(([id, meal]) => ({
          id,
          ...meal,
        }));

        setMeals(mealsData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading)
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );

  if (error)
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
