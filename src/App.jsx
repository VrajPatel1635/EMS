import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import AdminDash from './components/Dashboard/AdminDash';
import EmployeeDash from './components/Dashboard/EmployeeDash';
import LocalStorage from './utils/LocalStorage'; // Import the generic utility
import { initialEmployeesData, initialAdminData } from './data/InitialData'; // Import your initial data

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useState([]); // This will hold all employee data
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AppWrapper useEffect: Initializing data...");

    // Initialize userData (all employees)
    const storedUsers = LocalStorage.getItem('userData');
    if (Array.isArray(storedUsers) && storedUsers.every(u => typeof u === 'object' && 'email' in u && 'tasks' in u)) {
      setUserData(storedUsers);
      console.log("AppWrapper useEffect: Loaded userData from localStorage.");
    } else {
      console.warn('AppWrapper useEffect: Invalid or no userData in localStorage. Setting default employees.');
      LocalStorage.setItem('userData', initialEmployeesData);
      setUserData(initialEmployeesData);
    }

    // Initialize loggedInUser
    const storedLoggedInUser = LocalStorage.getItem('loggedInUser');
    // FIX: Add explicit null check before checking 'typeof' or 'in' operator
    if (storedLoggedInUser !== null && typeof storedLoggedInUser === 'object' && 'role' in storedLoggedInUser && 'data' in storedLoggedInUser) {
      initialLoggedInUser = storedLoggedInUser; // Assign to initialLoggedInUser
      setUser(initialLoggedInUser.role);
      setLoggedInUserData(initialLoggedInUser.data);
      console.log("AppWrapper useEffect: Loaded loggedInUser from localStorage.");
    } else {
      console.warn('AppWrapper useEffect: No valid loggedInUser in localStorage. User not logged in.');
      setUser(null);
      setLoggedInUserData(null);
      LocalStorage.removeItem('loggedInUser'); // Ensure invalid data is removed
    }
  }, []);

  const handleLogin = (email, password) => {
    console.log("handleLogin: Attempting login for email:", email);

    // Admin login
    if (email === initialAdminData.email && password === initialAdminData.password) {
      const adminData = { firstname: initialAdminData.firstname, email: initialAdminData.email };
      setUser('admin');
      setLoggedInUserData(adminData);
      LocalStorage.setItem('loggedInUser', { role: 'admin', data: adminData });
      console.log("handleLogin: Admin logged in.", adminData);
      navigate('/admin');
    } else {
      // Employee login: search in the current userData state
      const employee = userData.find(
        (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        LocalStorage.setItem('loggedInUser', { role: 'employee', data: employee });
        console.log("handleLogin: Employee logged in.", employee);
        navigate('/employee');
      } else {
        console.warn('Invalid Credentials: User not found or incorrect password.');
      }
    }
  };

  const handleLogout = () => {
    console.log("handleLogout: Logging out user.");
    setUser(null);
    setLoggedInUserData(null);
    LocalStorage.removeItem('loggedInUser');
    navigate('/');
  };

  console.log("AppWrapper Render Cycle: loggedInUserData passed to children:", loggedInUserData);

  return (
    <Routes>
      <Route path="/" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/admin"
        element={<AdminDash user={loggedInUserData} changeUser={handleLogout} />}
      />
      <Route
        path="/employee"
        element={<EmployeeDash data={loggedInUserData} changeUser={handleLogout} />}
      />
    </Routes>
  );
}

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
