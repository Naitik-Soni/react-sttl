import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState('cash');

  const { register, handleSubmit, formState: { errors } } = useForm();
  const items = JSON.parse(localStorage.getItem('cart')) || [];

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const calculateTotalAmount = () => {
    return items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
  };

  const onSubmit = (formData) => {
    const order = {
      items,
      selectedAddress: formData,
      selectedPayment,
      totalAmount: calculateTotalAmount(),
      totalItem: items.length,
      status: 'Pending',
    };

    // Simulate order creation or any other logic here
    console.log('Order Details:', order);

    // Clear cart after successful order placement
    localStorage.removeItem('cart');

    // Redirect to order success page or order details page
    toast.success("Order is Placed!Thank you");
    navigate('/');    
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 m-10">
        {/* Delivery Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-4">Delivery Details</h2>
            <div className="grid grid-cols-1 gap-y-4">
            <input
  type="text"
  {...register("name", { required: "Name is required" })}
  placeholder="Full Name"
  className="input-field"
  style={{
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding and border are included in width calculation
  }}
/>


              <input
                type="text"
                {...register("phone", { required: "Phone Number is required" })}
                placeholder="Phone Number"
                className="input-field"
                style={{
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding and border are included in width calculation
  }}
              />
              <input
                type="text"
                {...register("street", { required: "Street address is required" })}
                placeholder="Street Address"
                className="input-field"
                style={{
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding and border are included in width calculation
  }}
              />
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                placeholder="City"
                className="input-field"
                style={{
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding and border are included in width calculation
  }}
              />
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                placeholder="State / Province"
                className="input-field"
                style={{
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding and border are included in width calculation
  }}
              />
              <input
                type="text"
                {...register("pinCode", { required: "Postal code is required" })}
                placeholder="ZIP / Postal code"
                className="input-field"
                style={{
    marginTop: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box', // Ensures padding and border are included in width calculation
  }}
              />
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-4">Payment Method</h2>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    checked={selectedPayment === 'cash'}
                    onChange={handlePaymentChange}
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-900">Cash on Delivery</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="cheque"
                    checked={selectedPayment === 'cheque'}
                    onChange={handlePaymentChange}
                    className="form-radio h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-gray-900">Cheque</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold leading-7 text-gray-900 mb-4">Cart Summary</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Product</th>
                <th className="text-left px-4 py-2">Quantity</th>
                <th className="text-right px-4 py-2">Price</th>
                <th className="text-right px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                <td className="text-left px-4 py-2">
                <img src={item.product.image} alt={item.product.name} className="h-12 w-12 object-contain" />
               {item.product.name}
              </td>
                 
                 

                  <td className="text-left px-4 py-2">{item.quantity}</td>
                  <td className="text-right px-4 py-2">${item.product.price.toFixed(2)}</td>
                  <td className="text-right px-4 py-2">${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200">
                <td colSpan="3" className="text-right font-semibold px-4 py-2">Total:</td>
                <td className="text-right px-4 py-2">${calculateTotalAmount().toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
