import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';
import styled from 'styled-components';
import toastr from 'toastr'

import IssuesTable from './IssuesTable';
import IssuesForm from './IssuesForm';
import DataModal from '../common/DataModal';
import Spinner from '../common/Spinner';
import account from '../../utils/account';

const ButtonWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

const ROLE_DEVELOPER = 'ROLE_DEVELOPER';
const ROLE_MANAGER = 'ROLE_MANAGER';

class IssuesMainPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {};
    if (nextProps.areStoriesLoaded &&
      !prevState.isCurrentStorySet) {
      newState = {
        ...newState,
        isCurrentStorySet: true,
        story: nextProps.stories.find(story => story),
      };
    }

    if (!nextProps.isActiveRequest && prevState.isActiveRequest) {
      if (!nextProps.isStoriesError) {
        newState = {
          ...newState,
          description: '',
          solution: '',
          estimation: '0',
          story: nextProps.stories.find(story => story),
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
      isCurrentStorySet: false,
      isActiveRequest: false,
      description: '',
      story: null,
      solution: '',
      developers: [],
      estimation: '0',
      currentPage: 1,
      rowPerPage: 3,
      accountUsername: account.getAccountUsername(),
    };

    this.onToggleModal = this.onToggleModal.bind(this);
    this.onAddIssue = this.onAddIssue.bind(this);
    this.onCancelAddIssue = this.onCancelAddIssue.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onToggleUpdateIssueModal = this.onToggleUpdateIssueModal.bind(this);
    this.onCancelUpdateIssue = this.onCancelUpdateIssue.bind(this);
    this.onUpdateIssue = this.onUpdateIssue.bind(this);
    this.onStoryChange = this.onStoryChange.bind(this);
    this.onDevelopersChange = this.onDevelopersChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onRemoveIssue = this.onRemoveIssue.bind(this);
    this.onRemoveMultipleIssues = this.onRemoveMultipleIssues.bind(this);
  }

  componentDidMount() {
    account.getAccountRole() === ROLE_MANAGER
      ? this.props.issuesActions.fetchIssuesPage(0, this.state.rowPerPage)
      : this.props.issuesActions.fetchIssuesPageByLogin(this.state.accountUsername, 0, this.state.rowPerPage);

    this.props.storiesActions.fetchStories();
    this.props.solutionsActions.fetchSolutions();
    this.props.usersActions.fetchUsers();

    account.getAccountRole() === ROLE_MANAGER
      ? this.props.issuesActions.fetchIssuesCount()
      : this.props.issuesActions.fetchIssuesCountByLogin(this.state.accountUsername);
  }

  onInputChange(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  onRemoveMultipleIssues(ids) {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .removeMultipleIssues(ids)
      .then(() => account.getAccountRole() === ROLE_MANAGER
        ? this.props.issuesActions.fetchIssuesPage(0, this.state.rowPerPage)
        : this.props.issuesActions.fetchIssuesPageByLogin(this.state.accountUsername, 0, this.state.rowPerPage));
  }

  onStoryChange(event) {
    this.setState({
      story: this.props.stories
        .find(story => story.id === Number.parseInt(event.target.id, 10)),
    });
  }

  onToggleModal() {
    this.setDefaultProperties();

    this.setState({
      isActiveAddModal: true,
    });
  }

  onCancelAddIssue() {
    this.setState({
      isActiveAddModal: false,
    });
  }

  onToggleUpdateIssueModal(id) {
    const currentIssue = this.props.issues.find(issue => issue.id === id);

    this.setState({
      id,
      description: currentIssue.description,
      developers: currentIssue.users.filter(user => user.authority === ROLE_DEVELOPER),
      story: this.props.stories.find(story => story.id === currentIssue.storyId),
      isActiveUpdateModal: true,
      solution: currentIssue.solutionId
        ? this.props.solutions.find(solution => solution.id === currentIssue.solutionId).description
        : '',
      estimation: currentIssue.solutionId
        ? this.props.solutions.find(solution => solution.id === currentIssue.solutionId).estimation
        : '0',
    });
  }

  onCancelUpdateIssue() {
    this.setState({
      isActiveUpdateModal: false,
    });
  }

  onAddIssue() {
    if (!this.state.description || !this.state.story) {
      return toastr.warning('You should fill all required fields');
    }

    this.setState({
      isActiveRequest: true,
    });

    this.props
      .storeIssue({
        description: this.state.description,
        storyId: this.state.story ? this.state.story.id : 0,
        date: moment(),
        users: [
          ...this.state.developers,
          this.props.users.find(user => user.id === Number.parseInt(account.getAccountId(), 10)),
        ],
      })
      .then(() => account.getAccountRole() === ROLE_MANAGER
        ? this.props.issuesActions.fetchIssuesPage(0, this.state.rowPerPage)
        : this.props.issuesActions.fetchIssuesPageByLogin(this.state.accountUsername, 0, this.state.rowPerPage));
  }

  onUpdateIssue() {
    if (!this.state.description || !this.state.story) {
      return toastr.warning('You should fill all required fields');
    }

    this.setState({
      isActiveRequest: true,
    });

    const currentIssue = this.props.issues.find(issue => issue.id === this.state.id);

    let solutionPromise;

    if (currentIssue.solutionId) {
      solutionPromise = this.state.solution
        ? this.props.updateSolution(currentIssue.solutionId, {
          date: moment(),
          description: this.state.solution,
          estimation: this.state.estimation,
        })
        : Promise.resolve();
    } else {
      solutionPromise = this.state.solution
        ? this.props.storeSolution({
          date: moment(),
          description: this.state.solution,
          estimation: this.state.estimation,
        })
        : Promise.resolve();
    }

    const { description } = this.state;

    solutionPromise
      .then(solution => this.props.updateIssue(this.state.id, {
        date: currentIssue.date,
        description,
        solutionId: solution ? solution.id : null,
        storyId: this.state.story ? this.state.story.id : 0,
        users: [
          ...this.state.developers,
          this.props.users.find(user => user.id === Number.parseInt(account.getAccountId(), 10)),
        ],
      }))
      .then(() => account.getAccountRole() === ROLE_MANAGER
        ? this.props.issuesActions.fetchIssuesPage(0, this.state.rowPerPage)
        : this.props.issuesActions.fetchIssuesPageByLogin(this.state.accountUsername, 0, this.state.rowPerPage));
  }

  onDevelopersChange(event) {
    const id = Number.parseInt(event.target.value, 10);
    const { developers } = this.state;
    const currentDeveloper = developers.find(developer => developer.id === id);

    if (currentDeveloper) {
      developers.splice(developers.indexOf(currentDeveloper), 1);
    } else {
      developers.push(this.props.users.find(user => user.id === id));
    }

    this.setState({
      developers,
    });
  }

  onRemoveIssue(id) {
    this.setState({
      isActiveRequest: true,
    });

    this.props
      .removeIssue(id)
      .then(() => account.getAccountRole() === ROLE_MANAGER
        ? this.props.issuesActions.fetchIssuesPage(0, this.state.rowPerPage)
        : this.props.issuesActions.fetchIssuesPageByLogin(this.state.accountUsername, 0, this.state.rowPerPage));
  }

  setDefaultProperties() {
    const newState = {
      description: '',
      solution: '',
      story: this.props.stories.find(story => story),
    };

    this.setState(newState);
  }

  onChangePage(index) {
    this.setState({
      currentPage: index,
    });

    account.getAccountRole() === ROLE_MANAGER
      ? this.props.issuesActions.fetchIssuesPage(index - 1, this.state.rowPerPage)
      : this.props.issuesActions.fetchIssuesPageByLogin(this.state.accountUsername, index - 1, this.state.rowPerPage);
  }

  render() {
    if (this.props.areIssuesFetching ||
        this.props.areStoriesFetching ||
        this.props.areSolutionsFetching ||
        this.props.areUsersFetching ||
        this.props.isCountFetching ||
      !this.props.areIssuesLoaded ||
      !this.props.areStoriesLoaded ||
      !this.props.areSolutionsLoaded ||
      !this.props.areUsersLoaded ||
      !this.props.isCountLoaded) {
      return (
        <Spinner />
      );
    }

    return (
      <div>
        <DataModal
          actionType="Add New Issue"
          confirmName="Add"
          cancelName="Cancel"
          isActive={this.state.isActiveAddModal}
          onTogleModal={this.onToggleModal}
          onConfirm={this.onAddIssue}
          onCancel={this.onCancelAddIssue}
        >
          <IssuesForm
            description={this.state.description}
            stories={this.props.stories}
            story={this.state.story}
            developers={this.props.users.filter(user => user.authority === ROLE_DEVELOPER)}
            currentDevelopers={this.state.developers}
            isAdding={true}
            solution={this.state.solution}
            estimation={this.state.estimation}
            onInputChange={this.onInputChange}
            onStoryChange={this.onStoryChange}
            onDevelopersChange={this.onDevelopersChange}
          />
        </DataModal>

        <DataModal
          actionType="Update Issue"
          confirmName="Update"
          cancelName="Cancel"
          isActive={this.state.isActiveUpdateModal}
          onTogleModal={this.onToggleUpdateIssueModal}
          onConfirm={this.onUpdateIssue}
          onCancel={this.onCancelUpdateIssue}
        >
          <IssuesForm
            description={this.state.description}
            stories={this.props.stories}
            story={this.state.story}
            developers={this.props.users.filter(user => user.authority === ROLE_DEVELOPER)}
            currentDevelopers={this.state.developers}
            isAdding={false}
            solution={this.state.solution}
            estimation={this.state.estimation}
            onInputChange={this.onInputChange}
            onStoryChange={this.onStoryChange}
            onDevelopersChange={this.onDevelopersChange}
          />
        </DataModal>

        <IssuesTable
          stories={this.props.stories}
          issues={this.props.issues}
          solutions={this.props.solutions}
          currentPage={this.state.currentPage}
          rowPerPage={this.state.rowPerPage}
          total={this.props.total}
          onChangePage={this.onChangePage}
          updateIssue={this.onToggleUpdateIssueModal}
          removeIssue={this.onRemoveIssue}
          removeMultipleIssues={this.onRemoveMultipleIssues}
        />

        {account.getAccountRole() === ROLE_MANAGER && (
          <ButtonWrapper>
            <Button color="success" onClick={this.onToggleModal} >Add New Issue</Button>
          </ButtonWrapper>
        )}
      </div>
    );
  }
}

IssuesMainPage.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        authority: PropTypes.string,
        login: PropTypes.string,
      })),
    }),
  })),
  issues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    createdDate: PropTypes.string,
    description: PropTypes.string,
    solutionId: PropTypes.number,
    storyId: PropTypes.number,
  })),
  solutions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  issuesActions: PropTypes.objectOf(PropTypes.func),
  storiesActions: PropTypes.objectOf(PropTypes.func),
  usersActions: PropTypes.objectOf(PropTypes.func),
  solutionsActions: PropTypes.objectOf(PropTypes.func),
  storeIssue: PropTypes.func,
  updateIssue: PropTypes.func,
  removeIssue: PropTypes.func,
  removeMultipleIssues: PropTypes.func,
  storeSolution: PropTypes.func,
  updateSolution: PropTypes.func,
  areIssuesFetching: PropTypes.bool,
  areIssuesLoaded: PropTypes.bool,
  areStoriesFetching: PropTypes.bool,
  areStoriesLoaded: PropTypes.bool,
  areUsersFetching: PropTypes.bool,
  areUsersLoaded: PropTypes.bool,
  areSolutionsFetching: PropTypes.bool,
  areSolutionsLoaded: PropTypes.bool,
};

IssuesMainPage.defaultProps = {
  stories: [],
  issues: [],
  users: [],
  solutions: [],
  storiesActions: {},
  issuesActions: {},
  usersActions: {},
  solutionsActions: {},
  storeIssue: null,
  updateIssue: null,
  removeIssue: null,
  removeMultipleIssues: null,
  storeSolution: null,
  updateSolution: null,
  areIssuesFetching: false,
  areIssuesLoaded: false,
  areStoriesFetching: false,
  areStoriesLoaded: false,
  areUsersFetching: false,
  areUsersLoaded: false,
  areSolutionsFetching: false,
  areSolutionsLoaded: false,
};

export default IssuesMainPage;

