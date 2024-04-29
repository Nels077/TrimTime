import Favorites from './components/favorites/favorites';
import Login from './components/form/login/Login';
import Header from './components/header/Header';
import Background from './components/main_background/background';
import { useState,useEffect } from 'react';
import "./styles/common.css"
import "./index.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if the user is authenticated in localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // User is authenticated
      setIsAuthenticated(true);
    } else {
      // User is not authenticated
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      <Header />
      <Background />
      <Favorites/>
    </>
  );
}

export default App;