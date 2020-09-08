import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {firebaseApp} from '../../firebaseConfig';
import {getAuthUserData} from '../../api/users';
import {authenticationUser} from '../../redux/actions/actions';

const AuthUserListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async u => {
      if (!u) {
        dispatch(authenticationUser(null));
        //console.log(1);
        return;
      } 
      const user = await getAuthUserData(u.uid);

      if (!user.exists) {
        dispatch(authenticationUser(null));
        //console.log(2);
        return;
      }
      const userData = (user.data());
      dispatch(authenticationUser(userData));
      //console.log(3);
    })
    return () => {
      unsubscribe();
      //console.log(4);
    }
  });
  //console.log(5);
  return null;
};

export default AuthUserListener;