import React from 'react';
import PropsTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

const LabelInput = props => (
  <FormGroup>
    <Label for={props.inputId}>{props.labelName}</Label>

    <Input
      invalid={props.isError}
      type={props.inputType}
      name={props.inputName}
      id={props.inputId}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onInputChange}
    />

    {props.isError && (
      <FormFeedback>{props.errorMessage}</FormFeedback>
    )}
  </FormGroup>
);

LabelInput.propTypes = {
  inputId: PropsTypes.string,
  labelName: PropsTypes.string,
  inputType: PropsTypes.string,
  inputName: PropsTypes.string,
  placeholder: PropsTypes.string,
  value: PropsTypes.oneOfType([
    PropsTypes.number,
    PropsTypes.string,
  ]),
  isError: PropsTypes.bool,
  errorMessage: PropsTypes.string,
  onInputChange: PropsTypes.func,
};

LabelInput.defaultProps = {
  inputId: '',
  labelName: '',
  inputType: '',
  inputName: '',
  placeholder: '',
  value: '',
  isError: false,
  errorMessage: '',
  onInputChange: null,
};

export default LabelInput;
