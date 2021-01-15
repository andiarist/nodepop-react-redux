import React from 'react';
import T from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';

import { logout } from '../../api/auth';
import ConfirmationButton from '../shared/ConfirmationButton';
//import { AuthContextConsumer } from '../../contexts/auth';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions';
import { getIsLogged } from '../../store/selectors';

class LogoutButton extends React.Component {
  handleLogout = () => {
    //const { onLogout } = this.props;
    logout().then(this.props.authLogout);
  };

  render() {
    const { ...props } = this.props;
    return (
      <ConfirmationButton
        danger
        icon={<LogoutOutlined />}
        shape="round"
        type="dashed"
        confirmationProps={{
          title: 'Close session?',
          content: 'Are you sure you want to disconnect?',
          okText: 'Yes',
          cancelText: 'No',
          okButtonProps: {
            danger: true,
          },
        }}
        onConfirm={this.handleLogout}
        {...props}
      />
    );
  }
}

LogoutButton.propTypes = {
  authLogout: T.func.isRequired,
};

//const ConnectedToAuthLogoutButton = props => (
//  <AuthContextConsumer>
//    {({ onLogout }) => <LogoutButton onLogout={onLogout} {...props} />}
//  </AuthContextConsumer>
//);
const mapStateToProps = state => {
  return {
    isLogged: getIsLogged(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogout: () => dispatch(authLogout()),
  };
};

//export default connect(mapDispatchToProps)(ConnectedToAuthLogoutButton);
export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
