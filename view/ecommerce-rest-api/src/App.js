import React from 'react';
import { Search } from './components/Search/search';
import { Home } from './components/home/home';
import { Login } from './components/auth/login';
import { Registration } from './components/auth/registration'
import { Products } from './components/products/products';
import { Profile } from './components/profile/profile';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Search/>
      <Routes>
        <Route path="" element={ <Home/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/registration" element={ <Registration/> }/>
        <Route path="/products" element={ <Products/> }/>
        <Route path="/profile" element={ <Profile />}/>
      </Routes>
    </div>
  );
}

export default App;
