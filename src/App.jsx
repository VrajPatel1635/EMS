import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import AdminDash from './components/Dashboard/AdminDash';
import EmployeeDash from './components/Dashboard/EmployeeDash';
import LocalStorage from './utils/LocalStorage';
import { initialEmployeesData, initialAdminData } from './data/InitialData';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AppWrapper useEffect: Initializing data...");

    const storedUsers = LocalStorage.getItem('userData');
    if (Array.isArray(storedUsers) && storedUsers.every(u => typeof u === 'object' && 'email' in u && 'tasks' in u)) {
      setUserData(storedUsers);
      console.log("AppWrapper useEffect: Loaded userData from localStorage:", storedUsers);
    } else {
      console.warn('AppWrapper useEffect: Invalid or no userData in localStorage. Setting default employees.');
      LocalStorage.setItem('userData', initialEmployeesData);
      setUserData(initialEmployeesData);
      console.log("AppWrapper useEffect: Set default initialEmployeesData:", initialEmployeesData);
    }

    const storedLoggedInUser = LocalStorage.getItem('loggedInUser');
    if (storedLoggedInUser !== null && typeof storedLoggedInUser === 'object' && 'role' in storedLoggedInUser && 'data' in storedLoggedInUser) {
      setUser(storedLoggedInUser.role);
      setLoggedInUserData(storedLoggedInUser.data);
      console.log("AppWrapper useEffect: Loaded loggedInUser from localStorage:", storedLoggedInUser);
    } else {
      console.warn('AppWrapper useEffect: No valid loggedInUser in localStorage. User not logged in. Clearing any invalid.');
      setUser(null);
      setLoggedInUserData(null);
      LocalStorage.removeItem('loggedInUser');
    }
  }, []);

  const handleLogin = (email, password) => {
    console.log("handleLogin: Attempting login for email:", email, " and password:", password);
    console.log("handleLogin: Current userData for search:", userData);

    if (email === initialAdminData.email && password === initialAdminData.password) {
      const adminData = { firstname: initialAdminData.firstname, email: initialAdminData.email };
      setUser('admin');
      setLoggedInUserData(adminData);
      LocalStorage.setItem('loggedInUser', { role: 'admin', data: adminData });
      console.log("handleLogin: Admin logged in.", adminData);
      navigate('/admin');
    } else {
      const employee = userData.find(
        (e) => {
          // ULTRA DEBUG LOG: Print the exact values for comparison
          console.log(`  Comparing: Typed Email="${email.toLowerCase()}" (Type: ${typeof email.toLowerCase()}) vs Employee Email="${e.email.toLowerCase()}" (Type: ${typeof e.email.toLowerCase()})`);
          console.log(`  Comparing: Typed Password="${password}" (Type: ${typeof password}) vs Employee Password="${e.password}" (Type: ${typeof e.password})`);


          const emailMatch = e.email.toLowerCase() === email.toLowerCase();
          const passwordMatch = e.password === password;
          console.log(`  Checking employee: ${e.email}. Email match: ${emailMatch}, Password match: ${passwordMatch}. Overall Match: ${emailMatch && passwordMatch}`);
          return emailMatch && passwordMatch;
        }
      );

      console.log("handleLogin: Result of employee search:", employee);

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
