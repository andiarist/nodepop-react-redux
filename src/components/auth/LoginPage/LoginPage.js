import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

//import { login } from '../../../api/auth';
import LoginForm from './LoginForm';

//import {
//  authLoginRequest,
//  authLoginSuccess,
//  authLoginFailure,
//} from '../../../store/actions';
import { login } from '../../../store/actions';
import { getUi } from '../../../store/selectors';

const { Title } = Typography;

function LoginPage({ login, location, history, error, loading }) {
  const handleSubmit = credentials => {
    login(credentials, location, history);
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
  //onLoginRequest: T.func,
  //onLoginSuccess: T.func,
  //onLoginFailure: T.func,
  login: T.func,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
  location: T.shape({
    state: T.shape({ from: T.shape({ pathname: T.string }) }),
  }).isRequired,
};

const mapStateToProps = state => getUi(state);

const mapDispatchToProps = {
  //onLoginRequest: authLoginRequest,
  //onLoginSuccess: authLoginSuccess,
  //onLoginFailure: authLoginFailure,
  login,
};

//export default connect(getUi, login)(LoginPage);
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
