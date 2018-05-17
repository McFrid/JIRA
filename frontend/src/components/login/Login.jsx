import React from 'react';
import {
  Form,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LabelInput from '../common/LabelInput';

import './Login.css';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isUsernameError: false,
      isPasswordError: false,
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value,
      isUsernameError: false,
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
      isPasswordError: false,
    });
  }

  onSubmitLogin(event) {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.login(this.state.username, this.state.password);
    } else {
      this.setState({
        isUsernameError: !this.state.username,
        isPasswordError: !this.state.password,
      });
    }
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

Login.propTypes = {
  login: PropTypes.func,
};

Login.defaultProps = {
  login: null,
};

export default Login;
