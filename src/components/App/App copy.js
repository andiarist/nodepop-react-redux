import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, LoginPage } from '../auth';
import { AdvertPage, AdvertsPage, NewAdvertPage } from '../adverts';
import { AuthContextProvider } from '../../contexts/auth';
import NotFoundPage from './NotFoundPage';

import * as actions from '../../store/actions';

class App extends React.Component {
  //state = {
  //  dispatch: this.props.dispatch,
  //  isUserLogged: this.props.isUserLogged,
  //};
  //const { isLogged } = this.state;

  handleLogin = cb => {
    //console.log(this.props);
    //this.setState({ isLogged: true }, cb);
    //const { isLogged, dispatch } = this.props;
    //console.log('lo que le llega a handleLogin:', cb);
    console.log(
      'isLogged en el handleLogin de App antes del dispatch:',
      this.props.isLogged,
    );

    this.props.dispatch(actions.authLogin(this.props.isLogged));

    console.log(
      'isLogged en el handleLogin de App despues del dispatch:',
      this.props.isLogged,
    );
  };

  handleLogout = () => {
    //this.setState({ isLogged: false });
    const { dispatch } = this.props;
    dispatch(actions.authLogout());
  };

  render() {
    //console.log('props:', this.props);
    //const { isLogged } = this.state;
    const { isLogged } = this.props;
    //console.log(isLogged);
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
              <LoginPage
                onLogin={this.handleLogin}
                {...routerProps}
                isLogged={isLogged}
              />
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
  dispatch: T.func,
  isLogged: T.bool,
};

export default App;
