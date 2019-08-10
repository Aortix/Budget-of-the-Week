import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import DayPage from "./containers/DayPage";
import PreviousWeeksPage from "./containers/PreviousWeeksPage";

export default () => (
  <App>
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.DAYSCREEN} component={DayPage} />
      <Route exact path={routes.PREVIOUSWEEKSSCREEN} component={PreviousWeeksPage} />
    </Switch>
  </App>
);
