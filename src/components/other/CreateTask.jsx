// src/components/other/CreateTask.jsx

import React, { useContext, useState } from 'react'; // Removed useEffect as it's not strictly needed here
import { AuthContext } from '../../context/AuthProvider'; // Assuming AuthContext path is correct

const CreateTask = () => {
  // Use useContext to get the allUsersData array and the updateAllUsersData function
  // AuthContext provides [allEmployeesData, updateAllEmployeesData]
  const [allEmployeesData, updateAllEmployeesData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDate, setTaskDate] = useState(''); // State for due date

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation to ensure fields are not empty
    if (!taskTitle || !taskDescription || !taskCategory || !taskDate) {
      console.warn("CreateTask: All task fields must be filled.");
      // You could set a state here to display an error message to the user
      return;
    }

    // In a real application, you'd have UI to select which employee to assign the task to.
    // For now, let's add the task to the *first employee* in the allEmployeesData array
    // This assumes there's at least one employee in the list.
    if (allEmployeesData && allEmployeesData.length > 0) {
      // Create a deep copy of the allEmployeesData array to ensure immutability
      const updatedAllEmployees = allEmployeesData.map((employee) => {
        // Find the specific employee (e.g., the first one, or selected one)
        // For demonstration, let's assign to the first employee (id: 1, Aarav)
        if (employee.id === 1) { // Assuming Aarav is ID 1, adjust as needed
          const newTask = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            date: taskDate, // Use the date from state
            newTask: true, // Newly created tasks are typically 'newTask'
            active: false,
            completed: false,
            failed: false,
          };
          // Return a new employee object with updated tasks array
          return {
            ...employee,
            tasks: [...(employee.tasks || []), newTask], // Append new task to existing tasks
          };
        }
        return employee; // Return other employees unchanged
      });

      // Use the updateAllEmployeesData function from AuthContext to update the global state
      // and consequently localStorage.
      updateAllEmployeesData(updatedAllEmployees);
      console.log("CreateTask: New task created and data updated for employee ID 1 (Aarav).", {
        title: taskTitle,
        category: taskCategory,
      });

      // Clear form fields after successful submission
      setTaskTitle('');
      setTaskDescription('');
      setTaskCategory('');
      setTaskDate('');

    } else {
      console.warn("CreateTask: No employee data available to assign tasks to. Please ensure employees are loaded.");
      // Handle scenario where no employees exist (e.g., display a message)
    }
  };

  return (
    // Main container for the Create Task form
    <div className="p-5 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Task Title</label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required // Make field mandatory
          />
        </div>

        {/* Task Description Textarea */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
          <textarea
            id="description"
            rows="3" // Specifies visible height of textarea
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required // Make field mandatory
          ></textarea>
        </div>

        {/* Task Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
          <input
            type="text"
            id="category"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
            required // Make field mandatory
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300">Due Date</label>
          <input
            type="date" // HTML5 date input type
            id="date"
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required // Make field mandatory
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit" // Set type to submit for form handling
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
