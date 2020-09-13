import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const TaskName = ({
  task, 
  projectId,
  statusTask, 
  dispatchActionChangeStatusTask,
  openModal
}) => {
  const handleChange = event => {
    const updatedTaskStatus = event.target.value;
    dispatchActionChangeStatusTask(task.taskId, updatedTaskStatus);
  }
    
  const handleModal = () => {
    openModal(task);
  }

  return (
    <div className='task-name'>
      <Paper>
        <div className="task-name__inner">
          <div className="task-name__top">
            <div className="task-name__text">
              <h2 className='task-name__title'>{task.name}</h2>
            </div>
            <div className="task-name__select">
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                value={statusTask}
                onChange={handleChange}
              >
                <MenuItem value='To Do'>To Do</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Done'>Done</MenuItem>
              </Select>
            </div>
          </div>
          <Button variant='contained' color='primary' onClick={handleModal}>
            Open Task
          </Button>
        </div>
      </Paper>
    </div> 
  );
};

export default TaskName;