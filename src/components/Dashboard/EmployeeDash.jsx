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

  // --- Raindrop Ripple Animation Logic ---
  const rainbowColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
    '#FF0000', '#FF7F00', '#FFFF00',
  ];
  const numberOfRaindrops = 80;

  const raindropElements = Array.from({ length: numberOfRaindrops }).map((_, i) => {
    const colorIndex = i % rainbowColors.length;
    const color = rainbowColors[colorIndex];
    const delay = Math.random() * 5;
    const duration = Math.random() * 3 + 2;

    const topPos = Math.random() * 100;
    const leftPos = Math.random() * 100;

    return (
      <div
        key={i}
        className="absolute raindrop-ripple-layer"
        style={{
          top: `${topPos}vh`,
          left: `${leftPos}vw`,
          backgroundColor: color,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          '--ripple-color': color,
        }}
      ></div>
    );
  });
  // --- End Raindrop Ripple Animation Logic ---

  return (
    // Main container - now acts as the scrollable content wrapper
    // The background animation will be outside this, fixed to viewport
    <div className="relative min-h-screen p-10 text-white overflow-y-auto bg-transparent z-10"> {/* bg-transparent as background is now fixed */}
      {/* FIXED BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 bg-gray-950 overflow-hidden pointer-events-none">
        {raindropElements}
      </div>

      {/* CSS for the Subtle Raindrop Ripple Animation (Moved here for fixed bg) */}
      <style>{`
        .raindrop-ripple-layer {
          width: 0;
          height: 0;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          background-image: radial-gradient(circle at center, var(--ripple-color) 0%, transparent 60%);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          opacity: 0;
          animation-name: raindrop-ripple-anim;
          animation-iteration-count: infinite;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          mix-blend-mode: screen;
          filter: blur(2px);
        }

        @keyframes raindrop-ripple-anim {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0;
          }
          10% {
            width: 8px;
            height: 8px;
            opacity: 0.8;
            filter: blur(1px);
          }
          20% {
            width: 20px;
            height: 20px;
            opacity: 0.6;
            filter: blur(2px);
          }
          70% {
            width: 100px;
            height: 100px;
            opacity: 0;
            filter: blur(15px);
          }
          100% {
            width: 0px;
            height: 0px;
            opacity: 0;
            filter: blur(0px);
          }
        }
      `}</style>

      {/* Main content remains on top - it will scroll */}
      <div className="relative z-20"> {/* Higher z-index for content */}
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
