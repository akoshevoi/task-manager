import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../layouts/App';
import ProjectsBoard from '../containers/ProjectsBoard';
import AuthenticationPage from '../components/AuthenticationPage';
import AuthUserListener from '../components/AuthUserListener';
import * as ROUTES from '../constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <AuthUserListener />
      <Switch>
        <Route exact path={ROUTES.AUTHENTICATION} component={AuthenticationPage} />
        <Route path={ROUTES.PROJECTS_BOARD} component={ProjectsBoard} />
        <Route path={`${ROUTES.TASK_BOARD}/:projectName`} component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;