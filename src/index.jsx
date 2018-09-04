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
import { PrivateRoute } from '@edx/frontend-auth-client';

import apiClient from './data/apiClient';
import EnterpriseApp from './containers/EnterpriseApp';
import NotFoundPage from './containers/NotFoundPage';
import SupportPage from './containers/SupportPage';
import Header from './containers/Header';
import Footer from './containers/Footer';
import EnterpriseIndexPage from './containers/EnterpriseIndexPage';
import store from './data/store';
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
            <Route exact path="/support" component={SupportPage} />
            <PrivateRoute
              exact
              path="/enterprises"
              component={EnterpriseIndexPage}
              authenticatedAPIClient={apiClient}
              redirect={process.env.BASE_URL}
            />
            <PrivateRoute
              path="/:enterpriseSlug"
              component={EnterpriseApp}
              authenticatedAPIClient={apiClient}
              redirect={process.env.BASE_URL}
            />
            <PrivateRoute
              exact
              path="/"
              component={EnterpriseIndexPage}
              authenticatedAPIClient={apiClient}
              redirect={process.env.BASE_URL}
            />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ConnectedRouter>
  </Provider>
);

if (apiClient.isAuthenticated()) {
  ReactDOM.render(<AppWrapper />, document.getElementById('root'));
} else {
  apiClient.login(process.env.BASE_URL);
}
