// src/TaskList/AcceptTask.jsx

import React from 'react';

// FIX: Ensure onComplete prop is correctly destructured and used
const AcceptTask = ({ data, onComplete, onFail }) => {
    if (!data) {
        console.warn("AcceptTask component received null or undefined data prop.");
        return <div className="text-white p-2">No task data to display.</div>;
    }

    return (
        <div className="flex-shrink-0 h-full w-[320px] p-4 text-white">
            <div className='w-full h-full p-5 bg-blue-500 rounded-xl transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105'>
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='bg-indigo-600 text-sm px-3 py-1 rounded'>{data.category || 'No Category'}</h3>
                    <h4 className='text-sm text-gray-200'>{data.date || 'No Date'}</h4>
                </div>
                <h2 className='text-2xl font-semibold mb-2'>{data.title || 'No Title'}</h2>
                <p className='text-sm text-gray-100'>{data.description || 'No Description'}</p>
                
                <div className='mt-8 flex justify-center gap-2'>
                    <button
                        // FIX: Use the correctly passed prop 'onComplete' here
                        onClick={() => onComplete(data)}
                        className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200'
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => onFail(data)}
                        className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200'
                    >
                        Fail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcceptTask;
