'use strict';

import React                       from 'react/addons';
import {Router, Route, IndexRoute} from 'react-router';
import CreateBrowserHistory        from 'history/lib/createBrowserHistory';

import App                         from './App';
import HomePage                    from './pages/HomePage';
import SearchPage                  from './pages/SearchPage';
import NotFoundPage                from './pages/NotFoundPage';
import Payments                   from './components/Payments';
import Dashboard                  from './components/Dashboard';
import Assets                     from './components/Assets';
import Login                      from './components/Login';
import Users                      from './components/Users';
import Affiliates                from './components/Affiliates';

export default (
  <Router history={CreateBrowserHistory()}>
    <Route path="/" component={App}>

      <IndexRoute component={HomePage} />

      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/payments" component={Payments} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assets" component={Assets} />
      <Route path="/login" component={Login} />
      <Route path="/users" component={Users} />
      <Route path="/affiliates" component={Affiliates} />

      <Route path="*" component={NotFoundPage} />

    </Route>
  </Router>
);
