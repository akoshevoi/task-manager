import React from 'react';
import Header from '../../layouts/Header';
import TabsAuthentication from '../TabsAuthentication';

const AuthenticationPage = () => {
  return (
    <div className='authentication-page'>
      <Header />
      <TabsAuthentication/>
    </div>
  );
};

export default AuthenticationPage;