import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import { login } from '../../../api/auth';
import LoginForm from './LoginForm';

import { authLogin } from '../../../store/actions';

const { Title } = Typography;

class LoginPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = credentials => {
    const { onLogin, location, history } = this.props;
    this.resetError();
    login(credentials)
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        onLogin(true);
        history.replace(from);
        //onLogin(() => {
        //  // Navigate to previously required route
        //  // Estas dos lineas son el cb, que es lo que se ejecuta desde App
        //  const { from } = location.state || { from: { pathname: '/' } };
        //  history.replace(from);
        //});
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  resetError = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    return (
      <Row>
        <Col span={8} offset={8} style={{ marginTop: 64 }}>
          <Title style={{ textAlign: 'center' }}>Log In</Title>
          <LoginForm onSubmit={this.handleSubmit} />
          {error && (
            <Alert
              afterClose={this.resetError}
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
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
  location: T.shape({
    state: T.shape({ from: T.shape({ pathname: T.string }) }),
  }).isRequired,
};

const mapDispatchToProps = {
  onLogin: authLogin,
};

export default connect(null, mapDispatchToProps)(LoginPage);
