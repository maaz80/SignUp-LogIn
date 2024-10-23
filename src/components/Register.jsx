import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'; // Import Yup for validation
import { BsEye } from 'react-icons/bs';
import { GoEyeClosed } from 'react-icons/go';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  Name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .matches(/[A-Z]/, 'Password must contain one uppercase letter')
    .matches(/\W/, 'Password must contain one symbol')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isPopup, setIsPopup] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use Yup for validation
  });

//   Form Submission 
  const onSubmit = (data) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userExists = registeredUsers.some((u) => u.email === data.email);
    if (userExists) {
      alert('User with this email already exists');
    } else {
      registeredUsers.push(data);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('isLogin', 'true');
      setIsPopup(true);
      onRegister(data);

      setTimeout(() => {
        navigate('/account');
      }, 1500);
    }
  };

//   Function to see password 
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Popup */}
      {isPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="text-lg md:text-xl font-bold bg-white p-4 rounded-lg shadow-lg">
            🎉 Registration Successful 🎉
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/10 shadow-xl border border-white text-white p-6 rounded w-[97%] md:w-[50%]">
        <h2 className="text-2xl mb-4">Register</h2>

        <div className="mb-4">
          <label className="block mb-2">Full Name</label>
          <input
            type="text"
            {...register('Name')} 
            className={`w-full p-2 border rounded text-black ${errors.Name ? 'border-red-500' : ''}`}
            placeholder="Maaz Shakeel"
          />
          <p className="text-red-500">{errors.Name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register('email')} 
            className={`w-full p-2 border rounded text-black ${errors.email ? 'border-red-500' : ''}`}
            placeholder="maaz@gmail.com"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className="mb-4 relative">
          <label className="block mb-2">Password</label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password')} 
            className={`w-full p-2 border rounded text-black ${errors.password ? 'border-red-500' : ''}`}
            placeholder="Password10"
          />
          <div className="absolute right-4 top-11 text-gray-600 text-lg" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <GoEyeClosed /> : <BsEye />}
          </div>
          <p className="text-red-500">{errors.password?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Confirm Password</label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('confirmPassword')} 
            className={`w-full p-2 border rounded text-black ${errors.confirmPassword ? 'border-red-500' : ''}`}
            placeholder="Password10"
          />
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Sign Up</button>
        <div className="mt-5 text-[14px] md:text-base">
          Already have an account?
          <Link className="ml-1 md:ml-3 text-blue-400 hover:text-blue-300" to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
