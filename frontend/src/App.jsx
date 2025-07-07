import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Headers';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthContextProvider } from './Store/AuthContext';
import { CartContextProvider } from './Store/CartContext';
import { UserProgressContextProvider } from './Store/UserProgressContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Router>
            <Header />
              <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
               <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/" element={<Home />} />
            </Routes>
             <Cart />
      <Checkout />
              </AnimatePresence>
              <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}

                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
              />
          </Router>
          
        </UserProgressContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
