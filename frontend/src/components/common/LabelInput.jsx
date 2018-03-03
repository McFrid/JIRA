import React from 'react';
import {
  FormGroup,
  Label,
  Input
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
)

export default LabelInput;