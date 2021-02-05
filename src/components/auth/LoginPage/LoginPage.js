import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import LoginForm from './LoginForm';

import { login } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const { Title } = Typography;

function LoginPage({ onLogin, location, history, error, loading }) {
  const handleSubmit = credentials => {
    onLogin(credentials, location, history);
  };

  return (
    <Row>
      <Col span={8} offset={8} style={{ marginTop: 64 }}>
        <Title style={{ textAlign: 'center' }}>Log In</Title>
        <LoginForm onSubmit={handleSubmit} />
        {error && (
          <Alert
            closable
            message={error}
            showIcon
            type="error"
            style={{ marginTop: 24 }}
          />
        )}
      </Col>
    </Row>
  );
}

LoginPage.propTypes = {
  onLogin: T.func,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
  location: T.shape({
    state: T.shape({ from: T.shape({ pathname: T.string }) }),
  }).isRequired,
};

const mapStateToProps = state => getUi(state);

const mapDispatchToProps = dispatch => ({
  onLogin: (credentials, location, history) =>
    dispatch(login(credentials, location, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
