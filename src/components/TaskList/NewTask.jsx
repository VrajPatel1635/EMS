import React from 'react';

const NewTask = ({ data, onAcceptTask }) => {
    if (!data) {
        console.warn("NewTask component received null or undefined data prop.");
        return <div className="text-white p-2">No task data to display.</div>;
    }

    return (
        // REMOVED: bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/20
        // Adjusted padding for internal content directly within the fixed-width wrapper
        <div className="flex-shrink-0 h-full w-[320px] p-4 text-white"> {/* Adjusted padding to p-4 */}
            {/* Inner green box is retained for 'New Task' styling as per image */}
            <div className='w-full h-full p-5 bg-emerald-500 rounded-xl transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-105 '>
                <div className='flex justify-between items-center'>
                    <h3 className='bg-red-500 text-sm px-3 py-1 rounded'>{data.category || 'No Category'}</h3>
                    <h4 className='text-sm'>{data.date || 'No Date'}</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>{data.title || 'No Title'}</h2>
                <p className='text-sm mt-2'>{data.description || 'No Description'}</p>
                <div className='mt-4'>
                    <button
                        className='cursor-pointer mt-12 ml-15 h-12 w-[50%] bg-sky-500 rounded-lg'
                        onClick={() => onAcceptTask(data)}
                    >
                        Accept Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewTask;
