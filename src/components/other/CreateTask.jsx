import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { updateEmployeeStorage } from '../../utils/LocalStorage';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const employees = userData?.filter((user) => user.role === 'employee');
    setEmployeeList(employees || []);
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description,
      date,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updatedData = userData.map((user) => {
      if (user.firstname === assignTo) {
        return {
          ...user,
          tasks: [...(user.tasks || []), newTask],
        };
      }
      return user;
    });

    setUserData(updatedData);
    updateEmployeeStorage(updatedData);

    setTaskTitle('');
    setDescription('');
    setDate('');
    setCategory('');
    setAssignTo('');
  };

  return (
    <div className="w-full max-w-none p-6 md:p-10 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl shadow-2xl text-white  mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Create New Task</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
              required
              placeholder="e.g. Create Landing Page"
              className="w-full py-2 px-4 rounded-xl border border-gray-700 bg-[#262626] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
              className="w-full py-2 px-4 rounded-xl border border-gray-700 bg-[#262626] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assign To</label>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              required
              className="w-full py-2 px-4 rounded-xl border border-gray-700 bg-[#262626] focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option className="text-gray-400" value="">Select Employee</option>
              {userData.map((user, idx) => (
                <option className="text-gray-300" key={idx} value={user.firstname}>
                  {user.firstname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="e.g. Design / Development"
              className="w-full py-2 px-4 rounded-xl border border-gray-700 bg-[#262626] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write task details here..."
              rows="9"
              className="w-full p-4 rounded-xl border border-gray-700 bg-[#262626] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 
            text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-[0_6px_28px_rgba(0,132,255,0.4)] 
            transition-all duration-300 ease-in-out"
          >
            🚀 Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
