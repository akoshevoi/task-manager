import React, {useState, useCallback} from 'react';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClearIcon from '@material-ui/icons/Clear';
import SubTaskList from '../SubTaskList';
import AddSubTaskForm from '../../components/AddSubTaskForm';
import AddDescriptionForm from '../../components/AddDescriptionForm';

const TaskDetail = ({
  tasks,
  currentProject,
  currentTask, 
  isShow, 
  projectName,
  handleClose,
  dispatchActionNew,
  projects,
  projectId,
  updateTasksArray,
  addDescriptionToDB,
  dispatchActionAddDescriptionToTask,
  dispatchActionAddSubTaskToTask,
  dispatchActionChangeStatusSubTask,
}) => {
  
  const latestTask = tasks.taskList.find(task => task.taskId === currentTask.taskId)

  const [progressBarLength, setProgressBarLength] = useState(0);
  const calculateProgressBarLength = useCallback((subTask) => {
    if (subTask && subTask.length > 0) {
      const totalLength = subTask.length;
      const doneLength = subTask.filter(item => item.done === true).length;
      const ratio = totalLength / doneLength;
      const ratioRounded = Math.floor(ratio * 100) / 100;
      const progressBarLengthRaw = 100 / ratioRounded;
      const progressBarLength = Math.floor(progressBarLengthRaw);
      return setProgressBarLength(progressBarLength);
    }
    setProgressBarLength(0);
  },[]);
  
  return (
    <Modal
      open={isShow}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className='task-detail'>
        <div className='task-detail__icon' onClick={handleClose}>
          <ClearIcon />
        </div>
        <h2 className='task-detail__title'>
          {latestTask && latestTask.name} 
        </h2>
        <AddDescriptionForm 
          projectName={projectName} 
          currentTask={currentTask}
          dispatchAction={dispatchActionNew}
          projects={projects}
          addDescriptionToDB={addDescriptionToDB}
          projectId={projectId}
          updateTasksArray={updateTasksArray}
          dispatchActionAddDescriptionToTask={dispatchActionAddDescriptionToTask}
        />
        {
          latestTask && latestTask.description &&
          <h3 className='task-detail__subtitle'>Description of task</h3>
        }
        <div className='task-detail__description'>
          {latestTask && latestTask.description} 
        </div>
        <LinearProgress variant='determinate' value={progressBarLength}/>
        <div className='task-detail__percent'>{progressBarLength}%</div>
        <AddSubTaskForm 
          projects={projects}
          latestTask={latestTask}
          calculateProgressBarLength={calculateProgressBarLength}
          projectName={projectName}
          dispatchAction={dispatchActionNew}
          updateTasksArray={updateTasksArray}
          dispatchActionAddSubTaskToTask={dispatchActionAddSubTaskToTask}
          projectId={projectId}
        />
          <SubTaskList 
            projects={projects}
            projectName={projectName}
            latestTask={latestTask}
            calculateProgressBarLength={calculateProgressBarLength}
            updateTasksArray={updateTasksArray}
            dispatchActionChangeStatusSubTask={dispatchActionChangeStatusSubTask}
          />
      </div>
    </Modal>
  );
};

export default TaskDetail;