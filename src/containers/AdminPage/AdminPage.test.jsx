import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import AdminPage from './index';

const mockStore = configureMockStore([thunk]);

class ContextProvider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object.isRequired,
  }

  static mockStore = mockStore({
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
  });

  getChildContext = () => ({
    store: ContextProvider.mockStore,
  })

  render() {
    return this.props.children;
  }
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

describe('<AdminPage />', () => {
  let wrapper;
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = jest.spyOn(ContextProvider.mockStore, 'dispatch');
    wrapper = mount((
      <MemoryRouter>
        <ContextProvider>
          <AdminPage />
        </ContextProvider>
      </MemoryRouter>
    )).find('Admin');
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

  it('getDashboardCsv dispatches fetchCsv action', () => {
    wrapper.props().downloadCsv('ee5e6b3a-069a-4947-bb8d-d2dbc323396c');
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
