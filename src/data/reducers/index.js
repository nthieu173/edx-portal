import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import courseOutline from './courseOutline';
import courseEnrollments from './courseEnrollments';
import dashboardAnalytics from './dashboardAnalytics';
import enterpriseList from './enterpriseList';
import portalConfiguration from './portalConfiguration';
import authentication from './authentication';
import sidebar from './sidebar';

const rootReducer = combineReducers({
  routerReducer,
  courseOutline,
  courseEnrollments,
  enterpriseList,
  dashboardAnalytics,
  portalConfiguration,
  authentication,
  sidebar,
});

export default rootReducer;
