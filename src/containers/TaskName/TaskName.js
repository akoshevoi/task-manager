import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showingModal} from '../../redux/actions/actions';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {changeStatusTaskInDB, getTaskFromDB} from '../../api/projects';

const TaskName = ({task, statusTask, projectName}) => {
  const [status, setStatus] = useState(statusTask);
  //const [taskFromDB, setTaskFromDB] = useState({})
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    const status = event.target.value;
    setStatus(status);
    changeStatusTaskInDB(user.uid, projectName, task, status);
  };

  const openModal = () => {
    dispatch(showingModal(true, task));
  }

  useEffect(() => {
    async function fetchTaskFromDB() {
      console.log('task from props: ', task);
      const fetchedTaskFromDB = await getTaskFromDB(user.uid, projectName, task);
      console.log('fetched task from DB: ', fetchedTaskFromDB);
      //setTaskFromDB(fetchedTaskFromDB);
    }
    fetchTaskFromDB();
  }, [user, projectName, task]);

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
                value={status}
                onChange={handleChange}
              >
                <MenuItem value='To Do'>To Do</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Done'>Done</MenuItem>
              </Select>
            </div>
          </div>
          <Button variant='contained' color='primary' onClick={openModal}>
            Open Task
          </Button>
        </div>
      </Paper>
    </div> 
  );
};

export default TaskName;