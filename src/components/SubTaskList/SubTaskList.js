import React from 'react';
import {generate} from 'shortid';
import SubTask from '../SubTask/SubTask';

const SubTaskList = ({
  projects, 
  projectName, 
  latestTask,
  calculateProgressBarLength, 
  updateTasksArray,
  dispatchActionChangeStatusSubTask
}) => { 
  return (
    <div className='sub-tasks'>
      {latestTask.subTasks.subTasksList.length > 0 && latestTask.subTasks.subTasksList.map(task => {
        let uid = generate();
          return (
            <SubTask 
              key={uid} 
              task={task}
              projects={projects} 
              projectName={projectName}
              latestTask={latestTask}
              calculateProgressBarLength={calculateProgressBarLength}
              updateTasksArray={updateTasksArray}
              dispatchActionChangeStatusSubTask={dispatchActionChangeStatusSubTask}
            />
          )
      })}
    </div>
  );
};

export default SubTaskList;