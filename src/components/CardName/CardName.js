import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {useDispatch} from 'react-redux';
import {changingStatusTask} from '../../redux/actions/actions';
import {useSelector} from 'react-redux';
import CardDetail from '../CardDetail/CardDetail';
import {showingModal} from '../../redux/actions/actions';

const CardName = ({task, name}) => {
  const tasks = useSelector(state => state);
  const modalIsOpen = useSelector(state => state.modalIsOpen);
  console.log(modalIsOpen);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(name);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChange = (event) => {
    const status = event.target.value;
    setStatus(status);
    dispatch(changingStatusTask(task, event.target.value));
    console.log(tasks);
  };

  const openModal = () => {
    dispatch(showingModal(true));
    setIsOpenModal(true);
  }

  return (
    <div className='card-name'>
      <Paper>
        <h2 className='card-name__title'>{task.name}</h2>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          onChange={handleChange}
        >
          <MenuItem value='To Do'>To Do</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Done'>Done</MenuItem>
        </Select>
        <button onClick={openModal}>Open Task</button>
        <CardDetail open={modalIsOpen} handleOpenModal={setIsOpenModal} task={task} />
      </Paper>
    </div> 
  );
};

export default CardName;