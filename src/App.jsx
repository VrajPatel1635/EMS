import React, { useEffect, useState } from 'react';
// Changed BrowserRouter to HashRouter here
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import AdminDash from './components/Dashboard/AdminDash';
import EmployeeDash from './components/Dashboard/EmployeeDash';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const storedUsers = localStorage.getItem('userData');

    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.role);
      setLoggedInUserData(parsed.data);
    }

    // UPDATED: Initialize default employees if no user data is found OR if it's an empty array
    if (!storedUsers || JSON.parse(storedUsers).length === 0) {
      const defaultEmployees = [
        {
          id: 1,
          firstname: 'Aarav',
          email: 'aarav@example.com',
          password: '12345',
          role: 'employee',
          tasks: [
            {
              title: 'Complete Report',
              description: 'Finish the quarterly report.',
              newTask: true,
              active: false,
              completed: false,
              failed: false
            },
            {
              title: 'Team Meeting',
              description: 'Attend the weekly team sync.',
              newTask: false,
              active: true,
              completed: false,
              failed: false
            }
          ]
        },
        // ADDED: Second default employee for better testing and data consistency
        {
          id: 2,
          firstname: 'Bhavya',
          email: 'bhavya@example.com',
          password: '67890',
          role: 'employee',
          tasks: [
            {
              title: 'Client Call',
              description: 'Discuss project progress with client.',
              newTask: true,
              active: false,
              completed: false,
              failed: false
            },
            {
              title: 'Review Code',
              description: 'Review pull requests for team project.',
              newTask: false,
              active: true,
              completed: false,
              failed: false
            }
          ]
        }
      ];
      localStorage.setItem('userData', JSON.stringify(defaultEmployees));
      setUserData(defaultEmployees);
    } else {
      setUserData(JSON.parse(storedUsers));
    }
    console.log("App.jsx loaded - Version XYZ");
  }, []); // Empty dependency array means this runs once on component mount

  const handleLogin = (email, password) => {
    // Admin login
    if (email === 'admin@example.com' && password === '12345') {
      const adminData = { name: 'Admin', email };
      setUser('admin');
      setLoggedInUserData(adminData);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: adminData }));
      navigate('/admin'); // Navigate to admin dashboard
    } else {
      // Employee login
      const users = JSON.parse(localStorage.getItem('userData')) || [];
      const employee = users.find(
        (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
        navigate('/employee'); // Navigate to employee dashboard
      } else {
        // Using console.warn instead of alert()
        console.warn('Invalid Credentials: User not found or incorrect password.');
        // In a real app, you'd update a state to show an error message on the UI
      }
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user role state
    setLoggedInUserData(null); // Clear logged in user data state
    localStorage.removeItem('loggedInUser'); // Remove user data from localStorage
    navigate('/'); // Navigate back to the login page
  };

  return (
    <Routes>
      {console.log("Rendering AppWrapper")}
      {/* Temporary H1 to see if this specific change goes live */}
      <h1 style={{color: 'red', textAlign: 'center'}}>TEST VERSION A-1</h1>
      {/* Route for the login page, accessible at the root or /# */}
      <Route path="/" element={<Login handleLogin={handleLogin} />} />
      {/* Route for the Admin Dashboard */}
      <Route
        path="/admin"
        element={<AdminDash user={loggedInUserData} changeUser={handleLogout} />}
      />
      {/* Route for the Employee Dashboard */}
      <Route
        path="/employee"
        element={<EmployeeDash data={loggedInUserData} changeUser={handleLogout} />}
      />
      {/* You might want a catch-all route for 404s, but HashRouter helps mitigate this */}
      {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
    </Routes>
  );
}

const App = () => (
  // HashRouter does not need a basename, as the hash itself handles subpaths
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
