import React from 'react';
import {generate} from 'shortid';
import SubTask from '../SubTask';

const SubTaskList = ({currentTask, calculateProgressBarLength}) => {
  
  return (
    <div className='sub-tasks'>
      {currentTask.subTasks.map(task => {
        let uid = generate();
          return (
            <SubTask 
              key={uid} 
              task={task} 
              currentTask={currentTask} 
              calculateProgressBarLength={calculateProgressBarLength}
            />
          )
      })}
    </div>
  );
};

export default SubTaskList;