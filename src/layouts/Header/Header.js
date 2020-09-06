import React from 'react';
import LogoSvgIcon from '../../assets/icons/LogoSvgIcon';

const Header = () => (
  <header className='header'>
    <LogoSvgIcon />
    <div className='header__name'>Task Manager</div>
    {/* <div className='header__user'>Some User</div> */}
  </header>
);

export default Header;