import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addingTask} from '../../redux/actions/actions';
import {useParams} from 'react-router-dom';
import {generate} from 'shortid';
import AddTaskForm from '../../components/AddTaskForm';
import TaskName from '../TaskName';
import TaskDetail from '../TaskDetail';
import {getProjectsFromDB} from '../../api/projects'; 

const Column = ({statusTask}) => {
  const [projectsFromDB, setProjectsFromDB] = useState([]);

  const user = useSelector(state => state.user);

  let params = useParams();

/*
  useSelector(state => state.projects);
    const taskList = useSelector(state => {
      const projects = state.projects;
      const project = projects.find(project => project.name === params.projectName);
      return project.tasks.taskList;
  });
*/
  const dispatch = useDispatch();

  const currentTask = useSelector(state => state.modal.task);
  const isShow = useSelector(state => state.modal.isShow);

  const dispatchAction = (...args) => {
    dispatch(addingTask(...args))
  }  

  useEffect(() => {
    async function fetch() {
      const fetchedProjects = await getProjectsFromDB(user.uid);
      setProjectsFromDB(fetchedProjects);
    }
    fetch();
  }, [user]);

  return (
    <div className='column'>
      <h3 className='column__title'>{statusTask}</h3>
      <AddTaskForm 
        statusTask={statusTask} 
        projectName={params.projectName} 
        dispatchAction={dispatchAction}
      />
       {projectsFromDB.map(task => {
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
      })} 
      <TaskDetail 
        currentTask={currentTask} 
        isShow={isShow} 
        projectName={params.projectName} 
      />
    </div>
  )
};

export default Column;