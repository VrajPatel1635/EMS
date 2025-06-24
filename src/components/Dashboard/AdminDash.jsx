import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask'; // Ensure this path is correct

const AdminDash = (props) => { // Props now include `allEmployees`
  return (
    <div className="relative min-h-screen w-full p-7 text-white overflow-hidden animated-bg">
      <Header userName="Admin" changeUser={props.changeUser} />
      <CreateTask />
      {/* Pass the allEmployees prop to AllTask */}
      <AllTask allEmployees={props.allEmployees} />
    </div>
  );
};

export default AdminDash;
