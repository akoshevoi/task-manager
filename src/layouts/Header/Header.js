import React from 'react';
import {signOut} from '../../api/auth';
import {authenticationUser} from '../../redux/actions/user';
import {useSelector, useDispatch} from 'react-redux';
import LogoSvgIcon from '../../assets/icons/LogoSvgIcon';

const Header = () => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const signOutUser = () => {
    signOut();
    dispatch(authenticationUser({}));
  }

  return (
  <header className='header'>
    <LogoSvgIcon />
    <div className='header__name'>Task Manager</div>
    {!!user &&
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