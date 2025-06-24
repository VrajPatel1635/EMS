import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import AdminDash from './components/Dashboard/AdminDash';
import EmployeeDash from './components/Dashboard/EmployeeDash';
import LocalStorage from './utils/LocalStorage';
import { initialAdminData, initialEmployeesData } from './data/InitialData'; // Ensure initialEmployeesData is imported
import AuthProvider, { AuthContext } from './context/AuthProvider'; // Import AuthProvider and AuthContext

function AppWrapper() {
  // We'll now get userData and updateUserData from AuthContext
  const [allUsersData, updateAllUsersData] = React.useContext(AuthContext); // This will be the array of all employees
  
  // AppWrapper still needs to manage who is logged in (user role, loggedInUserData)
  const [userRole, setUserRole] = useState(null); // 'admin' or 'employee'
  const [loggedInUserSpecificData, setLoggedInUserSpecificData] = useState(null); // The actual user object for the logged-in person

  const navigate = useNavigate();

  useEffect(() => {
    console.log("AppWrapper useEffect: Initializing loggedInUser state...");
    const storedLoggedInUser = LocalStorage.getItem('loggedInUser');

    if (storedLoggedInUser !== null && typeof storedLoggedInUser === 'object' && 'role' in storedLoggedInUser && 'data' in storedLoggedInUser) {
      setUserRole(storedLoggedInUser.role);
      setLoggedInUserSpecificData(storedLoggedInUser.data);
      console.log("AppWrapper useEffect: Restored loggedInUser from localStorage:", storedLoggedInUser);
    } else {
      console.warn('AppWrapper useEffect: No valid loggedInUser in localStorage. User not logged in. Clearing any invalid.');
      setUserRole(null);
      setLoggedInUserSpecificData(null);
      LocalStorage.removeItem('loggedInUser');
    }
  }, []); // Run once on mount

  const handleLogin = (email, password) => {
    console.log("handleLogin: Attempting login for email:", email, " and password:", password);
    console.log("handleLogin: Current allUsersData for search (from AuthContext):", allUsersData);

    // Admin login
    if (email === initialAdminData.email && password === initialAdminData.password) {
      const adminData = { firstname: initialAdminData.firstname, email: initialAdminData.email };
      setUserRole('admin');
      setLoggedInUserSpecificData(adminData);
      LocalStorage.setItem('loggedInUser', { role: 'admin', data: adminData });
      console.log("handleLogin: Admin logged in. Setting state and localStorage:", adminData);
      navigate('/admin');
    } else {
      // Employee login: search in the allUsersData array from AuthContext
      const employee = allUsersData.find(
        (e) => {
          const emailMatch = e.email.toLowerCase() === email.toLowerCase();
          const passwordMatch = e.password === password;
          console.log(`  Checking employee: ${e.email}. Email match: ${emailMatch}, Password match: ${passwordMatch}. Overall Match: ${emailMatch && passwordMatch}`);
          return emailMatch && passwordMatch;
        }
      );

      console.log("handleLogin: Result of employee search:", employee);

      if (employee) {
        setUserRole('employee');
        setLoggedInUserSpecificData(employee);
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
    setUserRole(null);
    setLoggedInUserSpecificData(null);
    LocalStorage.removeItem('loggedInUser');
    navigate('/');
  };

  console.log("AppWrapper Render Cycle: loggedInUserSpecificData passed to children:", loggedInUserSpecificData);

  return (
    <Routes>
      <Route path="/" element={<Login handleLogin={handleLogin} />} />
      <Route
        path="/admin"
        element={<AdminDash user={loggedInUserSpecificData} changeUser={handleLogout} allEmployees={allUsersData} />} // Pass allEmployees data explicitly to AdminDash
      />
      <Route
        path="/employee"
        element={<EmployeeDash data={loggedInUserSpecificData} changeUser={handleLogout} />}
      />
    </Routes>
  );
}

const App = () => (
  <Router>
    {/* Wrap the AppWrapper with AuthProvider to provide context */}
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </Router>
);

export default App;
