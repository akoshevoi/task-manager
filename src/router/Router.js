import React, {useState} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from '../layouts/App';
import ProjectsBoard from '../containers/ProjectsBoard';
import AuthenticationPage from '../components/AuthenticationPage';
import {Auth} from '../components/Auth/Auth';
import * as ROUTES from '../constants/routes';

const Router = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuth, setAuth] = useState(false);
  return (
    <BrowserRouter>
      <Auth setIsLoaded={setIsLoaded} setAuth={setAuth} />
      <Switch>
        <Route exact path={ROUTES.AUTHENTICATION} component={AuthenticationPage} />
        <Route path={ROUTES.PROJECTS_BOARD} component={ProjectsBoard} />
        <Route path={`${ROUTES.TASK_BOARD}/:projectName`} component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;