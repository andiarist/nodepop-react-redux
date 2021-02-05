import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { LogoutButton } from '../auth/LogoutButton';

import { logout } from '../../store/actions';
jest.mock('../../store/actions');

describe('Testing <LogoutButton />', () => {
  const props = {
    logout,
  };
  const render = () => shallow(<LogoutButton {...props} />);
  test('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
  test('should call to logout', () => {
    const wrapper = render();
    const ConfirmationButton = wrapper.find('ConfirmationButton');
    ConfirmationButton.props().onConfirm();
    expect(logout).toHaveBeenCalled();
  });
});
