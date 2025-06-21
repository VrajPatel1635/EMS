import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDash from './components/Dashboard/EmployeeDash';
import AdminDash from './components/Dashboard/AdminDash';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '12345') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
    } else if (userData) {
      const employee = userData.find((e) => email === e.email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        );
      } else {
        alert('Invalid Credentials');
      }
    }
  };

  return (
    <>
      {/* Apply grid background only for employee dashboard */}
      <div
        className={`min-h-screen ${
          user === 'employee' ? 'bg-[url(/grid.svg)] bg-cover' : 'bg-[#1C1C1C]'
        }`}
      >
        {!user ? (
          <Login handleLogin={handleLogin} />
        ) : user === 'admin' ? (
          <AdminDash changeUser={setUser} />
        ) : (
          <EmployeeDash
            changeUser={setUser}
            data={loggedInUserData}
            setLoggedInUserData={setLoggedInUserData}
          />
        )}
      </div>
    </>
  );
};

export default App;
