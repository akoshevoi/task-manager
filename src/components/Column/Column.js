import React from 'react';
import AddTaskForm from '../AddTaskForm';
import TaskName from '../TaskName';

const Column = ({
  statusTask, 
  projectName, 
  dispatchAction, 
  currentProject, 
  projectId,
  dispatchActionChangeStatusTask,
  openModal,
  projects,
  updateTasksArray,
  dispatchActionAddTask
}) => {
  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        projects={projects}
        projectId={projectId}
        statusTask={statusTask} 
        projectName={projectName} 
        dispatchAction={dispatchAction}
        updateTasksArray={updateTasksArray}
        dispatchActionAddTask={dispatchActionAddTask}
      />
        {
        currentProject && currentProject.tasks.taskList.map(task => { 
        return (
          task.status === statusTask
          ? <TaskName 
              key={task.name} 
              task={task} 
              statusTask={statusTask} 
              projects={projects}
              projectName={projectName} 
              projectId={projectId}
              dispatchActionChangeStatusTask={dispatchActionChangeStatusTask}
              openModal={openModal}
            />
          : null
        )
      })
      } 
    </div>
  )
};

export default Column;