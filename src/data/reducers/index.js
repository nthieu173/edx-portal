import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import courseOutline from './courseOutline';
import courseEnrollments from './courseEnrollments';
import dashboardAnalytics from './dashboardAnalytics';
import enterpriseList from './enterpriseList';
import portalConfiguration from './portalConfiguration';

const identityReducer = (state) => { return { ...state }; };

const rootReducer = combineReducers({
  authConfig: identityReducer,
  authentication: identityReducer,
  routerReducer,
  courseOutline,
  courseEnrollments,
  enterpriseList,
  dashboardAnalytics,
  portalConfiguration,
});

export default rootReducer;
