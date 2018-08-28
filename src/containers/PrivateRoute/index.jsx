import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginRedirect from '../../components/LoginRedirect';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  isAuthenticated === true
    ? <Route
      {...rest}
      component={Component}
    />
    : <Route
      {...rest}
      component={LoginRedirect}
    />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
  }).isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
