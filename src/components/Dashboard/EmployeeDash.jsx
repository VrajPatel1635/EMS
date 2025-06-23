import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import TaskListNum from '../other/TaskListNum';
import TaskList from '../TaskList/TaskList';

const EmployeeDash = (props) => {
  // Initialize taskData with props.data or a default empty object
  // This ensures taskData is always an object, preventing 'Cannot read properties of undefined' on taskData itself.
  const [taskData, setTaskData] = useState(props.data || {});

  useEffect(() => {
    // Update taskData state when props.data changes
    // Ensure props.data is not null/undefined before setting
    setTaskData(props.data || {});
  }, [props.data]);

  // Initial check: if essential data for the dashboard is not yet available, show a loading message
  // This is a good guard, but the nested property access (like .tasks) needs more specific guards
  if (!taskData || Object.keys(taskData).length === 0) {
    return <div className="text-white p-10">Loading dashboard...</div>;
  }

  // Ensure tasks array is always present, even if empty
  // This prevents errors when trying to call .map() on undefined
  const tasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];

  const updateLocalStorageAndState = (updatedUser) => {
    const allUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const updatedUsers = allUsers.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );

    localStorage.setItem("userData", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: updatedUser }));

    setTaskData(updatedUser); // Update local state
  };

  const handleAcceptTask = (taskToAccept) => {
    // Ensure tasks array exists before mapping
    const currentTasks = Array.isArray(taskData.tasks) ? taskData.tasks : [];
    const updatedTasks = currentTasks.map(task =>
      // Add a check: ensure 'task' itself is not null/undefined before accessing its properties
      task && task.title === taskToAccept.title
        ? { ...task, newTask: false, active: true }
        : task
    );

    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  const handleCompleteTask = (taskToComplete) => {
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
        {/* Using optional chaining for userName to prevent errors if taskData or name is undefined */}
        <Header userName={taskData?.firstname || "Employee"} changeUser={props.changeUser} />
        {/* Pass the tasks array, not the whole taskData object, if TaskListNum only needs tasks */}
        <TaskListNum data={tasks} />
        <TaskList
          data={tasks} // Pass the defensively checked tasks array
          handleAcceptTask={handleAcceptTask}
          onCompleteTask={handleCompleteTask}
          onFailTask={handleFailTask}
        />
      </div>
    </div>
  );
};

export default EmployeeDash;
