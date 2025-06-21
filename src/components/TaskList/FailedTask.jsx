import React from 'react'

const FailedTask = ({ data }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/20">
            <div className='flex-shrink-0 h-full min-h-65 w-[300px] p-5 bg-amber-600 rounded-xl transition-shadow duration-300  hover:shadow-[0_0_20px_rgba(255,191,0,0.6)] hover:scale-105 '>
                <div className='flex justify-between items-center'>
                    <h3 className='bg-red-500 text-sm px-3 py-1 rounded'>{data.category}</h3>
                    <h4 className='text-sm'>{data.date}</h4>
                </div>
                <h2 className='mt-5 text-2xl font-semibold'>{data.title}</h2>
                <p className='text-sm mt-2'>
                    {data.description}
                </p>
                <div className='mt-4 flex'>
                    <button className='cursor-pointer mt-8 ml-15 h-12  w-[50%] bg-red-500 rounded-lg click'>Failed</button>
                </div>
            </div>
        </div>
    )
}

export default FailedTask
