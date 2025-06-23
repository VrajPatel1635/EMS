import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CheckCheck, Clock, Ban } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

// TaskCard component remains the same, it's a presentational component
const TaskCard = ({ count, label, icon: Icon, bgGradient, tooltipText }) => (
  <Tooltip.Provider delayDuration={200}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex-1 min-w-[200px] p-6 rounded-xl shadow-xl text-white cursor-default ${bgGradient}`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Icon size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{count}</h2>
              <h3 className="text-lg font-medium">{label}</h3>
            </div>
          </div>
        </motion.div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-gray-900 text-white px-3 py-2 text-sm rounded shadow-md max-w-xs"
          side="top"
          sideOffset={5}
        >
          {tooltipText}
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

// TaskListNum now receives the 'tasks' array directly as its 'data' prop
const TaskListNum = ({ data }) => {
  // Ensure data is an array. It should be, based on EmployeeDash.jsx passing `tasks`.
  const tasks = Array.isArray(data) ? data : [];

  // Calculate task counts based on the 'tasks' array
  const taskCounts = {
    newTask: tasks.filter(task => task && task.newTask).length,
    completed: tasks.filter(task => task && task.completed).length,
    active: tasks.filter(task => task && task.active).length,
    failed: tasks.filter(task => task && task.failed).length,
  };

  return (
    <motion.div
      className="flex flex-wrap justify-between gap-6 mt-10"
      initial="hidden"
      animate="visible"
    >
      <TaskCard
        count={taskCounts.newTask}
        label="New Task"
        icon={ClipboardList}
        tooltipText="Tasks that have been recently created and are waiting to be accepted."
        bgGradient="bg-gradient-to-r from-rose-500 to-pink-500"
      />
      <TaskCard
        count={taskCounts.completed}
        label="Completed"
        icon={CheckCheck}
        tooltipText="Tasks that have been successfully finished."
        bgGradient="bg-gradient-to-r from-emerald-500 to-teal-500"
      />
      <TaskCard
        count={taskCounts.active}
        label="Active"
        icon={Clock}
        tooltipText="Tasks currently being worked on."
        bgGradient="bg-gradient-to-r from-sky-500 to-blue-500"
      />
      <TaskCard
        count={taskCounts.failed}
        label="Failed"
        icon={Ban}
        tooltipText="Tasks that were not completed successfully."
        bgGradient="bg-gradient-to-r from-yellow-500 to-orange-500"
      />
    </motion.div>
  );
};

export default TaskListNum;
