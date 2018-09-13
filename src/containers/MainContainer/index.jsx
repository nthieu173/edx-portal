import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  Route,
  Switch,
} from 'react-router-dom';

import EnterpriseApp from '../EnterpriseApp';
import NotFoundPage from '../NotFoundPage';
import SupportPage from '../SupportPage';
import Header from '../Header';
import Footer from '../Footer';
import LoginPage from '../LoginPage';
import EnterpriseIndexPage from '../EnterpriseIndexPage';
import PrivateRoute from '../PrivateRoute';
import LogoutHandler from '../LogoutHandler';


const MainContent = (props) => {
  return <div id="content" className={props.sidebarExpanded ? "with-sidebar" : "without-sidebar"}>
      <Helmet
        titleTemplate="%s - edX Portal"
        defaultTitle="edX Portal"
      />
      <Header />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutHandler} />
        <Route exact path="/support" component={SupportPage} />
        <PrivateRoute exact path="/enterprises" component={EnterpriseIndexPage} />
        <PrivateRoute path="/:enterpriseSlug" component={EnterpriseApp} />
        <PrivateRoute exact path="/" component={EnterpriseIndexPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
  </div>
};

const mapStateToProps = (state, ownProps) => (
  {
    sidebarExpanded: state.sidebar.expanded || ownProps.sidebarExpanded,
  }
);

const mapDispatchToProps = dispatch => (
  {
  }
);


const  MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent);

export default MainContainer;