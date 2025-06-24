import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import TaskListNum from '../other/TaskListNum';
import TaskList from '../TaskList/TaskList';
import LocalStorage from '../../utils/LocalStorage'; // Import the new utility

const EmployeeDash = (props) => {
  console.log("EmployeeDash: Component rendering. props.data received:", props.data);

  const [taskData, setTaskData] = useState(props.data || {});

  useEffect(() => {
    console.log("EmployeeDash useEffect: props.data changed to:", props.data);
    setTaskData(props.data || {});
  }, [props.data]);

  console.log("EmployeeDash: Current taskData state:", taskData);

  if (!taskData || Object.keys(taskData).length === 0) {
    console.log("EmployeeDash: Displaying 'Loading dashboard...' because taskData is empty or null.");
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  // Ensure tasks array is always present, even if empty
  const tasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];
  console.log("EmployeeDash: Derived 'tasks' array:", tasks);


  const updateLocalStorageAndState = (updatedUser) => {
    // Get all users using utility, default to empty array if none
    const allUsers = LocalStorage.getItem("userData") || [];
    const updatedUsers = allUsers.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );

    LocalStorage.setItem("userData", updatedUsers); // Set all users via utility
    LocalStorage.setItem("loggedInUser", { role: "employee", data: updatedUser }); // Set logged in user via utility

    setTaskData(updatedUser);
    console.log("EmployeeDash: Local storage and state updated with new user data:", updatedUser);
  };

  const handleAcceptTask = (taskToAccept) => {
    console.log("EmployeeDash: Accepting task:", taskToAccept.title);
    const currentTasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];
    const updatedTasks = currentTasks.map(task =>
      task && task.title === taskToAccept.title
        ? { ...task, newTask: false, active: true }
        : task
    );
    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  const handleCompleteTask = (taskToComplete) => {
    console.log("EmployeeDash: Completing task:", taskToComplete.title);
    const currentTasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];
    const updatedTasks = currentTasks.map(task =>
      task && task.title === taskToComplete.title
        ? { ...task, active: false, completed: true }
        : task
    );
    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  const handleFailTask = (taskToFail) => {
    console.log("EmployeeDash: Failing task:", taskToFail.title);
    const currentTasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];
    const updatedTasks = currentTasks.map(task =>
      task && task.title === taskToFail.title
        ? { ...task, active: false, failed: true }
        : task
    );
    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  return (
    <div className="relative min-h-screen h-screen p-10 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-80 h-80 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob top-0 left-0" />
        <div className="absolute w-80 h-80 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 top-20 left-1/2" />
        <div className="absolute w-80 h-80 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 top-1/2 left-1/3" />
      </div>

      <div className="relative z-10">
        <Header userName={taskData?.firstname || "Employee"} changeUser={props.changeUser} />
        <TaskListNum data={tasks} />
        <TaskList
          data={tasks}
          handleAcceptTask={handleAcceptTask}
          onCompleteTask={handleCompleteTask}
          onFailTask={handleFailTask}
        />
      </div>
    </div>
  );
};

export default EmployeeDash;
