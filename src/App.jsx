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

  // Define default employees data structure
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
          failed: false,
          category: 'Reporting',
          date: '2025-07-01'
        },
        {
          title: 'Team Meeting',
          description: 'Attend the weekly team sync.',
          newTask: false,
          active: true,
          completed: false,
          failed: false,
          category: 'Meeting',
          date: '2025-06-28'
        }
      ]
    },
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
          failed: false,
          category: 'Client',
          date: '2025-07-05'
        },
        {
          title: 'Review Code',
          description: 'Review pull requests for team project.',
          newTask: false,
          active: true,
          completed: false,
          failed: false,
          category: 'Development',
          date: '2025-07-02'
        }
      ]
    }
  ];

  useEffect(() => {
    // Debug log for useEffect start
    console.log("AppWrapper useEffect: Initializing from localStorage..."); // Your debug log

    let initialUserData = [];
    let initialLoggedInUser = null;

    // --- Robust localStorage userData handling ---
    const storedUsersString = localStorage.getItem('userData');
    try {
      if (storedUsersString) {
        const parsed = JSON.parse(storedUsersString);
        if (Array.isArray(parsed) && parsed.every(u => typeof u === 'object' && 'email' in u && 'tasks' in u)) {
          initialUserData = parsed;
          console.log("AppWrapper useEffect: Parsed userData successfully.", initialUserData); // Your debug log
        } else {
          console.warn('AppWrapper useEffect: Invalid userData format in localStorage. Resetting to default.'); // Your debug log
          localStorage.removeItem('userData');
        }
      }
    } catch (e) {
      console.error('AppWrapper useEffect: Error parsing userData from localStorage. Resetting.', e); // Your debug log
      localStorage.removeItem('userData');
    }

    if (initialUserData.length === 0) {
      console.log("AppWrapper useEffect: userData empty or not found. Setting default employees."); // Your debug log
      localStorage.setItem('userData', JSON.stringify(defaultEmployees));
      initialUserData = defaultEmployees;
    }
    setUserData(initialUserData);

    // --- Robust localStorage loggedInUser handling ---
    const storedUserString = localStorage.getItem('loggedInUser');
    try {
      if (storedUserString) {
        const parsed = JSON.parse(storedUserString);
        if (typeof parsed === 'object' && 'role' in parsed && 'data' in parsed) {
          initialLoggedInUser = parsed;
          console.log("AppWrapper useEffect: Parsed loggedInUser successfully.", initialLoggedInUser); // Your debug log
        } else {
          console.warn('AppWrapper useEffect: Invalid loggedInUser format in localStorage. Resetting.'); // Your debug log
          localStorage.removeItem('loggedInUser');
        }
      }
    } catch (e) {
      console.error('AppWrapper useEffect: Error parsing loggedInUser from localStorage. Resetting.', e); // Your debug log
      localStorage.removeItem('loggedInUser');
    }

    if (initialLoggedInUser) {
      setUser(initialLoggedInUser.role);
      setLoggedInUserData(initialLoggedInUser.data);
      console.log("AppWrapper useEffect: Setting loggedInUserData state to:", initialLoggedInUser.data); // Your debug log
    } else {
      setUser(null);
      setLoggedInUserData(null);
      console.log("AppWrapper useEffect: loggedInUser not found or invalid, states set to null."); // Your debug log
    }

  }, []); // Empty dependency array means this runs once on component mount

  const handleLogin = (email, password) => {
    console.log("handleLogin: Attempting login for email:", email); // Your debug log
    if (email === 'admin@example.com' && password === '12345') {
      const adminData = { name: 'Admin', email };
      setUser('admin');
      setLoggedInUserData(adminData);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: adminData }));
      console.log("handleLogin: Admin logged in. Setting state and localStorage:", adminData); // Your debug log
      navigate('/admin');
    } else {
      const employee = userData.find(
        (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password
      );
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
        console.log("handleLogin: Employee logged in. Setting state and localStorage:", employee); // Your debug log
        navigate('/employee');
      } else {
        console.warn('Invalid Credentials: User not found or incorrect password.'); // Your debug log
      }
    }
  };

  const handleLogout = () => {
    console.log("handleLogout: Logging out user."); // Your debug log
    setUser(null);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  // Debug log for AppWrapper component rendering
  console.log("AppWrapper Render Cycle: Current loggedInUserData state passed to children:", loggedInUserData); // Your debug log

  return (
    <Routes>
      {/* REMOVED THE TEMPORARY H1 TAG HERE */}
      {/* <h1 style={{color: 'red', textAlign: 'center'}}>TEST VERSION A-1</h1> */}

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
