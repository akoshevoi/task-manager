import React from 'react';
import LogoSvgIcon from '../../assets/icons/LogoSvgIcon';
import {useSelector, useDispatch} from 'react-redux';
import {signOut, authListener, getUser} from '../../api/auth';
import {getUserData} from '../../api/users';
import {firebaseApp} from '../../firebaseConfig';
import {authenticationUser} from '../../redux/actions/actions';

const Header = () => {
  const user = useSelector(state => state.user);
  const authUser = firebaseApp.auth().currentUser;
  const dispatch = useDispatch();

  const signOutUser = () => {
    signOut();
    dispatch(authenticationUser({}));
    //authListener(dispatch(authenticationUser({})));
  }

  return (
  <header className='header'>
    <LogoSvgIcon />
    <div className='header__name'>Task Manager</div>
    {Object.keys(user).length > 0 &&
      <div className='header__user'>
        <div className='header__profile'>
          {user.name}
        </div>
        <button onClick={signOutUser}>Sign Out</button>
      </div> 
    }
  </header>
)};

export default Header;