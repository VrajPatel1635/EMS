import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, setData, onCompleteTask, onFailTask }) => {
  if (!data) return null;

  return (
    <div
      id="tasklist"
      className="flex items-center justify-start overflow-x-auto gap-5 flex-nowrap h-105 w-full "
    >
      {data.tasks.map((elem, idx) => {
        const isFirst = idx === 0 ? 'ml-5' : '';
        const isLast = idx === data.tasks.length - 1 ? 'mr-5' : '';
        const fixedHeight = 'h-70'; // ⬅️ Fixed height class

        const commonWrapperClass = `${isFirst} ${isLast} ${fixedHeight}`;

        if (elem.active) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <AcceptTask data={elem} onComplete={onCompleteTask} onFail={onFailTask} />
            </div>
          );
        }

        if (elem.newTask) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <NewTask data={elem} setData={setData} />
            </div>
          );
        }

        if (elem.completed) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <CompleteTask data={elem} />
            </div>
          );
        }

        if (elem.failed) {
          return (
            <div key={idx} className={commonWrapperClass}>
              <FailedTask data={elem} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default TaskList;
