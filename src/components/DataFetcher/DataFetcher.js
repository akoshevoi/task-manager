import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchingProjectsArrayFromDB} from '../../redux/actions/projects';
import withAuth from '../../HOC';

const DataFetcher = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingProjectsArrayFromDB(user.uid));
    // eslint-disable-next-line
  }, [])
  return null
};

export default withAuth(DataFetcher);