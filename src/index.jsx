import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Helmet } from 'react-helmet';

import configuration from './config';
import EnterpriseApp from './containers/EnterpriseApp';
import NotFoundPage from './containers/NotFoundPage';
import SupportPage from './containers/SupportPage';
import Header from './containers/Header';
import Footer from './containers/Footer';
import EnterpriseIndexPage from './containers/EnterpriseIndexPage';
import PrivateRoute from './containers/PrivateRoute';
import LogoutRedirect from './components/LogoutRedirect';
import store from './data/store';
import AuthService from './data/services/AuthService';
import './index.scss';

const history = createHistory();

const AppWrapper = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <div>
          <Helmet
            titleTemplate="%s - edX Portal"
            defaultTitle="edX Portal"
          />
          <Header />
          <Switch>
            <Route exact path="/logout" component={LogoutRedirect} />
            <Route exact path="/support" component={SupportPage} />
            <PrivateRoute exact path="/enterprises" component={EnterpriseIndexPage} />
            <PrivateRoute path="/:enterpriseSlug" component={EnterpriseApp} />
            <PrivateRoute exact path="/" component={EnterpriseIndexPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ConnectedRouter>
  </Provider>
);

if (AuthService.isAuthenticated()) {
  ReactDOM.render(<AppWrapper />, document.getElementById('root'));
} else {
  window.location = configuration.LMS_BASE_URL + '/login?next=https%3A%2F%2Ftygra.sandbox.edx.org';
}
