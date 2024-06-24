import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productAction';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import { addToCartLocal } from '../actions/cartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product, price) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.product._id === product._id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product, price, quantity: 1 });
    }
    dispatch(addToCartLocal(product));
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success('Product Added into Cart');
  };

  if (!productState.products.data) {
    return <Loader />;
  }

  if (productState.error) {
    return <p>{productState.error}</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {productState.products.data.map((product) => (
            <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/productdetail/${product._id}`} className="text-blue-500 hover:underline">View Details</Link>
                    <button
                      onClick={() => handleAddToCart(product, product.price)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <svg className="w-5 h-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
