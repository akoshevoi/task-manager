import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addingTask} from '../../redux/actions/actions';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {generate} from 'shortid';
import AddTaskForm from '../../components/AddTaskForm';
import TaskName from '../TaskName';
import TaskDetail from '../TaskDetail';
import {getTaskArrayFromDB, getProjectsFromDB} from '../../api/projects'; 

const Column = ({statusTask}) => {

  const [tasksFromDB, setTasksFromDB] = useState([]);
  
  const user = useSelector(state => state.user);
  const params = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);

  const dispatchAction = (...args) => {
    dispatch(addingTask(...args))
  }  
  useEffect(() =>{
    if (history.action === "POP"){
      //const project = await getProject(params.projectName)
      // if (!project){
      //history.push(ROUTES.PROJECTS_BOARD)  
      //return
     // }
     // setProjectIdToStore(project.id)
    }
  }, [])
  useEffect(() => {
    async function fetchTaskArray() {
      const fetchedTasks = await getTaskArrayFromDB(user.uid, params.projectName);
      setTasksFromDB(fetchedTasks);
    }
    fetchTaskArray();
  }, [user, params]);
  
  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        statusTask={statusTask} 
        projectName={params.projectName} 
        dispatchAction={dispatchAction}
        setTasksFromDB={setTasksFromDB}
        tasksFromDB={tasksFromDB}
      />

       {/* {tasksFromDB.map(task => {
        let uid = generate();  
        return (
          task.status === statusTask
          ? <TaskName 
              key={uid} 
              task={task} 
              statusTask={statusTask} 
              projectName={params.projectName} 
            />
          : null
        )
      })} */}

      <TaskDetail 
        currentTask={currentTask} 
        isShow={isShow} 
        projectName={params.projectName} 
      />
    </div>
  )
};

export default Column;