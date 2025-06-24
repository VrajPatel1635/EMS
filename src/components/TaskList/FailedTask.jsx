// src/TaskList/FailedTask.jsx

import React from 'react';

const FailedTask = ({ data }) => {
    if (!data) {
        console.warn("FailedTask component received null or undefined data prop.");
        return <div className="text-white p-2">No task data to display.</div>;
    }

    return (
        // REMOVED: bg-color, rounded, shadow, border
        <div className="flex-shrink-0 h-full w-[320px] p-4 text-white"> {/* Adjusted padding to p-4 */}
            {/* The main content area of the task card */}
            <div className='w-full h-full p-5 bg-red-500 rounded-xl transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:scale-105 opacity-80'> {/* Example inner box color */}
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='bg-gray-800 text-sm px-3 py-1 rounded'>Failed</h3> {/* Explicitly show 'Failed' status */}
                    <h4 className='text-sm text-gray-200'>{data.date || 'No Date'}</h4>
                </div>
                <h2 className='text-2xl font-semibold mb-2 line-through'>{data.title || 'No Title'}</h2> {/* Strikethrough for failed */}
                <p className='text-sm text-gray-100'>{data.description || 'No Description'}</p>
                
                <div className='mt-8 flex justify-center'>
                    <span className="px-4 py-2 bg-red-700 text-white rounded-lg text-sm font-semibold">
                        TASK FAILED!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FailedTask;
