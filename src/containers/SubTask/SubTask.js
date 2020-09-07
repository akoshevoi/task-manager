import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changingStatusSubTask} from '../../redux/actions/actions';
import {getDocument1} from '../../api/users';
import {firebaseApp} from '../../firebaseConfig';

const SubTask = ({
  task, 
  currentTask, 
  projectName, 
  calculateProgressBarLength
}) => {
  const dispatch = useDispatch();
  const projectsArray = useSelector(state => state.projects);
  const userEmail = useSelector(state => state.user.email);

  const handleChangeCheckbox = event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;
    dispatch(changingStatusSubTask(
      projectName, currentTask, nameCheckbox, isCheckedCheckbox
    ));
    getDocument1(firebaseApp.firestore(), userEmail,  projectsArray);
    calculateProgressBarLength();
  }
  return (
    <div className='sub-task'>
      <input 
        checked={task.done} 
        type='checkbox' 
        name={task.name} 
        onChange={handleChangeCheckbox}
        className='sub-task__checkbox'
      />
      <label className='sub-task__label'>{task.name}</label>
    </div>
  );
};

export default SubTask;