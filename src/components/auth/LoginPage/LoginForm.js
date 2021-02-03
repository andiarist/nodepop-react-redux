import React from 'react';
import T from 'prop-types';

import styles from './LoginForm.module.css';

import Input from '../../shared/Form/Input';
import Form from '../../shared/Form/Form';

function LoginForm({ onSubmit }) {
  return (
    <>
      <Form
        initialValues={{ email: '', password: '', remember: false }}
        onSubmit={onSubmit}>
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        <Input type="checkbox" name="remember" />
        <button type="submit" className="button-submit">
          Log in
        </button>
      </Form>
    </>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
