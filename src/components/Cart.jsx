import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleCartChange = (e, itemIndex) => {
    const newCartItems = [...cartItems];
    const quantity = parseInt(e.target.value, 10);

    if (isNaN(quantity) || quantity < 0) {
      return;
    }

    newCartItems[itemIndex].quantity = quantity;
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleDeleteCartItem = (itemIndex) => {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    toast.info("Product Removed From Cart");
  };

  const totalAmount = cartItems.reduce((amount, item) => item.price * item.quantity + amount, 0);
  const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0);

  const handleCheckout = () => {
    const userId = user?.user?.data?.user?._id;

    if (userId) {
      cartItems.forEach(item => {
        dispatch(addToCart(userId, item.product, item.price));
      });

      setCartItems([]);
      navigate('/checkout');
    } else {
      toast.warning("Please Login To Place Order");
      navigate('/login');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto my-12 p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty!</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-900">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="text-left px-6 py-3 border-b border-gray-200">Product</th>
              <th className="text-left px-6 py-3 border-b border-gray-200">Image</th>
              <th className="text-right px-6 py-3 border-b border-gray-200">Price</th>
              <th className="text-right px-6 py-3 border-b border-gray-200">Quantity</th>
              <th className="text-right px-6 py-3 border-b border-gray-200">Subtotal</th>
              <th className="text-right px-6 py-3 border-b border-gray-200" />
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.product._id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="text-left px-6 py-4 border-b border-gray-200">{item.product.name}</td>
                <td className="text-left px-6 py-4 border-b border-gray-200">
                  <img src={item.product.image} alt={item.product.name} className="h-16 w-16 object-contain" />
                </td>
                <td className="text-right px-6 py-4 border-b border-gray-200">${item.price.toFixed(2)}</td>
                <td className="text-right px-6 py-4 border-b border-gray-200">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleCartChange(e, index)}
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                </td>
                <td className="text-right px-6 py-4 border-b border-gray-200">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="text-right px-6 py-4 border-b border-gray-200">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteCartItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg">
          Total Items: <span className="font-semibold">{totalItems}</span>
        </p>
        <p className="text-lg">
          Total Amount: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleCheckout}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
