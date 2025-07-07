import { useMemo ,useState ,useContext,useEffect} from 'react';
import  AuthContext  from '../Store/AuthContext';
import useHttp from '../hooks/useHttp';
import OrderHistoryItem from './OrderHistoryItem';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

export default function OrderHistory() {
      const authCtx = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email;
  

  const navigate = useNavigate();
  const url = useMemo(() => {
    return `http://localhost:8080/order/history?email=${encodeURIComponent(email)}`;
  }, [email]);

  const config = useMemo(() => ({ method: 'GET' }), []);

  const { data, isLoading, error } = useHttp(url, config, []);

  if (!email) {
    return <h2 id="orders">Please log in to view your order history.</h2>;
  }
    

  return (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.6 }}>
 
      <h2 id="orders">Your Order History</h2>
      <div className="order-history">
        {isLoading && <h2 id="orders">Loading order history...</h2>}
        {error && <h2 id="orders">Error fetching order history: {error}</h2>}
        {!isLoading && data?.length === 0 && <p>No orders found.</p>}
          {/*
<input
  type="text"
  placeholder="Search by order ID or item name"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
/>
*/}

          {data && (
          <ul>
            {data.map((order) => (
              <li key={order.id}>
                <OrderHistoryItem order={order} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
