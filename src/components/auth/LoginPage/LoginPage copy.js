import React from 'react';
import T from 'prop-types';
import { Alert, Col, Row, Typography } from 'antd';

import { login } from '../../../api/auth';
import LoginForm from './LoginForm';

const { Title } = Typography;

class LoginPage extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = credentials => {
    const { onLogin, location, history, isLogged } = this.props;
    console.log('props en LoginPage:', this.props);

    console.log('onLogin en LoginPage:', onLogin);

    this.resetError();

    login(credentials)
      .then(() => {
        console.log('antes de entrar al onLogin');
        console.log('credentials:', credentials);
        //isLogged = true;
        //function onLogin(){
        //  console.log('entra en onLogin');
        //}
        onLogin(() => {
          console.log('entra en onLogin');

          // Navigate to previously required route

          const { from } = location.state || { from: { pathname: '/' } };
          console.log('from:', from);
          history.replace(from);
        });
        console.log('fuera de onLogin');
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
  isLogged: T.bool,
};

export default LoginPage;
