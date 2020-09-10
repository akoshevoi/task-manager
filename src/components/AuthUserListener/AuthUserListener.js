import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {firebaseApp} from '../../firebaseConfig';
import {getAuthUserData} from '../../api/users';
import {authenticationUser} from '../../redux/actions/user';

const AuthUserListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async u => {
      if (!u) {
        dispatch(authenticationUser(null));
        return;
      } 
      const user = await getAuthUserData(u.uid);

      if (!user.exists) {
        dispatch(authenticationUser(null));
        return;
      }
      const userData = (user.data());
      dispatch(authenticationUser(userData));
    })
    return () => {
      unsubscribe();
    }
  });
  return null;
};

export default AuthUserListener;