import React, { useState } from 'react';
import { BiPencil } from 'react-icons/bi';

const Account = ({ user, onLogout, onUpdate }) => {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [address, setAddress] = useState(user.address);
  const [number, setNumber] = useState(user.number);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };
  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };
  const handleEditNumber = () => {
    setIsEditingNumber(true);
  };

  const handleSaveEmail = () => {
    setIsEditingEmail(false);
    const updatedUser = { ...user, email };
    onUpdate(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')).map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  };

  const handleSavePassword = () => {
    setIsEditingPassword(false);
    const updatedUser = { ...user, password };
    onUpdate(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')).map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  };

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
    const updatedUser = { ...user, address };
    onUpdate(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')).map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  };

  const handleSaveNumber = () => {
    setIsEditingNumber(false);
    const updatedUser = { ...user, number };
    onUpdate(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')).map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[90%] md:w-[50%] border rounded-md m-auto p-6 bg-white shadow-md">
        <div className="mb-4 flex gap-3 h-[26px] justify-between">
          {isEditingEmail ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-2 h-[26px]"
              />
              <button onClick={handleSaveEmail} className="px-2 bg-blue-500 text-white rounded">Save</button>
            </>
          ) : (
            <>
              <span className="block mb-2">{email}</span>
              <button onClick={handleEditEmail} className="p-1 rounded bg-green-500 text-white"><BiPencil /></button>
            </>
          )}
        </div>
        <div className="mb-4 flex gap-3 h-[26px] justify-between">
          {isEditingPassword ? (
            <>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2 h-[26px]"
              />
              <button onClick={handleSavePassword} className="px-2 bg-blue-500 text-white rounded">Save</button>
            </>
          ) : (
            <>
              <span className="block mb-2">*********</span>
              <button onClick={handleEditPassword} className="p-1 rounded bg-green-500 text-white"><BiPencil /></button>
            </>
          )}
        </div>
        <div className="mb-4 flex gap-3 h-[26px] justify-between">
          {isEditingAddress ? (
            <>
              <input
                type="text"
                value={address}
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded mb-2 h-[26px]"
              />
              <button onClick={handleSaveAddress} className="px-2 bg-blue-500 text-white rounded">Save</button>
            </>
          ) : (
            <>
               <input
                type="text"
                value={address}
                placeholder='Add Address'
                className="w-full p-2 border rounded mb-2 h-[26px]"
                disabled
              />
              <button onClick={handleEditAddress} className="p-1 rounded bg-green-500 text-white"><BiPencil /></button>
            </>
          )}
        </div>
        <div className="mb-4 flex gap-3 h-[26px] justify-between">
          {isEditingNumber ? (
            <>
              <input
                type="number"
                value={number}
                placeholder='Phone Number'
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-2 border rounded mb-2 h-[26px]"
              />
              <button onClick={handleSaveNumber} className="px-2 bg-blue-500 text-white rounded">Save</button>
            </>
          ) : (
            <>
              <input
                type="number"
                value={number}
                placeholder='Add Phone Number'
                className="w-full p-2 border rounded mb-2 h-[26px]"
                disabled
              />
              <button onClick={handleEditNumber} className="p-1 rounded bg-green-500 text-white"><BiPencil /></button>
            </>
          )}
        </div>
        <button onClick={onLogout} className="w-full p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default Account;