import React, { useState } from 'react';
import { Search } from './components/Search/search';
import { Home } from './components/home/home';
import { Login } from './components/auth/login';
import { Registration } from './components/auth/registration'
import { Redirect } from './components/auth/redirect';
import { Products } from './components/products/products';
import { Profile } from './components/profile/profile';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});

  return (
    <div className="App" style={{width: '100vw', height: '100vh'}}>
      {/* searchbar will not render if URL =/login or /registration /redirect*/}
      <Search/>
      <Routes>
        <Route 
          path="" 
          element={ <Home/> }
        />
        <Route 
          path="/login" 
          element={ <Login/> }
        />
        <Route 
          path="/registration" 
          element={ <Registration/> }
        />
        <Route 
          path="/redirect" 
          element={ <Redirect 
                      setLoggedIn={setLoggedIn} 
                      setUser={setUser}
                      setCart={setCart}
                    /> }
        />
        <Route 
          path="/products" 
          element={ <Products/> }
        />
        <Route 
          path="/profile" 
          element={ <Profile />}
        />
      </Routes>
    </div>
  );
}

export default App;
