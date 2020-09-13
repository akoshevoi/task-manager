import React from 'react';
import AddTaskForm from '../AddTaskForm';
import TaskName from '../TaskName';

const Column = ({
  statusTask, 
  projectName, 
  currentProject, 
  projectId,
  dispatchActionChangeStatusTask,
  openModal,
  projects,
  updateTasksArray,
  dispatchActionAddTask,
  user,
  tasks
}) => {
  
  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        tasks={tasks}
        user={user}
        projects={projects}
        projectId={projectId}
        statusTask={statusTask} 
        projectName={projectName} 
        updateTasksArray={updateTasksArray}
        dispatchActionAddTask={dispatchActionAddTask}
      />
        {
        tasks.taskList.length > 0 && tasks.taskList.map(task => { 
        return (
          task.status === statusTask && task.projectId === projectId
          ? <TaskName 
              key={task.taskId} 
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