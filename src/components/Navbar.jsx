import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false)

  // To render automatically if user login so a profile button appear on navbar 
  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin')
    if (isLogin === 'true') {
      setLoggedIn(true)
    }
  }, [])
  
  return (
    <nav className="bg-white/20 fixed w-[100%] text-white shadow-md rounded-b-lg backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-semibold cursor-pointer" onClick={() => navigate('/')}>
          Chaintech
        </div>
        <div className="flex space-x-2 md:space-x-4">
          {loggedIn &&
            <button
              onClick={() => navigate('/account')}
              className="bg-gray-600 hover:bg-gray-500 text-white text-[13px] md:text-base font-semibold py-1 px-4 rounded-md transition duration-300"
            >
              Profile
            </button>
          }
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-600 hover:bg-gray-500 text-white text-[12px] md:text-base font-semibold py-1 px-4 rounded-md transition duration-300"
          >
            SignUp
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-600 hover:bg-gray-500 text-white text-[12px] md:text-base font-semibold py-1 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
