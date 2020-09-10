import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {showingModal} from '../../redux/actions/modal';
import {addingDescriptionToTask, addingSubTask} from '../../redux/actions/projects';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import ClearIcon from '@material-ui/icons/Clear';
import SubTaskList from '../SubTaskList';
import AddSubTaskForm from '../../components/AddSubTaskForm';
import AddDescriptionForm from '../../components/AddDescriptionForm';

const TaskDetail = ({currentTask, isShow, projectName}) => {
  const [progressBarLength, setProgressBarLength] = useState(0);
  const dispatch = useDispatch();

  const calculateProgressBarLength = useCallback(() => {
    if(currentTask.subTasks && currentTask.subTasks.length > 0) {
      const totalLength = currentTask.subTasks.length;
      const doneLength = currentTask.subTasks.filter(item => item.done === true).length;
      const ratio = totalLength / doneLength;
      const ratioRounded = Math.floor(ratio * 100) / 100;
      const progressBarLengthRaw = 100 / ratioRounded;
      const progressBarLength = Math.floor(progressBarLengthRaw);
      return setProgressBarLength(progressBarLength);
    } 
    setProgressBarLength(0);
  },[currentTask]);

  useEffect(() => {
    calculateProgressBarLength();
  },[currentTask, calculateProgressBarLength]);


  const handleClose = () => {
    dispatch(showingModal(false, currentTask));
  }

  const dispatchAction = action => {
    dispatch(action);
  }

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
          {currentTask.name && currentTask.name}
        </h2>
        <AddDescriptionForm 
          projectName={projectName} 
          currentTask={currentTask}
          dispatchAction={dispatchAction}
          action={addingDescriptionToTask}
        />
        { currentTask.description &&
          <h3 className='task-detail__subtitle'>Description of task</h3>
        }
        <div className='task-detail__description'>
          {currentTask.description && currentTask.description}
        </div>
        <LinearProgress variant='determinate' value={progressBarLength}/>
        <div className='task-detail__percent'>{progressBarLength}%</div>
        <AddSubTaskForm 
          currentTask={currentTask} 
          calculateProgressBarLength={calculateProgressBarLength}
          projectName={projectName}
          dispatchAction={dispatchAction}
          action={addingSubTask}
        />
          <SubTaskList 
            projectName={projectName}
            currentTask={currentTask} 
            calculateProgressBarLength={calculateProgressBarLength}
          />
      </div>
    </Modal>
  );
};

export default TaskDetail;