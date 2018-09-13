import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@edx/paragon';
import classNames from 'classnames';

// TODO! make this functional component
class SidebarToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Button
          label={
            <span>
              <Icon
                className={
                  classNames({
                    fa: true,
                    'fa-times': this.props.expanded,
                    'fa-bars': !this.props.expanded,
                  }).split(' ')
                }
              />
              {this.props.label}
            </span>
          }
          onClick={this.props.toggleSidebar}
        />
    );
  }
}

SidebarToggle.defaultProps = {
  label: '',
  toggleSidebar: () => {},
  sidebarExpanded: false,
};

SidebarToggle.propTypes = {
  label: PropTypes.string,
  toggleSidebar: PropTypes.func,
  sidebarExpanded: PropTypes.bool,
};


export default SidebarToggle;
