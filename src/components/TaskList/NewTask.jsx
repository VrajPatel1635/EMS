import React from 'react'

const NewTask = ({ data, setData }) => { // Added setData prop as it was present in TaskList

    // Add a check to ensure 'data' exists before attempting to access its properties
    // If data is null or undefined, render a fallback or an empty div
    if (!data) {
        console.warn("NewTask component received null or undefined data prop.");
        return <div className="text-white">No task data to display.</div>;
    }

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/20">
            {/* Using Tailwind's flex-shrink-0 is good for preventing shrinking in flex containers */}
            {/* Added defensive checks using optional chaining (?.) for properties */}
            <div className='ml-5 flex-shrink-0 h-full min-h-65 w-[300px] p-5 bg-emerald-400 rounded-xl transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-105 '>
                <div className='flex justify-between items-center'>
                    {/* Add fallback text if data.category is undefined */}
                    <h3 className='bg-red-500 text-sm px-3 py-1 rounded'>{data.category || 'No Category'}</h3>
                    {/* Add fallback text if data.date is undefined */}
                    <h4 className='text-sm'>{data.date || 'No Date'}</h4>
                </div>
                {/* Add fallback text if data.title is undefined */}
                <h2 className='mt-5 text-2xl font-semibold'>{data.title || 'No Title'}</h2>
                {/* Add fallback text if data.description is undefined */}
                <p className='text-sm mt-2'>{data.description || 'No Description'}</p>
                <div className='mt-4'>
                    {/* The `Accept Task` button likely needs an onClick handler that calls a prop
                        from TaskList and then EmployeeDash to handle accepting the task.
                        Currently, it's just a button.
                        Assuming `handleAcceptTask` from EmployeeDash is meant to be passed down.
                        For now, I'll add a placeholder console log.
                    */}
                    <button
                        className='cursor-pointer mt-12 ml-15 h-12 w-[50%] bg-sky-500 rounded-lg'
                        onClick={() => console.log('Accept Task clicked for:', data.title)} // Placeholder
                    >
                        Accept Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewTask;
