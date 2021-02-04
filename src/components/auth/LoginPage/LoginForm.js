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
        <p>
          <Input type="email" name="email" />
        </p>
        <p>
          <Input type="password" name="password" />
        </p>
        <p>
          <Input type="checkbox" name="remember" /> Remember
        </p>

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
