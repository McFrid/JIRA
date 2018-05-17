import React from 'react';
import {
  Form,
  Button,
} from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';

import LabelInput from '../common/LabelInput';
import './ResetPassword.css';

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

    this.state = {
      password: '',
      confirmPassword: '',
      isPasswordError: false,
      isConfirmPasswordError: false,
      isPasswordReset: false,
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmitResetPassword = this.onSubmitResetPassword.bind(this);
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
      isPasswordError: false,
    });
  }

  onChangeConfirmPassword(event) {
    this.setState({
      confirmPassword: event.target.value,
      isConfirmPasswordError: false,
    });
  }

  onSubmitResetPassword(event) {
    event.preventDefault();

    if (this.state.password && this.state.confirmPassword) {
      if (this.state.password !== this.state.confirmPassword) {
        toastr.error('Passwords do not match');
        return;
      }

      this.props.resetPassword(this.props.match.params.key,
        this.state.password).then(() =>
        this.setState({
          isPasswordReset: true,
        }), error =>
        toastr.error(error.response.data.title));
    } else {
      this.setState({
        isPasswordError: !this.state.password,
        isConfirmPasswordError: !this.state.confirmPassword,
      });
    }
  }

  render() {
    const errorMessage = 'Field cannot be empty';

    if (this.state.isPasswordReset) {
      return (<Redirect to="/" />);
    }

    return (
      <Wrapper>
        <Form className="reset_password_form" onSubmit={this.onSubmitResetPassword}>
          <LabelInput
            labelName="New password"
            inputType="password"
            inputName="newPassword"
            inputId="password"
            placeholder="New password"
            value={this.state.password}
            isError={this.state.isPasswordError}
            errorMessage={errorMessage}
            onInputChange={this.onChangePassword}
          />

          <LabelInput
            labelName="Confirm password"
            inputType="password"
            inputName="confirmPassword"
            inputId="confirm-password"
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            isError={this.state.isConfirmPasswordError}
            errorMessage={errorMessage}
            onInputChange={this.onChangeConfirmPassword}
          />

          <Button color="primary" className="reset_password_form__submit_button">Reset password</Button>
        </Form>
      </Wrapper>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func,
};

ResetPasswordPage.defaultProps = {
  resetPassword: null,
}

export default ResetPasswordPage;
