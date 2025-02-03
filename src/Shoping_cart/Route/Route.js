// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useParams, BrowserRouter } from 'react-router-dom'; 
import Home from '../Index'; 
import Shop from '../Shop'; 
import Search from '../Search'; 
import Login from '../Login/Login'; 
import Register from '../Login/Register'; 
import Logout from '../Login/Logout'; 
import Cart from '../Product/AddToCart'; 
import Data from '../Productshow'; 
import Order from '../Product/Order'; 



function App() {
    const { categoryId } = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/search" element={<Search />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/shop" element={<Shop/>} />
        <Route path="/shop/:categoryId" element={<Shop categoryId={categoryId}/>} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/product/:id" element={<Data />} />
        
      </Routes>
      </BrowserRouter>
  );
}

export default App;
