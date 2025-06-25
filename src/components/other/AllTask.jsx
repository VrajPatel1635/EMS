import React from 'react';

// AllTask now receives 'allEmployees' as a prop
const AllTask = ({ allEmployees }) => {

  // Ensure allEmployees is an array before mapping
  const employeesToDisplay = Array.isArray(allEmployees) ? allEmployees : [];

  return (
    <div className=" p-8 mt-8 rounded-2xl shadow-2xl text-white">
      {/* Title for the section */}
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-400">Employee Task Overview</h2>

      {/* Header Row */}
      <div className="grid grid-cols-5 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 text-white font-bold text-xl rounded-lg px-6 py-4 mb-4 shadow-lg border border-indigo-600">
        <div className="text-center">Employee Name</div>
        <div className="text-center">New Tasks</div>
        <div className="text-center">Active Tasks</div>
        <div className="text-center">Completed</div>
        <div className="text-center">Failed</div>
      </div>

      {/* Data Rows */}
      <div className="space-y-4">
        {employeesToDisplay.length > 0 ? (
          employeesToDisplay.map((elem, idx) => (
            <div
              key={elem.id || idx} // Use elem.id for a more stable key if available
              className="grid grid-cols-5 bg-[#1f2937] text-white rounded-lg px-6 py-4 border border-gray-700 hover:shadow-[0_0_15px_#6366f1] transition-all duration-300 ease-in-out transform hover:scale-[1.005]"
            >
              <div className="text-center text-cyan-400 font-semibold text-lg">{elem.firstname}</div>
              {/* Add defensive checks for taskCount properties as well */}
              <div className="text-center text-pink-400 font-bold text-xl">{elem.taskCount?.newTask || 0}</div>
              <div className="text-center text-yellow-400 font-bold text-xl">{elem.taskCount?.active || 0}</div>
              <div className="text-center text-green-400 font-bold text-xl">{elem.taskCount?.completed || 0}</div>
              <div className="text-center text-rose-400 font-bold text-xl">{elem.taskCount?.failed || 0}</div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 bg-[#1f2937] rounded-lg border border-gray-700 text-gray-400 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-5m-5 0h10a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v11a2 2 0 002 2z" />
            </svg>
            <p>No employee data to display. Please ensure employees are loaded.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
