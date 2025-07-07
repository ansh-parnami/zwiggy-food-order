import { useState } from 'react';
import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {};

export default function Meals() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:8080/meals/all', requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  if (error) {
    return <p>Failed to fetch meals: {error}</p>;
  }

  if (!loadedMeals || loadedMeals.length === 0) {
    return <p>No meals found.</p>;
  }

  return (
  <>
 <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto 1rem' }}>
  <input
    type="text"
    placeholder="Search for meals..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: '0.5rem 1rem 0.5rem 2.5rem', // space for icon
      borderRadius: '3rem',
      border: '2px solid',
      width: '100%',
        height:'4em',
      fontSize: '1rem',
    }}
  />
  <i
    className="fa fa-search"
    style={{
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: '#ffab04',
    }}
  ></i>
</div>


      <ul id="meals">
        {loadedMeals
          .filter((meal) =>
            meal.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
      </ul>
    </>
  );
}
