import { useContext } from 'react';
import { toast } from 'react-toastify';


import Button from './UI/Button.jsx';
import CartContext from '../Store/CartContext.jsx';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
      toast.success("Added To Cart!");
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
       <img src={`https://zwiggy.duckdns.org/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {meal.price}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
       
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        
      </article>
    </li>
  );
}