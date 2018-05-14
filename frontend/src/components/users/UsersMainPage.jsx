import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import moment from 'moment';

import UsersTable from './UsersTable';
import UsersForm from './UsersForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';

import account from '../../utils/account';

const ButtonWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

class UsersMainPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (nextProps.areRolesLoaded &&
      !prevState.isCurrentRoleSet) {
      newState = {
        ...newState,
        isCurrentRoleSet: true,
        roleId: nextProps.roles[0],
      };
    }

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isUsersError) {
        newState = {
          ...newState,
          email: '',
          firstName: '',
          lastName: '',
          login: '',
          authority: '',
          birthday: new Date(),
          isActiveAddModal: false,
          isActiveUpdateModal: false,
          currentPage: 1,
        };
      }

      newState = {
        ...newState,
        isActiveRequest: false,
      };
    }

    return newState;
  }

  constructor(props) {
    super(props);
    this.state = {
      isActiveAddModal: false,
      isActiveUpdateModal: false,
      isCurrentRoleSet: false,
      isActiveRequest: false,
      email: '',
      firstName: '',
      lastName: '',
      login: '',
      roleId: '',
      birthday: new Date(),
      currentPage: 1,
      rowPerPage: 3,
    };

    this.userProperties = ['email', 'firstName', 'lastName', 'login', 'roleId'];

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
    this.onCancelAddUser = this.onCancelAddUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateUserModal = this.onToggleUpdateUserModal.bind(this);
    this.onCancelUpdateUser = this.onCancelUpdateUser.bind(this);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onDropdownSelectionChange = this.onDropdownSelectionChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onRemoveUser = this.onRemoveUser.bind(this);
  }

  componentDidMount() {
    this.props.usersActions.fetchUsersPage(0, this.state.rowPerPage);
    this.props.rolesActions.fetchRoles();
    this.props.productsActions.fetchProducts();
    this.props.issuesActions.fetchIssues();
    this.props.usersActions.fetchUsersCount();
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onDropdownSelectionChange(name, event) {
    this.setState({
      [name]: event.target.id,
    });
  }

  onToggleModal() {
    this.setDefaultProperties();

    this.setState({
      isActiveAddModal: true,
    });
  }

  onCancelAddUser() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  onToggleUpdateUserModal(id) {
    const currentUser = this.props.users.find(user => user.id === id);

    this.setState({
      id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      login: currentUser.login,
      roleId: currentUser.authority,
      isActiveUpdateModal: true,
      birthday: currentUser.birthdate ? new Date(currentUser.birthdate) : new Date(),
    });
  }

  onCancelUpdateUser() {
    this.setState({
      isActiveUpdateModal: false,
    });
  }

  onAddUser() {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .storeUser({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        login: this.state.login,
        authority: this.state.roleId,
        birthdate: moment(this.state.birthday).format('YYYY-MM-DD'),
      })
      .then(() => this.props.usersActions.fetchUsersPage(0, this.state.rowPerPage));
  }

  onUpdateUser() {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .updateUser(this.state.id, {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        login: this.state.login,
        authority: this.state.roleId,
        activated: true,
        birthdate: moment(this.state.birthday).format('YYYY-MM-DD'),
      })
      .then(() => this.props.usersActions.fetchUsersPage(0, this.state.rowPerPage));
  }

  onRemoveUser(id) {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .removeUser(id)
      .then(() => this.props.usersActions.fetchUsersPage(0, this.state.rowPerPage));
  }

  onDateChange(date) {
    this.setState({
      birthday: date,
    });
  }

  setDefaultProperties() {
    const newState = {};

    this.userProperties.forEach((property) => {
      newState[property] = '';
    });
    [newState.roleId] = this.props.roles;
    newState.birthday = new Date();

    this.setState(newState);
  }

  onChangePage(index) {
    this.setState({
      currentPage: index,
    });

    this.props.usersActions.fetchUsersPage(index - 1, this.state.rowPerPage);
  }

  render() {
    if (this.props.areUsersFetching ||
        this.props.areProductsFetching ||
        this.props.areIssuesFetching ||
      this.props.isCountFetching ||
      !this.props.areUsersLoaded ||
      !this.props.areRolesLoaded ||
      !this.props.areProductsLoaded ||
      !this.props.areIssuesLoaded ||
      !this.props.isCountLoaded) {
      return (
        <Spinner />
      );
    }

    return (
      <div>
        <DataModal
          actionType="Add New User"
          confirmName="Add"
          cancelName="Cancel"
          isActive={this.state.isActiveAddModal}
          onTogleModal={this.onToggleModal}
          onConfirm={this.onAddUser}
          onCancel={this.onCancelAddUser}
        >
          <UsersForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            login={this.state.login}
            roles={this.props.roles}
            currentRoleId={this.state.roleId}
            birthday={this.state.birthday}
            onDateChange={this.onDateChange}
            onInputChange={this.onInputChange}
            onDropdownSelectionChange={this.onDropdownSelectionChange}
          />
        </DataModal>

        <DataModal
          actionType="Update User"
          confirmName="Update"
          cancelName="Cancel"
          isActive={this.state.isActiveUpdateModal}
          onTogleModal={this.onToggleUpdateUserModal}
          onConfirm={this.onUpdateUser}
          onCancel={this.onCancelUpdateUser}
        >
          <UsersForm
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            login={this.state.login}
            roles={this.props.roles}
            currentRoleId={this.state.roleId}
            birthday={this.state.birthday}
            onDateChange={this.onDateChange}
            onInputChange={this.onInputChange}
            onDropdownSelectionChange={this.onDropdownSelectionChange}
          />
        </DataModal>

        <UsersTable
          users={this.props.users
            .filter(user => user.id !== Number.parseInt(account.getAccountId(), 10))}
          roles={this.props.roles}
          products={this.props.products}
          issues={this.props.issues}
          currentPage={this.state.currentPage}
          rowPerPage={this.state.rowPerPage}
          total={this.props.total}
          onChangePage={this.onChangePage}
          updateUser={this.onToggleUpdateUserModal}
          removeUser={this.onRemoveUser}
        />

        <ButtonWrapper>
          <Button color="success" onClick={this.onToggleModal} >Add New User</Button>
        </ButtonWrapper>
      </div>
    );
  }
}

UsersMainPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    roleId: PropTypes.number,
    login: PropTypes.string,
    activated: PropTypes.bool,
  })),
  roles: PropTypes.arrayOf(PropTypes.string),
  usersActions: PropTypes.objectOf(PropTypes.func),
  rolesActions: PropTypes.objectOf(PropTypes.func),
  productsActions: PropTypes.objectOf(PropTypes.func),
  issuesActions: PropTypes.objectOf(PropTypes.func),
  storeUser: PropTypes.func,
  updateUser: PropTypes.func,
  removeUser: PropTypes.func,
  areUsersFetching: PropTypes.bool,
  areUsersLoaded: PropTypes.bool,
  areProductsFetching: PropTypes.bool,
  areProductsLoaded: PropTypes.bool,
  areIssuesFetching: PropTypes.bool,
  areIssuesLoaded: PropTypes.bool,
  areRolesLoaded: PropTypes.bool,
};

UsersMainPage.defaultProps = {
  users: [],
  roles: [],
  usersActions: {},
  rolesActions: {},
  productsActions: {},
  issuesActions: {},
  storeUser: null,
  updateUser: null,
  removeUser: null,
  areUsersFetching: false,
  areUsersLoaded: false,
  areProductsFetching: false,
  areProductsLoaded: false,
  areIssuesFetching: false,
  areIssuesLoaded: false,
  areRolesLoaded: false,
};

export default UsersMainPage;

