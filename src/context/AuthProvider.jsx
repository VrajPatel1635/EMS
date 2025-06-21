import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage } from '../utils/LocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const { employees } = getLocalStorage();
    setUserData(employees || []);
  }, []);

  const updateUserData = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider value={[userData, updateUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
