import React from 'react';
import T from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';

import ConfirmationButton from '../shared/ConfirmationButton';

import { connect } from 'react-redux';
import { logout } from '../../store/actions';

export function LogoutButton({ logout, ...props }) {
  const handleLogout = () => {
    logout();
  };

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
      onConfirm={handleLogout}
      {...props}
    />
  );
}

LogoutButton.propTypes = {
  logout: T.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LogoutButton);
