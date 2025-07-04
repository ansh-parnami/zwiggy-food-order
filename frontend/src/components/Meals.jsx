import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('https://zwiggy-food-order-1.onrender.com/meals/all', requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  // if (!data) {
  //   return <p>No meals found.</p>
  // }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}