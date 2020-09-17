import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const withAuth = Component => props => {
  const user = useSelector(state => state.user);

  const useCustom = () => {
    const repeatUser = useSelector(state => state.user);
    if (!repeatUser) {
      console.log('user dont auth');
    }
  }

  useCustom()

  console.log('withAuth: ', user);

  return (
    !user ? (
      <Redirect to={ROUTES.AUTHENTICATION} />
    ) : (
      Object.keys(user).length > 0 && <Component {...props} />
    )
  )
}

export default withAuth;
