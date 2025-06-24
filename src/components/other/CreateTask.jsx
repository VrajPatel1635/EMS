// src/components/other/CreateTask.jsx

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Assuming AuthContext path is correct

const CreateTask = () => {
  const [allEmployeesData, updateAllEmployeesData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Basic validation
    if (!taskTitle || !taskDescription || !taskCategory || !taskDate) {
      setErrorMessage("Please fill in all task fields.");
      return;
    }

    if (allEmployeesData && allEmployeesData.length > 0) {
      // Create a deep copy of the allEmployeesData array for immutability
      const updatedAllEmployees = allEmployeesData.map((employee) => {
        // For demonstration, let's assign to the first employee (ID 1, Aarav)
        // In a real app, you'd have a selector for the employee.
        if (employee.id === 1) { // Assuming Aarav is ID 1
          const newTask = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            date: taskDate,
            newTask: true,
            active: false,
            completed: false,
            failed: false,
          };
          return {
            ...employee,
            tasks: [...(employee.tasks || []), newTask],
          };
        }
        return employee; // Return other employees unchanged
      });

      updateAllEmployeesData(updatedAllEmployees);
      setSuccessMessage(`Task "${taskTitle}" assigned successfully to Aarav!`);
      console.log("CreateTask: New task created and data updated for employee ID 1 (Aarav).", {
        title: taskTitle,
        category: taskCategory,
      });

      // Clear form fields
      setTaskTitle('');
      setTaskDescription('');
      setTaskCategory('');
      setTaskDate('');

      // Hide success message after a few seconds
      setTimeout(() => setSuccessMessage(''), 3000);

    } else {
      setErrorMessage("No employee data available to assign tasks to. Please ensure employees are loaded.");
      console.warn("CreateTask: No employee data available to assign tasks to.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700 text-white transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-400">Create New Task</h2>

      {/* Conditional Messages */}
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center text-sm animate-fade-in-down">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center text-sm animate-fade-in-down">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-200 mb-1">Task Title</label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="e.g., Prepare Q3 Report"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>

        {/* Task Description Textarea */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-1">Description</label>
          <textarea
            id="description"
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y transition duration-200 ease-in-out"
            placeholder="Detailed description of the task..."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Task Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-200 mb-1">Category</label>
          <input
            type="text"
            id="category"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
            placeholder="e.g., Finance, Marketing, Development"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            required
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-200 mb-1">Due Date</label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          Add Task
        </button>
      </form>

      {/* Basic CSS for animation (place this in index.css or App.css if preferred) */}
      <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out forwards;
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CreateTask;
