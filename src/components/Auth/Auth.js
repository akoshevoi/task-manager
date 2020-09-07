import {useEffect} from 'react';
import {firebaseApp} from '../../firebaseConfig';
import {getUserData} from '../../api/users';
import {useDispatch} from 'react-redux';
import {authenticationUser} from '../../redux/actions/actions';

export const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async u => {
      if (!u) {
        //console.log('user');
        return;
      } 
      const user = await getUserData(u.uid);

      if (!user) {
        //console.log('message');
        return;
      }
      
      const userData = (await user.get()).data();

      //console.log(userData);

      dispatch(authenticationUser(userData));
    })
    return () => {
      unsubscribe();
    }
  });
  return null;
};

export default Auth;