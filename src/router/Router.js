import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import TaskPage from '../layouts/TaskPage';
import ProjectPage from '../layouts/ProjectPage';
import AuthenticationPage from '../components/AuthenticationPage';
import AuthUserListener from '../components/AuthUserListener';
import DataFetcher from '../components/DataFetcher';
import Loader from '../components/Loader';
import * as ROUTES from '../constants/routes';
import {useSelector} from 'react-redux';

const Router = () => {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <BrowserRouter>
      <AuthUserListener />
      <DataFetcher />
      <Loader isOpen={isLoading} />
      <Switch>
        <Route exact path={ROUTES.AUTHENTICATION} component={AuthenticationPage} />
        <Route path={ROUTES.PROJECTS_BOARD} component={ProjectPage} />
        <Route path={`${ROUTES.TASK_BOARD}/:projectName`} component={TaskPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;