import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartLocal, fetchCartItems } from '../actions/cartActions'; // Import addToCartLocal action
import { logoutUser } from '../actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const user = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(localCart.length);

    if (localCart.length > 0) {
      dispatch(addToCartLocal(localCart));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info('Logout successful');
    navigate('/login');
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-md">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/"
                      className={classNames(
                        'border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                    >
                      Home
                    </Link>
                    <Link
                      to="/login"
                      className={classNames(
                        'border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={classNames(
                        'border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                    >
                      Register
                    </Link>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Link to="/cart">
                    <button
                      type="button"
                      className="relative ml-4 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View cart</span>
                      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </Link>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-3">
                <Disclosure.Button
                  as={Link}
                  to="/"
                  className={classNames(
                    'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to="/login"
                  className={classNames(
                    'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                >
                  Login
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to="/register"
                  className={classNames(
                    'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                >
                  Register
                </Disclosure.Button>
                <Disclosure.Button
                  as="button"
                  onClick={handleLogout}
                  className={classNames(
                    'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                >
                  Logout
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};

export default Navbar;
