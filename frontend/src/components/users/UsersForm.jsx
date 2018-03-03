import React from 'react';
import {
  Form,
  FormGroup
} from 'reactstrap';

import LabelInput from "../common/LabelInput";

const UsersForm = props => (
  <Form>
    <FormGroup>
      <LabelInput
        labelName='Email'
        inputType='text'
        inputName='email'
        inputId='users-table-email'
        placeholder='Enter user email'
        value={props.email}
        onInputChange={props.onInputChange.bind(this, 'email')}
      />
      <LabelInput
        labelName='First Name'
        inputType='text'
        inputName='firstName'
        inputId='users-table-first-name'
        placeholder='Enter user first name'
        value={props.firstName}
        onInputChange={props.onInputChange.bind(this, 'firstName')}
      />
      <LabelInput
        labelName='Last Name'
        inputType='text'
        inputName='lastName'
        inputId='users-table-last-name'
        placeholder='Enter user last name'
        value={props.lastName}
        onInputChange={props.onInputChange.bind(this, 'lastName')}
      />
      <LabelInput
        labelName='Experience'
        inputType='text'
        inputName='experience'
        inputId='users-table-experience'
        placeholder='Enter user experience'
        value={props.experience}
        onInputChange={props.onInputChange.bind(this, 'experience')}
      />
    </FormGroup>
  </Form>
);

export default UsersForm;