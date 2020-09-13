import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchingProjectsArrayFromDB} from '../../redux/actions/projects';
import {fetchingTasksFromDataBase} from '../../redux/actions/tasks';
import withAuth from '../../HOC';

const DataFetcher = () => {
  const user = useSelector(state => state.user);
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();
/*
  const projectId = projects.activeProject
      ? projects.activeProject 
      : localStorage.getItem('activeProjectId');
      */
/*
    console.log('id_redux: ', projects.activeProject);
    console.log('id_local-storage: ', localStorage.getItem('activeProjectId'));
    console.log('final-id: ', projectId);
  */
  useEffect(() => {
    dispatch(fetchingProjectsArrayFromDB(user.uid));
    // eslint-disable-next-line
  }, [])

/*
  useEffect(() => {
    dispatch(fetchingTasksFromDataBase(projectId));
    // eslint-disable-next-line
  }, [])
*/
  return null
};

export default withAuth(DataFetcher);