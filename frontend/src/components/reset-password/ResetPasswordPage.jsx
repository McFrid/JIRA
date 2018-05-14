import React from 'react';
import {
  Form,
  Button,
} from 'reactstrap';
import styled from 'styled-components';

import LabelInput from '../common/LabelInput';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const errorMessage = 'Field cannot be empty';
    
    return (
      <Wrapper>
        <Form className="login_form" onSubmit={this.onSubmitLogin}>
          <LabelInput
            labelName="Username"
            inputType="text"
            inputName="username"
            inputId="username"
            placeholder="Username"
            value={this.state.username}
            isError={this.state.isUsernameError}
            errorMessage={errorMessage}
            onInputChange={this.onChangeUsername}
          />

          <LabelInput
            labelName="Password"
            inputType="password"
            inputName="password"
            inputId="password"
            placeholder="Password"
            value={this.state.password}
            isError={this.state.isPasswordError}
            errorMessage={errorMessage}
            onInputChange={this.onChangePassword}
          />

          <Button color="primary" className="login_form__submit_button">Sign in</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default ResetPasswordPage;
