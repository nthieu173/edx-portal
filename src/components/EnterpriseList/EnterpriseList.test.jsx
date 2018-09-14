import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import EnterpriseList from './index';
import mockEnterpriseList from './EnterpriseList.mocks';

const EnterpriseListWrapper = props => (
  <MemoryRouter>
    <EnterpriseList
      getEnterpriseList={() => {}}
      clearPortalConfiguration={() => {}}
      getLocalUser={() => {}}
      setSearchQuery={() => {}}
      {...props}
    />
  </MemoryRouter>
);

describe('<EnterpriseList />', () => {
  let wrapper;

  describe('renders correctly', () => {
    it('calls getEnterpriseList, clearPortalConfiguration and getLocalUser props', () => {
      const mockGetEnterpriseList = jest.fn();
      const mockClearPortalConfiguration = jest.fn();
      const mockGetLocalUser = jest.fn();
      const tree = renderer
        .create((
          <EnterpriseListWrapper
            getEnterpriseList={mockGetEnterpriseList}
            clearPortalConfiguration={mockClearPortalConfiguration}
            getLocalUser={mockGetLocalUser}
          />
        ))
        .toJSON();
      expect(mockGetEnterpriseList).toHaveBeenCalled();
      expect(mockClearPortalConfiguration).toHaveBeenCalled();
      expect(mockGetLocalUser).toHaveBeenCalled();
      expect(tree).toMatchSnapshot();
    });

    it('with enrollment data', () => {
      const tree = renderer
        .create((
          <EnterpriseListWrapper
            enterprises={mockEnterpriseList}
          />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with empty enrollment data', () => {
      const tree = renderer
        .create((
          <EnterpriseListWrapper
            enterprises={{
              ...mockEnterpriseList,
              count: 0,
              results: [],
            }}
          />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with search query and empty enrollment data', () => {
      const tree = renderer
        .create((
          <EnterpriseListWrapper
            enterprises={{
              ...mockEnterpriseList,
              count: 0,
              results: [],
            }}
            searchQuery="enterprise name"
            searchSubmitted
          />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with error state', () => {
      const tree = renderer
        .create((
          <EnterpriseListWrapper error={Error('Network Error')} />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('with loading state', () => {
      const tree = renderer
        .create((
          <EnterpriseListWrapper loading />
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('redirects when there is only one enterprise', () => {
      const oneEnterpriseListData = {
        count: 1,
        current_page: 1,
        num_pages: 1,
        next: null,
        previous: null,
        results: [{
          uuid: 'ee5e6b3a-069a-4947-bb8d-d2dbc323396c',
          name: 'Enterprise 99',
          slug: 'enterprise-99',
        }],
        start: 0,
      };
      wrapper = mount((
        <MemoryRouter initialEntries={['/test']}>
          <EnterpriseList
            enterprises={oneEnterpriseListData}
            getEnterpriseList={() => {}}
            clearPortalConfiguration={() => {}}
            getLocalUser={() => {}}
            setSearchQuery={() => {}}
          />
        </MemoryRouter>
      ));
      const expectedRedirect = <Redirect to="/enterprise-99/admin/learners" />;
      expect(wrapper.containsMatchingElement(expectedRedirect)).toEqual(true);
    });
  });

  describe('formatEnterpriseData', () => {
    const expectedData = mockEnterpriseList.results;

    beforeEach(() => {
      wrapper = shallow((
        <EnterpriseListWrapper
          enterprises={mockEnterpriseList}
        />
      )).find(EnterpriseList);
    });

    it('overrides state enterprises when props enterprises changes with new enterprises', () => {
      const currentState = wrapper.dive().state();

      expect(currentState.enterprises[0]).toEqual(expectedData[0]);
      expect(currentState.enterprises[1]).toEqual(expectedData[1]);
      expect(currentState.pageCount).toEqual(mockEnterpriseList.num_pages);

      wrapper.dive().setProps({
        enterprises: {
          count: 0,
          num_pages: 0,
          results: [],
        },
      }, () => {
        expect(wrapper.dive().state('enterprises')).toEqual([]);
        expect(wrapper.dive().state('pageCount')).toEqual(null);
      });
    });

    it('does not override state enterprises when props enterprises changes with existing enterprises', () => {
      const currentEnterprises = wrapper.dive().state('enterprises');
      expect(currentEnterprises[0]).toEqual(expectedData[0]);
      expect(currentEnterprises[1]).toEqual(expectedData[1]);

      wrapper.dive().setProps({
        enterprises: mockEnterpriseList,
      });

      const updatedEnterprises = wrapper.dive().state('enterprises');
      expect(updatedEnterprises[0]).toEqual(expectedData[0]);
      expect(updatedEnterprises[1]).toEqual(expectedData[1]);
    });
  });

  it('pageCount state should be null when enterprises prop is null', () => {
    wrapper = shallow((
      <EnterpriseListWrapper
        enterprises={null}
      />
    )).find('EnterpriseList');
    expect(wrapper.dive().state('pageCount')).toEqual(null);
  });

  describe('enterprise list search', () => {
    const submitSearch = (searchQuery) => {
      wrapper.find('SearchBar').find('input[type=\'search\']').simulate('change', { target: { value: searchQuery } });
      expect(wrapper.find('SearchBar').find('input[type=\'search\']').prop('value')).toEqual(searchQuery);
      wrapper.find('SearchBar').find('.input-group-append').find('button').last()
        .simulate('click');
      expect(wrapper.find('EnterpriseList').instance().state.searchQuery).toEqual(searchQuery);
      expect(wrapper.find('EnterpriseList').instance().state.searchSubmitted).toBeTruthy();
    };

    it('searchQuery state changes onSearch', () => {
      wrapper = mount((
        <EnterpriseListWrapper
          enterprises={mockEnterpriseList}
        />
      ));

      submitSearch('Enterprise 1');
    });

    it('searchQuery state changes onClear', () => {
      wrapper = mount((
        <EnterpriseListWrapper
          enterprises={mockEnterpriseList}
        />
      ));

      submitSearch('Enterprise 1');

      wrapper.find('SearchBar').find('.input-group-append').find('button').first()
        .simulate('click');
      expect(wrapper.find('SearchBar').find('input[type=\'search\']').prop('value')).toEqual('');
      expect(wrapper.find('EnterpriseList').instance().state.searchQuery).toEqual('');
    });

    it('dispatches enterprise list request action when searchQuery prop changes', () => {
      const searchQuery = 'enterprise name';
      const mockGetEnterpriseList = jest.fn();
      wrapper = shallow((
        <EnterpriseListWrapper
          enterprises={mockEnterpriseList}
          getEnterpriseList={mockGetEnterpriseList}
        />
      )).find('EnterpriseList');

      wrapper.dive().setProps({
        searchQuery,
      }, () => {
        expect(wrapper.dive().state('searchQuery')).toEqual(searchQuery);
        expect(mockGetEnterpriseList).toHaveBeenCalledTimes(1);
      });
    });
  });
});
