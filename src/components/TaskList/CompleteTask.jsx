// src/TaskList/CompleteTask.jsx

import React from 'react';

const CompleteTask = ({ data }) => {
    if (!data) {
        console.warn("CompleteTask component received null or undefined data prop.");
        return <div className="text-white p-2">No task data to display.</div>;
    }

    return (
        // REMOVED: bg-color, rounded, shadow, border
        <div className="flex-shrink-0 h-full w-[320px] p-4 text-white"> {/* Adjusted padding to p-4 */}
            {/* The main content area of the task card */}
            <div className='w-full h-full p-5 bg-purple-500 rounded-xl transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:scale-105 opacity-80'> {/* Example inner box color */}
                <div className='flex justify-between items-center mb-2'>
                    <h3 className='bg-green-600 text-sm px-3 py-1 rounded'>Completed</h3> {/* Explicitly show 'Completed' status */}
                    <h4 className='text-sm text-gray-200'>{data.date || 'No Date'}</h4>
                </div>
                <h2 className='text-2xl font-semibold mb-2 line-through'>{data.title || 'No Title'}</h2> {/* Strikethrough for completed */}
                <p className='text-sm text-gray-100'>{data.description || 'No Description'}</p>
                
                <div className='mt-8 flex justify-center'>
                    <span className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold">
                        TASK COMPLETED!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CompleteTask;
