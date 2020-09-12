import React from 'react';
import {generate} from 'shortid';
import SubTask from '../SubTask/SubTask';

const SubTaskList = ({
  projects, 
  projectName, 
  currentTask, 
  calculateProgressBarLength, 
  updateTasksArray,
  dispatchActionChangeStatusSubTask
}) => { 
  return (
    <div className='sub-tasks'>
      {currentTask.subTasks && currentTask.subTasks.map(task => {
        let uid = generate();
          return (
            <SubTask 
              key={uid} 
              task={task}
              projects={projects} 
              projectName={projectName}
              currentTask={currentTask} 
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