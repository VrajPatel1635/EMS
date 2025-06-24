// src/context/AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react';
// Corrected import: Import the default 'LocalStorage' object, not a named export 'getLocalStorage'
import LocalStorage from '../utils/LocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]); // This state will now hold employee data within AuthProvider

  useEffect(() => {
    // Use the LocalStorage utility's getItem method
    const employees = LocalStorage.getItem('userData'); // 'userData' is the key we use for all employee data
    setUserData(employees || []); // Initialize with fetched data or an empty array
    console.log("AuthProvider: Initializing userData from localStorage:", employees);
  }, []);

  const updateUserData = (updatedData) => {
    setUserData(updatedData);
    // Use the LocalStorage utility's setItem method
    LocalStorage.setItem('userData', updatedData); // Update localStorage via utility
    console.log("AuthProvider: Updating userData in state and localStorage:", updatedData);
  };

  // The AuthContext value should expose the userData and the updater function
  return (
    <AuthContext.Provider value={[userData, updateUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
