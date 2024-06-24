import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Register from './components/Register';
import Login from './components/Login';
import { store } from './store/store';
import Cookies from 'js-cookie';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetails';

import Navbar from './components/Navbar';
import CheckOutPage from './components/CheckOutPage';
import PrivateRoute from './utils/PrivateRoute';
import Cart from './components/Cart';


const App = () => {



  
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productdetail/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />


          

          <Route path="/checkout" element={
            <PrivateRoute>
              <CheckOutPage />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
      <Toaster />
    </Provider>
  );
};

export default App;
