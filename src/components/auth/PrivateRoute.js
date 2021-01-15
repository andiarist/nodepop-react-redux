import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

//import { useAuthContext } from '../../contexts/auth';

const PrivateRoute = props => {
  //const { isLogged } = useAuthContext();
  const isLogged = useSelector(getIsLogged);
  const location = useLocation();
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

export default PrivateRoute;
