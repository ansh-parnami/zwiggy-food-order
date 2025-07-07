import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../Store/CartContext.jsx';
import UserProgressContext from '../Store/UserProgressContext.jsx';
import AuthContext from '../Store/AuthContext.jsx';
import {motion} from 'framer-motion';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
   const isOnOrderHistoryPage = location.pathname === '/order-history';
   const isHomePage = location.pathname === '/';

  const totalCartItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleShowCart() {
    if (!authCtx.isAuthenticated) {
      userProgressCtx.showCheckout();
    } else {
      userProgressCtx.showCart();
    }
  }

  return (
    <>
      <motion.header id="main-header"
                     initial={{ opacity: 0, y: -30 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -30 }}
                     transition={{ duration: 0.6 }}>
        <div id="title">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logoImg} alt="A restaurant" />
            <h1>ZWIGGY</h1>
          </Link>
        </div>

        <motion.nav key={location.pathname} // re-renders nav when path changes
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}>
          {authCtx.isAuthenticated ? (
            <>
            {!isOnOrderHistoryPage && (
              <span className="user-info">Welcome, {authCtx.user?.name}</span>)}
            {!isHomePage && (
                       <Link to="/">
    <span><Button textOnly>Home</Button></span>
  </Link>
)}

{!isOnOrderHistoryPage && (
  <Link to="/order-history">
    <span><Button textOnly>Order History</Button></span>
  </Link>
)}
              <Button textOnly onClick={authCtx.logout}>Logout</Button>
              <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </>
          ) : (
            <div className="auth-buttons">
              {location.pathname !== '/' && (
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              )}
              {location.pathname !== '/login' && (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
              {location.pathname !== '/register' && (
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              )}
              <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </div>
          )}
        </motion.nav>
      </motion.header>

      {/* ✅ Mobile Bottom Nav */}
      <nav className="bottom-nav"
      >
        <Link to="/">
          🏠 <span>Home</span>
        </Link>
        <button onClick={handleShowCart}>
          🛒 <span>Cart ({totalCartItems})</span>
        </button>
        {authCtx.isAuthenticated ? (
          <button onClick={authCtx.logout}>
            🚪 <span>Logout</span>
          </button>
        ) : location.pathname === '/login' ? (
          <Link to="/register">
            📝 <span>Sign Up</span>
          </Link>
        ) : (
          <Link to="/login">
            👤 <span>Login</span>
          </Link>
        )}
      </nav>
    </>
  );
}
