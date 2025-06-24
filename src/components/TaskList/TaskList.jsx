import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
// Corrected import path for FailedTask
import FailedTask from './FailedTask.jsx';

// The 'data' prop here is now directly the array of tasks,
// as passed from EmployeeDash.jsx
const TaskList = ({ data, handleAcceptTask, onCompleteTask, onFailTask }) => {

  // Corrected check: 'data' itself should be an array
  if (!Array.isArray(data)) {
    console.error("TaskList received non-array data:", data); // Log error for debugging
    return <div className="text-white p-10">Invalid task data format.</div>;
  }

  // If the array is empty, we can show a different message
  if (data.length === 0) {
    return <div className="text-white p-10">No tasks to display at the moment.</div>;
  }

  return (
    <div
      id="tasklist"
      className="flex items-center justify-start overflow-x-auto gap-5 flex-nowrap h-105 w-full "
    >
      {data.map((elem, idx) => { // Directly map over 'data'
        // Add a defensive check for 'elem' itself, though it should be an object from App.jsx's defaults
        if (!elem || typeof elem !== 'object') {
            console.warn("TaskList encountered a non-object element in tasks array:", elem);
            return null; // Skip rendering invalid elements
        }

        const isFirst = idx === 0 ? 'ml-5' : '';
        const isLast = idx === data.length - 1 ? 'mr-5' : ''; // Use data.length
        const fixedHeight = 'h-70';

        const commonWrapperClass = `${isFirst} ${isLast} ${fixedHeight}`;

        // The optional chaining (elem?.property) is good here.
        // Ensure that the specific child components (AcceptTask, NewTask etc.) also handle
        // the possibility of nested properties within their 'data' prop being undefined if needed.

        if (elem?.active) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <AcceptTask data={elem} onComplete={onCompleteTask} onFail={onFailTask} />
            </div>
          );
        }

        if (elem?.newTask) {
          return (
            <div key={idx} className={commonWrapperClass}>
              {/* Removed setData, PASSED handleAcceptTask as onAcceptTask for NewTask */}
              <NewTask data={elem} onAcceptTask={handleAcceptTask} />
            </div>
          );
        }

        if (elem?.completed) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <CompleteTask data={elem} />
            </div>
          );
        }

        if (elem?.failed) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <FailedTask data={elem} />
            </div>
          );
        }

        return null; // If a task doesn't match any state, don't render it
      })}
    </div>
  );
};

export default TaskList;
