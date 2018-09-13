import React from 'react';
import PropTypes from 'prop-types';
import SidebarToggle from '../SidebarToggle';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.sidebarExpanded !== prevProps.sidebarExpanded) {
      this.setState({
        expanded: this.props.sidebarExpanded
      })
    }
  }

  render() {
    const { expanded } = this.state;

    if (!this.props.sidebarEnabled) {
      return null;
    }

    return expanded ? <nav id="sidebar" className={expanded ? 'expanded' : 'collapsed'}>
      <SidebarToggle expanded={true} toggleSidebar={this.props.toggleSidebar}/>

      <ul className="components">
          <li className="active">
              <a href="#">Home</a>
          </li>
          <li>
              <a href="#">About</a>
          </li>
          <li>
              <a href="#">Portfolio</a>
          </li>
          <li>
              <a href="#">Contact</a>
          </li>
      </ul>
    </nav> :
    <nav className="sidebar-collapsed">
      <SidebarToggle expanded={false} toggleSidebar={this.props.toggleSidebar}/>
    </nav>
  }
}

Sidebar.defaultProps = {
  sidebarExpanded: false,
  sidebarEnabled: false,
};

Sidebar.propTypes = {
  sidebarExpanded: PropTypes.bool,
  sidebarEnabled: PropTypes.bool,
};


export default Sidebar;
