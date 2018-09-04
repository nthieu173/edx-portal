import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';
import { createMiddleware } from 'redux-beacon';
import Segment, { trackEvent, trackPageView } from '@redux-beacon/segment';
import { LOCATION_CHANGE } from 'react-router-redux';

import apiClient from './apiClient';
import { FETCH_CSV_REQUEST } from './constants/courseEnrollments';
import reducers from './reducers';

const loggerMiddleware = createLogger();

const eventsMap = {
  [LOCATION_CHANGE]: trackPageView(action => ({
    page: action.payload.pathname,
  })),
  [FETCH_CSV_REQUEST]: trackEvent(() => ({
    name: 'Enterprise CSV File Downloaded',
  })),
};

const segmentMiddleware = createMiddleware(eventsMap, Segment());

const middleware = [thunkMiddleware, loggerMiddleware, segmentMiddleware];

const initialState = apiClient.getAuthenticationState();
if (initialState.authentication) {
  analytics.identify(initialState.authentication.email);
}

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
