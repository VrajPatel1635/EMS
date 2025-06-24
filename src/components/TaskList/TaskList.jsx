import React from 'react';
import { motion } from 'framer-motion'; // For potential subtle animations
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask.jsx';

// Define Framer Motion variants for subtle entrance animation if needed for the whole list
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const taskItemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const TaskList = ({ data, handleAcceptTask, onCompleteTask, onFailTask }) => {

  if (!Array.isArray(data)) {
    console.error("TaskList received non-array data:", data);
    return (
      <div className="flex justify-center items-center h-48 bg-gray-800 rounded-xl shadow-inner text-white text-lg">
        <p>Invalid task data format. Please check the console for details.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-48 bg-gray-800 rounded-xl shadow-inner text-gray-400 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <p>No tasks to display at the moment. Time to create some!</p>
      </div>
    );
  }

  return (
    <motion.div
      id="tasklist"
      className="flex items-start overflow-x-auto gap-6 flex-nowrap w-full p-4 md:p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700 mt-8 mb-10 min-h-[300px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
      variants={listContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.map((elem, idx) => {
        if (!elem || typeof elem !== 'object') {
            console.warn("TaskList encountered a non-object element in tasks array:", elem);
            return null;
        }

        // Apply consistent styling and spacing for each task card wrapper
        const commonWrapperClass = "flex-shrink-0 w-[320px] h-auto transform transition-transform duration-300 hover:scale-[1.01] "; // Removed ml/mr for better gap control

        // Check for task status and render appropriate component
        if (elem?.active) {
          return (
            <motion.div key={elem.id || idx} variants={taskItemVariants} className={commonWrapperClass}>
              <AcceptTask data={elem} onComplete={onCompleteTask} onFail={onFailTask} />
            </motion.div>
          );
        }

        if (elem?.newTask) {
          return (
            <motion.div key={elem.id || idx} variants={taskItemVariants} className={commonWrapperClass}>
              <NewTask data={elem} onAcceptTask={handleAcceptTask} />
            </motion.div>
          );
        }

        if (elem?.completed) {
          return (
            <motion.div key={elem.id || idx} variants={taskItemVariants} className={commonWrapperClass}>
              <CompleteTask data={elem} />
            </motion.div>
          );
        }

        if (elem?.failed) {
          return (
            <motion.div key={elem.id || idx} variants={taskItemVariants} className={commonWrapperClass}>
              <FailedTask data={elem} />
            </motion.div>
          );
        }

        return null;
      })}
       {/* Custom Scrollbar Styles (using CSS within style jsx) */}
       <style jsx>{`
        /* Target Webkit (Chrome, Safari) scrollbars */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px; /* For horizontal scrollbar */
        }

        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: #4B5563; /* Tailwind gray-600 */
          border-radius: 10px;
        }

        .scrollbar-track-gray-900::-webkit-scrollbar-track {
          background: #111827; /* Tailwind gray-900 */
        }

        /* For Firefox (not direct styling, but better than nothing) */
        .scrollbar-thin {
          scrollbar-width: thin; /* "auto" or "thin" */
          scrollbar-color: #4B5563 #111827; /* thumb and track color */
        }
      `}</style>
    </motion.div>
  );
};

export default TaskList;
