import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isLoading: false,
});

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore token + user on page load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    const storedLoginTime = localStorage.getItem('loginTime');

    if (storedToken && storedLoginTime) {
      setToken(storedToken);
      setIsAuthenticated(true);
      const loginTime = new Date(storedLoginTime);
      const now = new Date();
      const diffInMinutes = Math.floor((now - loginTime) / (1000 * 60));
      if (diffInMinutes < 60) {
        setToken(storedToken);
        setIsAuthenticated(true);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } else {
        logout(); // Auto-logout if expired
      }

    }


    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://zwiggy.duckdns.org/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      const authToken = data.token;

      localStorage.setItem('authToken', authToken);
      localStorage.setItem('loginTime', new Date().toISOString());
      setToken(authToken);
      setIsAuthenticated(true);

      const name = email.split("@")[0];
      const userObj = { name,email};
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch('https://zwiggy.duckdns.org/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      const authToken = data.token;


      localStorage.setItem('authToken', authToken);
      localStorage.setItem('loginTime', new Date().toISOString());
      setToken(authToken);
      setIsAuthenticated(true);

      const name = email.split("@")[0];
      const userObj = { name, email};
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));

      return { success: true };
    } catch (error) {
      return { success: false, error: "user already registered" };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);

  };

  const authContext = {
    isAuthenticated,
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
