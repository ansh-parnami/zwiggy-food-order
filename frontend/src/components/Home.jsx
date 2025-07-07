import Meals from './Meals.jsx';
import {motion} from 'framer-motion';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';

export default function Home() {
  return (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.6 }}>
      <Meals />
     
    </motion.div>
  );
} 