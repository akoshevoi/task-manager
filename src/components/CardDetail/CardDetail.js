import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import {addingSubTask} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {showingModal} from '../../redux/actions/actions';

const CardDetail = ({open, handleOpenModal, task}) => {
  const modalIsOpen = useSelector(state => state.modalIsOpen);
  console.log(modalIsOpen);

  const tasks = useSelector(state => state);
  
  const [subTask, setSubTask] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showingModal(false))
    handleOpenModal(false);
  }

  const handleChange = event => {
    setSubTask(event.target.value)
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSubTask('');
    dispatch(addingSubTask(task, {name: subTask, done: false}));
  };

  return (
    <Modal
    open={modalIsOpen}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <div className='card-detail'>
      <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.</p>
      <LinearProgress variant='determinate' value={50}/>
      <form onSubmit={handleSubmit}>
        <input 
          name='subTaskName'
          value={subTask}
          onChange={handleChange} 
          type='text'
        />
        <button>Add subTask</button>
      </form>
      <button onClick={handleClose}>Close Modal</button>
      {task.subTasks.map(task => (
        <div key={task.name}>{task.name}</div>
      ))}
    </div>
    </Modal>
  );
};

export default CardDetail;