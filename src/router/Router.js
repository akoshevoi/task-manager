import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../components/App/App';
import ProjectsBoard from '../containers/ProjectsBoard';
import * as ROUTES from '../constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.PROJECTS_BOARD} component={ProjectsBoard} />
        <Route path={`${ROUTES.TASK_BOARD}/:projectName`} component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;