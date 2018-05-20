import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const LabelMultiSelect = props => (
  <FormGroup>
    <Label for={props.inputId}>{props.labelName} {props.isRequired ? '*' : ''}</Label>

    <Input
      type="select"
      name={props.inputName}
      id={props.inputId}
      value={props.value}
      onChange={() => {}}
      multiple
    >
      {props.options.map(option => (
        <option
          value={option.key}
          key={option.key}
          onClick={props.onOptionClick}
        >
          {option.value}
        </option>
      ))}
    </Input>
  </FormGroup>
);

LabelMultiSelect.propTypes = {
  labelName: PropTypes.string,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.string,
  })),
  onOptionClick: PropTypes.func,
};

LabelMultiSelect.defaultProps = {
  labelName: '',
  inputId: '',
  inputName: '',
  value: [],
  options: [],
  onOptionClick: null,
};

export default LabelMultiSelect;
