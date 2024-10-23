import React, { useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { GoEyeClosed } from 'react-icons/go';

const Account = ({ user, onLogout, onUpdate }) => {
  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [address, setAddress] = useState(user.address);
  const [number, setNumber] = useState(user.number);
  const [isPopup, setisPopup] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);
  const [isEditing, setIsEditing] = useState(false);

  // Function for Edit Information 
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save edited information 
  const handleSave = () => {
    setIsEditing(false);
    const updatedUser = { ...user, name, email, password, address, number, profilePicture };
    onUpdate(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')).map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    setisPopup(true);
    setTimeout(() => {
      setisPopup(false);
    }, 1000);
  };

  // Function to change and save the profile picture 
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
      const updatedUser = { ...user, profilePicture: reader.result, name, email, password, address, number };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onUpdate(updatedUser);
      setisPopup(true);
      setTimeout(() => {
        setisPopup(false);
      }, 1000);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to see password 
  const handlePassword = () => {
    setisPassword(!isPassword);
  };

  return (
    <div className="flex justify-center items-center pb-20">
      {/* Popup */}
      {isPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="text-lg md:text-xl font-bold bg-white p-4 rounded-lg shadow-lg">
            🎉 Profile Updated 🎉
          </div>
        </div>
      )}

      <div className="w-[97%] text-white md:w-[50%] lg:w-[40%] xl:w-[30%] border rounded-md m-auto mt-16 p-4 bg-white/10 shadow-xl transition-all transform">
        {/* Profile Picture Section */}
        <div className="flex justify-center relative w-[127px] m-auto">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            />
          ) : (
            <div className="rounded-full w-32 h-32 bg-gray-200 flex justify-center items-center text-gray-500">
              No Image
            </div>
          )}
          {/* Pencil button to change image */}
          <label htmlFor="profilePictureInput" className="absolute bottom-0 right-0 cursor-pointer transition-all hover:scale-110">
            <BiPencil className="bg-blue-600 text-white p-2 rounded-full w-8 h-8 shadow-lg hover:shadow-2xl" />
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>

        {/* Input Fields */}
        <div className="mb-4 mt-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className={`w-full mt-4 p-3 text-black border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={`w-full mt-4 p-3 text-black border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Email"
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password">Password</label>
          <input
            type={isPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing}
            className={`w-full mt-4 p-3 text-black border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Password"
          />
          <div className="absolute right-4 top-14 text-gray-600 text-lg cursor-pointer" onClick={handlePassword}>
            {isPassword ? <GoEyeClosed /> : <BsEye />}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditing}
            className={`w-full mt-4 p-3 text-black border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Address"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="number">Phone Number</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={!isEditing}
            className={`w-full mt-4 p-3 text-black border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            placeholder="Phone Number"
          />
        </div>

        {/* Edit and Save Buttons */}
        <div className="flex justify-between">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all hover:bg-blue-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-emerald-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all hover:bg-green-700"
            >
              Edit
            </button>
          )}

          <button
            onClick={onLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
