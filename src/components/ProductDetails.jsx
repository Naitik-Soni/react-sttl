import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addToCart } from '../actions/cartActions';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, loading, error } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    const userId = user?.user?.data?.user?._id; // Get the user ID from the auth state

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.product._id === product.data._id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product: product.data, price: product.data.price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Product Added into Cart");
  };

  if (loading) {
    return <p className="text-center mt-8">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">Error: {error.message}</p>;
  }

  if (!product) {
    return <p className="text-center mt-8">Product not found</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
          <img
            src={product.data.image}
            alt={product.data.name}
            className="w-full md:w-1/2 object-cover"
          />
          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{product.data.name}</h2>
              <p className="text-gray-600 mb-4">{product.data.description}</p>
              <p className="text-xl font-semibold text-gray-800">Price: ${product.data.price}</p>
            </div>
            <button
              className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleAddToCart}
            >
              Add to Cart
              <svg
                className="ml-2 w-5 h-5 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
