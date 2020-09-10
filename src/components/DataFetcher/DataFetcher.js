import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {settingProjectArrayFromDbToStore} from '../../redux/actions/projects';
import {getProjectsFromDB} from '../../api/projects'; 
import withAuth from '../../HOC';

const DataFetcher = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateProjectsArray = async () => {
      try {
        const fetchedProjects = await getProjectsFromDB(user.uid); 
        dispatch(settingProjectArrayFromDbToStore(fetchedProjects));
      } catch (error) {
        console.log(error);
      } 
    }
    updateProjectsArray();
    // eslint-disable-next-line
  }, [])
  return null
};

export default withAuth(DataFetcher);