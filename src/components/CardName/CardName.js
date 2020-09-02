import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {changingStatusTask, showingModal} from '../../redux/actions/actions';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const CardName = ({task, statusTask}) => {
  const [status, setStatus] = useState(statusTask);
  //const [idTaskCard, setIdTaskCard] = useState('');
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    const status = event.target.value;
    setStatus(status);
    dispatch(changingStatusTask(task, event.target.value));
  };

  const openModal = () => {
    //setIdTaskCard(idCard)
    dispatch(showingModal(true, task));
  }
    
  return (
    <div className='card-name'>
      <Paper>
        <h2 className='card-name__title'>{task.name}</h2>
        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={status}
          onChange={handleChange}
        >
          <MenuItem value='To Do'>To Do</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Done'>Done</MenuItem>
        </Select>
        <button onClick={openModal}>Open Task</button>
      </Paper>
    </div> 
  );
};

export default CardName;