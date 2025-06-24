// src/context/AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react';
import LocalStorage from '../utils/LocalStorage';
import { initialEmployeesData } from '../data/InitialData'; // Import initial employee data here

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [allEmployeesData, setAllEmployeesData] = useState([]); // This will hold the ARRAY of all employees

  useEffect(() => {
    console.log("AuthProvider useEffect: Initializing allEmployeesData from localStorage...");
    const storedEmployees = LocalStorage.getItem('userData'); // Key used to store all employee data

    if (Array.isArray(storedEmployees) && storedEmployees.every(u => typeof u === 'object' && 'email' in u && 'tasks' in u)) {
      setAllEmployeesData(storedEmployees);
      console.log("AuthProvider useEffect: Loaded allEmployeesData from localStorage:", storedEmployees);
    } else {
      console.warn("AuthProvider useEffect: Invalid or no allEmployeesData in localStorage. Setting default initialEmployeesData.");
      LocalStorage.setItem('userData', initialEmployeesData); // Set default via utility
      setAllEmployeesData(initialEmployeesData);
    }
  }, []);

  const updateAllEmployeesData = (updatedData) => {
    console.log("AuthProvider: Updating allEmployeesData in state and localStorage:", updatedData);
    setAllEmployeesData(updatedData);
    LocalStorage.setItem('userData', updatedData); // Save updated array to localStorage
  };

  // The context value will provide the array of all employees and the function to update it
  const contextValue = [allEmployeesData, updateAllEmployeesData];

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
