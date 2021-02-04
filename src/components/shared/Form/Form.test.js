import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Form from './Form';

describe('Testing <Form />', () => {
  test('should show <Form /> properly', () => {
    const props = {
      initialValues: {},
      onSubmit: jest.fn(),
      children: 'children',
    };
    const wrapper = shallow(<Form {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
