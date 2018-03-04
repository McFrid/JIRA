import React from 'react';
import PropsTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const LabelInput = props => (
  <FormGroup>
    <Label for={props.inputId}>{props.labelName}</Label>

    {props.inputType === 'text' && (
      <Input
        type={props.inputType}
        name={props.inputName}
        id={props.inputId}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onInputChange}
      />
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
  onInputChange: PropsTypes.func,
};

export default LabelInput;
