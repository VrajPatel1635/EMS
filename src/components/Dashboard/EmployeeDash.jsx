import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import TaskListNum from '../other/TaskListNum';
import TaskList from '../TaskList/TaskList';
import LocalStorage from '../../utils/LocalStorage';

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
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        Loading dashboard...
      </div>
    );
  }

  const tasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];
  console.log("EmployeeDash: Derived 'tasks' array:", tasks);

  const updateLocalStorageAndState = (updatedUser) => {
    const allUsers = LocalStorage.getItem("userData") || [];
    const updatedUsers = allUsers.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );

    LocalStorage.setItem("userData", updatedUsers);
    LocalStorage.setItem("loggedInUser", { role: "employee", data: updatedUser });

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
      {/* NEW ANIMATED BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[400px] h-[400px] bg-purple-600 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-flow top-[-50px] left-[-100px] animation-delay-0" />
        <div className="absolute w-[500px] h-[500px] bg-pink-600 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-flow top-[100px] left-[calc(50%-250px)] animation-delay-2000" />
        <div className="absolute w-[350px] h-[350px] bg-blue-600 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-flow bottom-[-50px] right-[-100px] animation-delay-4000" />
        <div className="absolute w-[450px] h-[450px] bg-green-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-flow top-[calc(50%-225px)] right-[-150px] animation-delay-6000" />
        <div className="absolute w-[600px] h-[600px] bg-orange-600 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-flow bottom-[0px] left-[calc(20%)] animation-delay-8000" />
      </div>

      {/* NEW CSS ANIMATIONS */}
      <style>{`
        @keyframes flow {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translate(20px, -30px) scale(1.05) rotate(15deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(-10px, 40px) scale(0.95) rotate(-10deg);
            opacity: 0.1;
          }
          75% {
            transform: translate(30px, -20px) scale(1.1) rotate(5deg);
            opacity: 0.25;
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.15;
          }
        }
        .animate-flow {
          animation: flow 10s ease-in-out infinite alternate; /* Longer duration, alternate direction */
        }
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-8000 { animation-delay: 8s; }
      `}</style>

      {/* Main content remains on top */}
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
