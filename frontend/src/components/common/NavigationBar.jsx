import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import account from '../../utils/account';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const role = account.getAccountRole();

    return (
      <Navbar light expand="md">
        <NavbarBrand tag={Link} to="/">{this.props.title}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            {this.props.links
              .filter(item => item.allowedRoles.includes(role))
              .map(item => (
                <NavItem key={item.name}>
                  <NavLink tag={Link} to={item.route}>{item.name}</NavLink>
                </NavItem>
              ))}
          </Nav>
          <Nav className="ml-auto" navbar>
            <span>
              {this.props.username} ( <a href="/" onClick={this.onLogoutClick}>Logout</a> )
            </span>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    route: PropTypes.string,
  })),
  username: PropTypes.string,
  onLogout: PropTypes.func,
};

NavigationBar.defaultProps = {
  title: null,
  links: null,
  username: null,
  onLogout: null,
};

export default NavigationBar;
