import React from 'react';
import { motion } from 'framer-motion';
// Assuming these lucide-react icons are correctly installed and available in your project
import { ClipboardList, CheckCheck, Clock, Ban } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

// Define Framer Motion variants for subtle entrance animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
      delayChildren: 0.2,   // Delay before children start animating
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// TaskCard component - represents a single statistic card
// This component is now passed additional styling props for more customization
const TaskCard = ({ count, label, icon: Icon, bgGradient, tooltipText }) => (
  <Tooltip.Provider delayDuration={200}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.div
          variants={itemVariants} // Apply item variants for staggered animation
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(88, 140, 255, 0.5)" }} // Enhanced hover effect
          className={`flex-1 min-w-[220px] max-w-full sm:max-w-[calc(50%-12px)] md:max-w-[calc(33%-16px)] lg:max-w-[calc(25%-18px)] p-6 rounded-2xl shadow-xl text-white cursor-pointer transform transition-all duration-300 ease-in-out border border-transparent hover:border-blue-500 ${bgGradient}`}
        >
          <div className="flex items-center gap-4">
            {/* Icon Container with subtle glassmorphism */}
            <div className="p-3 bg-white/15 backdrop-blur-sm rounded-full shadow-inner border border-white/20">
              <Icon size={28} className="text-white" /> {/* Ensure icon color is white */}
            </div>
            {/* Text Content */}
            <div>
              <h2 className="text-4xl font-extrabold drop-shadow-md">{count}</h2> {/* Larger, bolder count */}
              <h3 className="text-lg font-medium text-gray-200">{label}</h3>
            </div>
          </div>
        </motion.div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-800 text-white px-3 py-2 text-sm rounded-lg shadow-xl max-w-xs z-50 animate-fade-in" // Enhanced tooltip styling
          side="top"
          sideOffset={10} // Increased offset
        >
          {tooltipText}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

// TaskListNum now receives the 'tasks' array directly as its 'data' prop
const TaskListNum = ({ data }) => {
  const tasks = Array.isArray(data) ? data : [];

  // Calculate task counts based on the 'tasks' array
  // Adding defensive checks for task properties
  const taskCount = {
    newTask: tasks.filter(task => task && task.newTask === true).length, // Explicit check for true
    completed: tasks.filter(task => task && task.completed === true).length,
    active: tasks.filter(task => task && task.active === true).length,
    failed: tasks.filter(task => task && task.failed === true).length,
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-6 mt-10 md:mt-12 lg:mt-16 p-2" // Increased top margin, added padding
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <TaskCard
        count={taskCount.newTask}
        label="New Tasks" // Pluralized label for clarity
        icon={ClipboardList}
        tooltipText="Tasks that have been recently assigned and are awaiting action by an employee."
        bgGradient="bg-gradient-to-br from-rose-700 to-red-600" // Deeper gradient
      />
      <TaskCard
        count={taskCount.active} // Changed order to Active then Completed
        label="Active Tasks"
        icon={Clock}
        tooltipText="Tasks that are currently in progress by employees."
        bgGradient="bg-gradient-to-br from-sky-700 to-blue-600" // Deeper gradient
      />
      <TaskCard
        count={taskCount.completed}
        label="Completed Tasks"
        icon={CheckCheck}
        tooltipText="Tasks that have been successfully finished and marked as complete."
        bgGradient="bg-gradient-to-br from-emerald-700 to-teal-600" // Deeper gradient
      />
      <TaskCard
        count={taskCount.failed}
        label="Failed Tasks"
        icon={Ban}
        tooltipText="Tasks that could not be completed and were marked as failed."
        bgGradient="bg-gradient-to-br from-orange-700 to-red-500" // Deeper gradient, redder tone
      />
      {/* Basic CSS for animation (if not already in global CSS) */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default TaskListNum;
