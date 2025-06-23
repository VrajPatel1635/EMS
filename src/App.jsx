import React, { useEffect, useState } from 'react';
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
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser.role);
      setLoggedInUserData(parsedUser.data);
    }

    const existing = localStorage.getItem('userData');
    if (!existing) {
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
          ],
        },
      ];

      localStorage.setItem('userData', JSON.stringify(defaultEmployees));
      setUserData(defaultEmployees);
    } else {
      setUserData(JSON.parse(existing));
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '12345') {
      const adminData = { name: 'Admin', email };
      setUser('admin');
      setLoggedInUserData(adminData);
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ role: 'admin', data: adminData })
      );
      navigate('/admin');
    } else if (userData) {
      const employee = userData.find(
        (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        );
        navigate('/employee');
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

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
  <Router basename="/EMS">
    <AppWrapper />
  </Router>
);

export default App;
