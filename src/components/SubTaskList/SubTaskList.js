import React from 'react';
import {generate} from 'shortid';
import SubTask from '../SubTask/SubTask';

const SubTaskList = ({projects, projectName, currentTask, calculateProgressBarLength, updateTasksArray}) => {
  return (
    <div className='sub-tasks'>
      {currentTask.subtasks && currentTask.subtasks.map(task => {
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
            />
          )
      })}
    </div>
  );
};

export default SubTaskList;