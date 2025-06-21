import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import TaskListNum from '../other/TaskListNum';
import TaskList from '../TaskList/TaskList';

const EmployeeDash = (props) => {
  const [taskData, setTaskData] = useState(props.data);

  useEffect(() => {
    setTaskData(props.data);
  }, [props.data]);

  const updateLocalStorageAndState = (updatedUser) => {
    const allUsers = JSON.parse(localStorage.getItem("userData")) || [];
    const updatedUsers = allUsers.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );

    localStorage.setItem("userData", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: updatedUser }));

    setTaskData(updatedUser);
  };

  const handleAcceptTask = (taskToAccept) => {
    const updatedTasks = taskData.tasks.map(task =>
      task.title === taskToAccept.title
        ? { ...task, NewTask: false, active: true }
        : task
    );

    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  const handleCompleteTask = (taskToComplete) => {
    const updatedTasks = taskData.tasks.map(task =>
      task.title === taskToComplete.title
        ? { ...task, active: false, completed: true }
        : task
    );

    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  const handleFailTask = (taskToFail) => {
    const updatedTasks = taskData.tasks.map(task =>
      task.title === taskToFail.title
        ? { ...task, active: false, failed: true }
        : task
    );

    const updatedUser = { ...taskData, tasks: updatedTasks };
    updateLocalStorageAndState(updatedUser);
  };

  return (
    <div className="relative min-h-screen h-screen p-10 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-80 h-80 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob top-0 left-0" />
        <div className="absolute w-80 h-80 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 top-20 left-1/2" />
        <div className="absolute w-80 h-80 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 top-1/2 left-1/3" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <Header userName={taskData.firstname} changeUser={props.changeUser} />
        <TaskListNum data={taskData} />
        <TaskList
          data={taskData}
          handleAcceptTask={handleAcceptTask}
          onCompleteTask={handleCompleteTask}
          onFailTask={handleFailTask}
        />
      </div>
    </div>
  );
};

export default EmployeeDash;
