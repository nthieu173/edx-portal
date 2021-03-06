import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

import AdminPage from './index';

const mockStore = configureMockStore([thunk]);

describe('<AdminPage />', () => {
  let store;
  let wrapper;
  let dispatchSpy;

  beforeEach(() => {
    const initialState = {
      portalConfiguration: {
        enterpriseId: 'test-enterprise',
      },
      dashboardAnalytics: {
        active_learners: {
          past_month: 1,
          past_week: 1,
        },
        enrolled_learners: 1,
        number_of_users: 3,
        course_completions: 1,
      },
      courseEnrollments: {
        csvLoading: false,
        csvError: null,
      },
    };
    store = mockStore(initialState);
    dispatchSpy = jest.spyOn(store, 'dispatch');
    wrapper = shallow((
      <AdminPage store={store} />
    ));
  });

  it('sets the appropriate props', () => {
    expect(wrapper.props().enrolledLearners).toEqual(1);
    expect(wrapper.props().courseCompletions).toEqual(1);
    expect(wrapper.props().activeLearners).toEqual({
      past_week: 1,
      past_month: 1,
    });
  });

  it('getDashboardAnalytics dispatches fetchDashboardAnalytics action', () => {
    wrapper.props().getDashboardAnalytics('ee5e6b3a-069a-4947-bb8d-d2dbc323396c');
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
