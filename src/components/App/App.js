import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { AuthContextProvider } from '../../contexts/auth';
import NotFoundPage from './NotFoundPage';

import * as actions from '../../store/actions';

class App extends React.Component {
  //state = {
  //  isLogged: this.props.isInitiallyLogged,
  //};

  handleLogin = cb => {
    //this.setState({ isLogged: true }, cb);
    console.log('cb que llega al handleSubmit de App:', cb);
    //this.props.authLogin(this.props.isLogged);
    this.props.authLogin(true);
    cb();
  };

  handleLogout = () => this.props.authLogout();

  render() {
    const { isLogged } = this.props;
    return (
      <AuthContextProvider
        value={{
          isLogged,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
        }}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/adverts" />
          </Route>
          <Route path="/login" exact>
            {routerProps => (
              <LoginPage onLogin={this.handleLogin} {...routerProps} />
            )}
          </Route>
          <PrivateRoute path="/adverts" exact>
            <AdvertsPage />
          </PrivateRoute>
          <PrivateRoute path="/adverts/new" exact component={NewAdvertPage} />
          <PrivateRoute path="/adverts/:id" exact component={AdvertPage} />
          <Route path="/404" exact>
            {NotFoundPage}
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </AuthContextProvider>
    );
  }
}

App.propTypes = {
  isInitiallyLogged: T.bool,
};

const mapStateToProps = state => {
  return {
    isLogged: state.auth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authLogin: isLogged => dispatch(actions.authLogin(isLogged)),
    authLogout: () => dispatch(actions.authLogout()),
  };
};

//const mapDispatchToProps = {
//  authLogin: actions.authLogin,
//  authLogout: actions.authLogout,
//};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default connectedApp;
