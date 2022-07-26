import React from 'react';
import { Home } from './components/home/home';
import { Login } from './components/auth/login';
import { Registration } from './components/auth/registration'
import { Redirect } from './components/auth/redirect';
import { Products } from './components/products/products';
import { Profile } from './components/profile/profile';
import { Item } from './components/item/item';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App" 
      style={{
        position: 'relative', 
        width: '100vw', 
        height: '100vh'}}>
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
          element={ 
            <Redirect/>
          }
        />
        <Route 
          path="/products" 
          element={ 
            <Products/> 
          }
        />
        <Route 
          path="/products/:productId" 
          element={ 
            <Item/> 
          }
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
