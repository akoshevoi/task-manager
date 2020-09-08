import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const withAuth = Component => props => {
  const user = useSelector(state => state.user);

  return (
    !user ? (
      <Redirect to={ROUTES.AUTHENTICATION} />
    ) : (
      Object.keys(user).length > 0 && <Component {...props} />
    )
  )
}

export default withAuth;
