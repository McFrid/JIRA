import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
} from 'reactstrap';

import LabelInput from '../common/LabelInput';
import LabelDropdown from '../common/LabelDropdown';
import LabelMultiSelect from '../common/LabelMultiSelect';
import account from '../../utils/account';

const ROLE_MANAGER = 'ROLE_MANAGER';

const IssuesForm = props => (
  <Form>
    <FormGroup>
      {account.getAccountRole() === ROLE_MANAGER && (
        <LabelInput
          labelName="Description"
          inputType="text"
          inputName="description"
          inputId="issues-table-description"
          placeholder="Enter description"
          value={props.description}
          onInputChange={props.onInputChange.bind(this, 'description')}
        />
      )}

      {!!props.stories.length && account.getAccountRole() === ROLE_MANAGER && (
        <LabelDropdown
          labelName="Story"
          dropdownId="issues-table-story"
          dropdownData={props.stories.map(story => ({
            key: story.id,
            value: story.description,
          }))}
          selectedKey={props.story ? props.story.id : null}
          onChange={props.onStoryChange}
        />
      )}

      {!!props.developers.length && account.getAccountRole() === ROLE_MANAGER && (
        <LabelMultiSelect
          labelName="Developers"
          inputName="developers"
          inputId="issues-table-developers"
          options={props.developers.map(developer => ({
            key: developer.id,
            value: `${developer.firstName} ${developer.lastName}`,
          }))}
          value={props.currentDevelopers.map(developer => developer.id)}
          onOptionClick={props.onDevelopersChange}
        />
      )}

      {!props.isAdding && (
        <LabelInput
          labelName="Solution"
          inputType="text"
          inputName="solution"
          inputId="issues=table-solution"
          placeholder="Enter Solution"
          value={props.solution}
          onInputChange={props.onInputChange.bind(this, 'solution')}
        />
      )}

      {!props.isAdding && (
        <LabelInput
          labelName="Estimation"
          inputType="number"
          inputName="estimation"
          inputId="issues=table-estimation"
          placeholder="Enter Estimation"
          value={props.estimation}
          onInputChange={props.onInputChange.bind(this, 'estimation')}
        />
      )}
    </FormGroup>
  </Form>
);

IssuesForm.propTypes = {
  description: PropTypes.string,
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    productId: PropTypes.number,
    createdDate: PropTypes.string,
  })),
  story: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    productId: PropTypes.number,
    createdDate: PropTypes.string,
  }),
  developers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  currentDevelopers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    authority: PropTypes.string,
    login: PropTypes.string,
  })),
  solution: PropTypes.string,
  estimation: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isAdding: PropTypes.bool,
  onInputChange: PropTypes.func,
  onStoryChange: PropTypes.func,
  onDevelopersChange: PropTypes.func,
};

IssuesForm.defaultProps = {
  description: '',
  stories: [],
  story: null,
  developers: [],
  currentDevelopers: [],
  isAdding: true,
  solution: '',
  estimation: 0,
  onInputChange: null,
  onStoryChange: null,
  onDevelopersChange: null,
};

export default IssuesForm;
