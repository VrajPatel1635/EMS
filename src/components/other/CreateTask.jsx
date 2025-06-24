// src/components/other/CreateTask.jsx

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider'; // Assuming AuthContext path is correct

const CreateTask = () => {
  // Get all employee data and the update function from AuthContext
  const [allEmployeesData, updateAllEmployeesData] = useContext(AuthContext);

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignedToId, setAssignedToId] = useState(''); // New state for selected employee ID

  // Feedback messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Clear messages on input change
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

    // Basic validation for all fields, including the new assignedToId
    if (!taskTitle || !taskDescription || !taskCategory || !taskDate || !assignedToId) {
      setErrorMessage("Please fill in all task fields and select an employee.");
      return;
    }

    if (!allEmployeesData || allEmployeesData.length === 0) {
      setErrorMessage("No employee data available to assign tasks to.");
      console.warn("CreateTask: No employee data available.");
      return;
    }

    // Find the selected employee based on assignedToId
    const targetEmployee = allEmployeesData.find(emp => String(emp.id) === String(assignedToId));

    if (!targetEmployee) {
      setErrorMessage("Selected employee not found.");
      console.error("CreateTask: Selected employee ID not found:", assignedToId);
      return;
    }

    // Create a new array of all employees with the target employee's tasks updated immutably
    const updatedAllEmployees = allEmployeesData.map((employee) => {
      if (employee.id === targetEmployee.id) {
        const newTask = {
          title: taskTitle,
          description: taskDescription,
          category: taskCategory,
          date: taskDate,
          newTask: true, // Newly created tasks are typically 'newTask'
          active: false,
          completed: false,
          failed: false,
        };
        return {
          ...employee,
          tasks: [...(employee.tasks || []), newTask], // Append new task to existing tasks
        };
      }
      return employee; // Return other employees unchanged
    });

    // Use the updateAllEmployeesData function from AuthContext to update the global state and localStorage.
    updateAllEmployeesData(updatedAllEmployees);
    setSuccessMessage(`Task "${taskTitle}" assigned to ${targetEmployee.firstname} successfully!`);
    console.log("CreateTask: New task created and data updated for employee:", targetEmployee.firstname, {
      title: taskTitle,
      category: taskCategory,
    });

    // Clear form fields
    setTaskTitle('');
    setTaskDescription('');
    setTaskCategory('');
    setTaskDate('');
    setAssignedToId(''); // Clear selected employee

    // Hide success message after a few seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    // Main container matching the dark, rounded aesthetic
    <div className="bg-[#121826] p-8 mt-6 rounded-2xl shadow-2xl border border-[#374151] text-white">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-400">Create New Task</h2>

      {/* Conditional Messages */}
      {successMessage && (
        <div className="bg-green-600 text-white p-3 rounded-lg mb-4 text-center text-sm animate-fade-in-down">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-600 text-white p-3 rounded-lg mb-4 text-center text-sm animate-fade-in-down">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two-column grid layout for form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Task Title Input */}
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-semibold text-gray-300 mb-1">Task Title</label>
              <input
                type="text"
                id="taskTitle"
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#4b5563] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="e.g., Create Landing Page"
                value={taskTitle}
                onChange={handleInputChange(setTaskTitle)}
                required
              />
            </div>

            {/* Due Date Input */}
            <div>
              <label htmlFor="taskDate" className="block text-sm font-semibold text-gray-300 mb-1">Due Date</label>
              <input
                type="date" // HTML5 date input
                id="taskDate"
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#4b5563] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={taskDate}
                onChange={handleInputChange(setTaskDate)}
                required
              />
            </div>

            {/* Assign To Dropdown */}
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-semibold text-gray-300 mb-1">Assign To</label>
              <select
                id="assignedTo"
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#4b5563] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                value={assignedToId}
                onChange={handleInputChange(setAssignedToId)}
                required
              >
                <option value="">Select Employee</option>
                {allEmployeesData.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstname} ({employee.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Input */}
            <div>
              <label htmlFor="taskCategory" className="block text-sm font-semibold text-gray-300 mb-1">Category</label>
              <input
                type="text"
                id="taskCategory"
                className="w-full px-4 py-3 bg-[#1f2937] border border-[#4b5563] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="e.g., Design / Development"
                value={taskCategory}
                onChange={handleInputChange(setTaskCategory)}
                required
              />
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="flex flex-col">
            <label htmlFor="taskDescription" className="block text-sm font-semibold text-gray-300 mb-1">Description</label>
            <textarea
              id="taskDescription"
              rows="10" // Adjust rows to make it taller, flex-grow will fill space
              className="w-full flex-grow px-4 py-3 bg-[#1f2937] border border-[#4b5563] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition duration-200"
              placeholder="Write task details here..."
              value={taskDescription}
              onChange={handleInputChange(setTaskDescription)}
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button - Spans full width */}
        <button
          type="submit"
          className="w-full py-4 px-6 mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-[#121826] transform transition-all duration-300 ease-in-out hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2"
        >
          {/* Icon using inline SVG (Lucide-react is not available in canvas, Font-Awesome not needed for this) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
          <span>Create Task</span>
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
