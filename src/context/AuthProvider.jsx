// src/context/AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react';
import LocalStorage from '../utils/LocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Keep this if you want a loading state

  useEffect(() => {
    // Attempt to load user from local storage on initial mount
    const storedUser = LocalStorage.getItem('loggedInUser');
    // FIX: Add explicit null check before checking typeof or properties
    if (storedUser !== null && typeof storedUser === 'object' && 'role' in storedUser && 'data' in storedUser) {
      setUserData(LocalStorage.getItem('userData') || []); // Also ensure userData is loaded here if AuthProvider is central
      // You likely want to set the actual logged in user data somewhere here too
      // For example, if AuthProvider is also managing the *currently logged in user*
      // It depends on whether App.jsx or AuthProvider is the primary manager of loggedInUserData
      // For now, I'll assume AuthProvider's user state is for Auth context.
      // setUser(storedUser); // Uncomment if AuthProvider manages the logged in user state
      console.log("AuthProvider: Restored user from localStorage:", storedUser);
    } else {
      console.warn("AuthProvider: Invalid user data in localStorage or null, clearing.");
      LocalStorage.removeItem('loggedInUser');
      // If AuthProvider manages logged in user, also set it to null here
      // setUser(null);
    }
    setLoading(false); // Finished initial loading check
  }, []);

  const updateUserData = (updatedData) => {
    setUserData(updatedData);
    LocalStorage.setItem('userData', updatedData);
    console.log("AuthProvider: Updating userData in state and localStorage:", updatedData);
  };

  const authContextValue = {
    userData, // Expose userData from AuthProvider
    updateUserData, // Expose the updater function
    // user, // If AuthProvider manages current logged in user
    // loading, // If you use a loading state
  };

  if (loading) {
    // This part depends on if you're using AuthProvider for login loading too
    // return <div className="text-white p-10">Authenticating...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
