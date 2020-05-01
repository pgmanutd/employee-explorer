import React, { memo, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routePaths from 'shared/settings/routePaths';

import Spinner from 'shared/components/Spinner';

const EmployeeExplorer = lazy(() =>
  import(/* webpackChunkName: "EmployeeExplorer" */ 'pages/EmployeeExplorer'),
);
const EmployeeOverview = lazy(() =>
  import(/* webpackChunkName: "EmployeeOverview" */ 'pages/EmployeeOverview'),
);
const NotFound = lazy(() =>
  import(/* webpackChunkName: "NotFound" */ 'pages/NotFound'),
);

const App = (props) => (
  <div data-testid="App" className="container-fluid" {...props}>
    <div className="row justify-content-center">
      <main className="col-10 py-md-3 pl-md-5 bd-content" role="main">
        <Suspense fallback={<Spinner />}>
          <Router>
            <Switch>
              <Route
                path={routePaths.employeeExplorer}
                exact
                component={EmployeeExplorer}
              />
              <Route
                path={`${routePaths.employeeOverview.base}/${routePaths.employeeOverview.withParams}`}
                component={EmployeeOverview}
              />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Suspense>
      </main>
    </div>
  </div>
);

export default memo(App);
