import React from 'react'; // No need for useContext here anymore for userData if passed as prop

// AllTask now receives 'allEmployees' as a prop
const AllTask = ({ allEmployees }) => {

  // Ensure allEmployees is an array before mapping
  const employeesToDisplay = Array.isArray(allEmployees) ? allEmployees : [];

  return (
    <div className="bg-[#121826] p-6 mt-6 rounded-xl shadow-2xl">
      {/* Header */}
      <div className="grid grid-cols-5 bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-800 text-white font-semibold text-lg rounded-md px-4 py-3 mb-4 shadow-md">
        <div className="text-center">Employee Name</div>
        <div className="text-center">New Task</div>
        <div className="text-center">Active Task</div>
        <div className="text-center">Completed</div>
        <div className="text-center">Failed</div>
      </div>

      {/* Data Rows */}
      <div className="space-y-3">
        {/* Map over employeesToDisplay instead of userData from context */}
        {employeesToDisplay.map((elem, idx) => (
          <div
            key={elem.id || idx} // Use elem.id for a more stable key if available
            className="grid grid-cols-5 bg-[#1f2937] text-white rounded-lg px-4 py-3 border border-gray-700 hover:shadow-[0_0_10px_#6366f1] transition-all duration-200 ease-in-out"
          >
            <div className="text-center text-cyan-400 font-medium">{elem.firstname}</div>
            {/* Add defensive checks for taskCount properties as well */}
            <div className="text-center text-pink-400">{elem.taskCount?.newTask || 0}</div>
            <div className="text-center text-yellow-400">{elem.taskCount?.active || 0}</div>
            <div className="text-center text-green-400">{elem.taskCount?.completed || 0}</div>
            <div className="text-center text-rose-400">{elem.taskCount?.failed || 0}</div>
          </div>
        ))}
        {employeesToDisplay.length === 0 && (
            <div className="text-center text-gray-400 py-5">No employee data to display.</div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
