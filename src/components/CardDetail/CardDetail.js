import React, {useState} from 'react';
import {generate} from 'shortid';
import {useDispatch, useSelector} from 'react-redux';
import {
  addingSubTask, 
  showingModal, 
  changingStatusSubTask
} from '../../redux/actions/actions';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
//import AddTaskForm from '../AddTaskForm/AddTaskForm';

const CardDetail = ({currentTask, isShow}) => {
  const subTasksArray = useSelector(state => state.modal.task.subTasks);
  const subTasksArrayDone = useSelector(state => {
    const arr = state.modal.task.subTasks;
    const newArr = arr.filter(item => item.done === true);
    return newArr;
  });
  const [subTask, setSubTask] = useState('');
  const [progressBarLength, setProgressBarLength] = useState(0);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showingModal(false, currentTask));
  }

  const handleChange = event => {
    setSubTask(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addingSubTask(currentTask, {name: subTask, done: false}));
    setSubTask('');
  };

  const getProgressBarLength = (totalLength, doneLength) => {
      console.log('total_func: ', totalLength);
      console.log('done_func: ', doneLength);
      const ratio = totalLength / doneLength;
      //const ratioRounded = Math.floor(ratio * 100) / 100;
      const ratioRounded = Math.floor(ratio);
      console.log(ratioRounded);
      const progressBarLengthRaw = 100 / ratio;
      //const progressBarLength = Math.floor(progressBarLengthRaw * 100) / 100;
      const progressBarLength = Math.floor(progressBarLengthRaw);
      console.log(progressBarLength);
      return progressBarLength;
    
  }

  const handleChangeCheckbox = event => {
    let isCheckedCheckbox = event.target.checked;
    let nameCheckbox = event.target.name;

    
    
/*
    console.log(subTasksArray);
    const searchingCheckbox = subTasksArray.find(item => item.name === nameCheckbox);
    const isCheckedCheckboxStatus = searchingCheckbox.done;
    */
    dispatch(changingStatusSubTask(currentTask, nameCheckbox, isCheckedCheckbox));
    const total = currentTask.subTasks.length;
    const done = currentTask.subTasks.filter(item => item.done === true).length;
    console.log(total);
    console.log(done);
    const length = getProgressBarLength(total, done);
    console.log(length);
    setProgressBarLength(length);
  }

  console.log(progressBarLength);

  return (
    <Modal
      open={isShow}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className='card-detail'>
        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</p>
        <LinearProgress variant='determinate' value={progressBarLength}/>
        <div className='card-detail__percent'>{progressBarLength}%</div>
        <form onSubmit={handleSubmit}>
          <input 
            type='text'
            name='subTaskName'
            value={subTask}
            onChange={handleChange} 
          />
          <button>Add subTask</button>
        </form> 
        
        {/* <AddTaskForm         
          action={addingSubTask} 
          arg={task.name === id ? task : task}
          statusTask={false}
        /> */}
        <button onClick={handleClose}>Close Modal</button>
          {currentTask.subTasks.map(task => {
            let uid = generate();
            return (
              <div key={uid} className='sub-task'>
                <input checked={task.done} type='checkbox' id={uid} name={task.name} onChange={handleChangeCheckbox}/>
                <label htmlFor={uid}>{task.name}</label>
              </div>
            )
          })}
      </div>
    </Modal>
  );
};

export default CardDetail;