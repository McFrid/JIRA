import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
} from 'reactstrap';

import LabelInput from '../common/LabelInput';
import LabelDropdown from '../common/LabelDropdown';
import LabelMultiSelect from '../common/LabelMultiSelect';

const IssuesForm = props => (
  <Form>
    <FormGroup>
      <LabelInput
        labelName="Description"
        inputType="text"
        inputName="description"
        inputId="issues-table-description"
        placeholder="Enter description"
        value={props.description}
        onInputChange={props.onInputChange.bind(this, 'description')}
      />

      {!!props.stories.length && (
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

      {!!props.developers.length && (
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
    </FormGroup>
  </Form>
);

IssuesForm.propTypes = {
  description: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({
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
  })),
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
  onInputChange: PropTypes.func,
  onProductChange: PropTypes.func,
};

IssuesForm.defaultProps = {
  description: '',
  products: [],
  product: null,
  onInputChange: null,
  onProductChange: null,
};

export default IssuesForm;
