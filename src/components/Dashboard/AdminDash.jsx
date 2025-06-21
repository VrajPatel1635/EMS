import React from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';

const AdminDash = (props) => {
  return (
    <div className="relative min-h-screen w-full p-7 text-white overflow-hidden animated-bg">
      <Header userName="Admin" changeUser={props.changeUser} />
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDash;
