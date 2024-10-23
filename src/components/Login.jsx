import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { BsEye } from 'react-icons/bs';
import { GoEyeClosed } from 'react-icons/go';

// Define the schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters long'),
});

const Login = ({ onLogin }) => {
  const [isPopup, setisPopup] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const navigate = useNavigate();

  // Set up the react-hook-form with Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = ({ email, password }) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      onLogin({ email, password });
      localStorage.setItem('user', JSON.stringify({ email, password }));
      localStorage.setItem('isLogin', 'true');
      setisPopup(true);
      setTimeout(() => {
        navigate('/account');
      }, 1500);
    } else {
      alert('Invalid email or password');
    }
  };

  // Function to toggle password visibility
  const handlePassword = () => {
    setisPassword(!isPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Popup */}
      {isPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="text-lg md:text-xl font-bold bg-white p-4 rounded-lg shadow-lg">
            🎉 Login Successful 🎉
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 shadow-xl transition-all transform text-white p-6 rounded border border-white w-[90%] md:w-[50%]">
        <h2 className="text-2xl mb-4">Login</h2>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            placeholder="maaz@gmail.com"
            {...register('email')} 
            className="w-full p-2 border rounded text-black"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="block mb-2">Password</label>
          <input
            type={isPassword ? 'text' : 'password'}
            placeholder="Password10"
            {...register('password')}
            className="w-full p-2 border rounded text-black"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <div className="absolute right-4 top-11 text-gray-600 text-lg" onClick={handlePassword}>
            {isPassword ? <GoEyeClosed /> : <BsEye />}
          </div>
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Login</button>
        <div className="mt-5 text-[14px] md:text-base">
          Didn't create any account?
          <Link className="ml-1 md:ml-3 text-blue-400 hover:text-blue-300" to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
