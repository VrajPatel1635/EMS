// src/components/other/CreateTask.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Assuming AuthContext is used here
// Corrected import: Import the default 'LocalStorage' object, not a named export
import LocalStorage from '../../utils/LocalStorage'; // Adjust path if needed

const CreateTask = () => {
  // If CreateTask needs to update employee data, it should get the updateUserData function
  // from AuthContext, as AuthProvider is now managing userData.
  // Assuming AuthProvider's context value is [userData, updateUserData]
  const [userData, updateUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDate, setTaskDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real application, you'd likely select an employee to assign the task to.
    // For now, let's just add it to the first employee's tasks in userData for demonstration.
    if (userData && userData.length > 0) {
      const firstEmployee = { ...userData[0] }; // Create a copy to modify

      const newTask = {
        title: taskTitle,
        description: taskDescription,
        category: taskCategory,
        date: taskDate,
        newTask: true,  // New tasks usually start as new
        active: false,
        completed: false,
        failed: false,
      };

      firstEmployee.tasks = [...(firstEmployee.tasks || []), newTask]; // Add new task

      // Update the whole userData array with the modified employee
      const updatedAllUsers = userData.map(user =>
        user.id === firstEmployee.id ? firstEmployee : user
      );

      // Now, use the updateUserData function from AuthContext to update state and localStorage
      updateUserData(updatedAllUsers);
      console.log("CreateTask: New task added to employee and data updated:", newTask);

      // Clear form fields
      setTaskTitle('');
      setTaskDescription('');
      setTaskCategory('');
      setTaskDate('');

    } else {
      console.warn("CreateTask: No employee data available to add a task to.");
    }
  };

  return (
    <div className="p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Task Title</label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            id="description"
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
          <input
            type="text"
            id="category"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300">Due Date</label>
          <input
            type="date"
            id="date"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
