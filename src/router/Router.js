import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TaskPage from '../layouts/TaskPage';
import ProjectPage from '../layouts/ProjectPage';
import AuthenticationPage from '../components/AuthenticationPage';
import AuthUserListener from '../components/AuthUserListener';
import DataFetcher from '../components/DataFetcher';
import * as ROUTES from '../constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <AuthUserListener />
      <DataFetcher />
      <Switch>
        <Route exact path={ROUTES.AUTHENTICATION} component={AuthenticationPage} />
        <Route path={ROUTES.PROJECTS_BOARD} component={ProjectPage} />
        <Route path={`${ROUTES.TASK_BOARD}/:projectName`} component={TaskPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;