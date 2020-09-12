import React from 'react';
import {generate} from 'shortid';
import SubTask from '../SubTask/SubTask';

const SubTaskList = ({
  projects, 
  projectName, 
  currentTask, 
  calculateProgressBarLength, 
  updateTasksArray,
  changeStatusSubTask
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
              changeStatusSubTask={changeStatusSubTask}
            />
          )
      })}
    </div>
  );
};

export default SubTaskList;